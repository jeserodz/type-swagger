#!/usr/bin/env node

import yargs from "yargs";
import fs from "fs";
import path from "path";
import validator from "validator";
import chalk from "chalk";
import ora from "ora";
import { last } from "lodash";
import boxen, { BorderStyle } from "boxen";
import extract from "extract-zip";
import { Client } from "./client";
import { Starter } from "./starter";

yargs
  .command("generate <name> <specUrl>", "Generates new Swagger client SDK", {}, async (argv) => {
    if (!validator.isURL(argv.specUrl as string)) {
      const msg = chalk.redBright(`Error - Invalid specUrl value: ${argv.specUrl}`);
      const msgBox = boxen(msg, { padding: 1, borderStyle: BorderStyle.Round });
      console.error(msgBox);
      process.exit(1);
    }

    if (
      !validator.isURL(argv.name as string, {
        require_host: false,
        require_protocol: false,
        require_tld: false,
        require_valid_protocol: false,
      })
    ) {
      const msg = chalk.redBright(`Error - Invalid name value: ${argv.specUrl}`);
      const msgBox = boxen(msg, { padding: 1, borderStyle: BorderStyle.Round });
      console.error(msgBox);
      process.exit(1);
    }

    const tmpDir = process.cwd();

    const spinner = ora({ color: "cyan" }).start();

    spinner.text = "Download and extract the starter project";
    const starterZipPath = await Starter.fetch(tmpDir);
    await extract(starterZipPath, { dir: tmpDir });

    spinner.text = "Rename the starter project dir";
    const starterExtractPath = path.resolve(tmpDir, "swagger-client-starter-master");
    const starterDirPath = path.resolve(tmpDir, last((argv.name as string).split("/")) as string);
    fs.renameSync(starterExtractPath, starterDirPath);

    spinner.text = "Download and extract swagger client into the starter project dir";
    const starterSrcPath = path.resolve(starterDirPath, "src");
    const clientZipPath = await Client.fetch(tmpDir, argv.specUrl as string);
    await fs.rmdirSync(starterSrcPath, { recursive: true });
    await extract(clientZipPath, { dir: starterSrcPath });

    spinner.text = "Delete downloaded zip files";
    await fs.unlinkSync(starterZipPath);
    await fs.unlinkSync(clientZipPath);

    spinner.text = "Rename starter package name";
    const starterPkgPath = path.resolve(starterDirPath, "package.json");
    const starterPkgLockPath = path.resolve(starterDirPath, "package-lock.json");
    const pkg = JSON.parse(fs.readFileSync(starterPkgPath, "utf-8"));
    const pkgLock = JSON.parse(fs.readFileSync(starterPkgLockPath, "utf-8"));
    pkg.name = argv.name;
    pkgLock.name = argv.name;
    fs.writeFileSync(starterPkgPath, JSON.stringify(pkg, null, 2));
    fs.writeFileSync(starterPkgLockPath, JSON.stringify(pkgLock, null, 2));

    spinner.stop();
  })
  .command("update <specUrl>", "Update existing Swagger client SDK", {}, async (argv) => {
    if (!validator.isURL(argv.specUrl as string)) {
      const msg = chalk.redBright(`Error - Invalid specUrl value: ${argv.specUrl}`);
      const msgBox = boxen(msg, { padding: 1, borderStyle: BorderStyle.Round });
      console.error(msgBox);
      process.exit(1);
    }

    const tmpDir = process.cwd();

    const spinner = ora({ color: "cyan" }).start();

    spinner.text = "Validate execution context";
    if (!fs.existsSync(path.resolve(process.cwd(), "package.json"))) {
      const msg = chalk.redBright(`Error - Invalid execution context. Could't validate Node package.`);
      const msgBox = boxen(msg, { padding: 1, borderStyle: BorderStyle.Round });
      console.error(msgBox);
      process.exit(1);
    }

    spinner.text = "Download and extract swagger client into the starter project dir";
    const starterSrcPath = path.resolve(process.cwd(), "src");
    const clientZipPath = await Client.fetch(tmpDir, argv.specUrl as string);
    await fs.rmdirSync(starterSrcPath, { recursive: true });
    await extract(clientZipPath, { dir: starterSrcPath });

    spinner.text = "Delete downloaded zip files";
    await fs.unlinkSync(clientZipPath);

    spinner.stop();
  }).argv;
