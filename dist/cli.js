#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var yargs_1 = __importDefault(require("yargs"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var validator_1 = __importDefault(require("validator"));
var chalk_1 = __importDefault(require("chalk"));
var ora_1 = __importDefault(require("ora"));
var lodash_1 = require("lodash");
var boxen_1 = __importStar(require("boxen"));
var extract_zip_1 = __importDefault(require("extract-zip"));
var client_1 = require("./client");
var starter_1 = require("./starter");
var tmpDir = process.cwd();
var spinner = ora_1.default({ color: "cyan" }).start();
yargs_1.default
    .command("generate <name> <specUrl>", "Generates new Swagger client SDK", {}, function (argv) { return __awaiter(void 0, void 0, void 0, function () {
    var msg, msgBox, msg, msgBox, starterZipPath, starterExtractPath, starterDirPath, starterSrcPath, clientZipPath, starterPkgPath, starterPkgLockPath, pkg, pkgLock;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!validator_1.default.isURL(argv.specUrl)) {
                    msg = chalk_1.default.redBright("Error - Invalid specUrl value: " + argv.specUrl);
                    msgBox = boxen_1.default(msg, { padding: 1, borderStyle: "round" /* Round */ });
                    console.error(msgBox);
                    process.exit(1);
                }
                if (!validator_1.default.isURL(argv.name, {
                    require_host: false,
                    require_protocol: false,
                    require_tld: false,
                    require_valid_protocol: false,
                })) {
                    msg = chalk_1.default.redBright("Error - Invalid name value: " + argv.specUrl);
                    msgBox = boxen_1.default(msg, { padding: 1, borderStyle: "round" /* Round */ });
                    console.error(msgBox);
                    process.exit(1);
                }
                spinner.text = "Download and extract the starter project";
                return [4 /*yield*/, starter_1.Starter.fetch(tmpDir)];
            case 1:
                starterZipPath = _a.sent();
                return [4 /*yield*/, extract_zip_1.default(starterZipPath, { dir: tmpDir })];
            case 2:
                _a.sent();
                spinner.text = "Rename the starter project dir";
                starterExtractPath = path_1.default.resolve(tmpDir, "swagger-client-starter-master");
                starterDirPath = path_1.default.resolve(tmpDir, lodash_1.last(argv.name.split("/")));
                fs_1.default.renameSync(starterExtractPath, starterDirPath);
                spinner.text = "Download and extract swagger client into the starter project dir";
                starterSrcPath = path_1.default.resolve(starterDirPath, "src");
                return [4 /*yield*/, client_1.Client.fetch(tmpDir, argv.specUrl)];
            case 3:
                clientZipPath = _a.sent();
                return [4 /*yield*/, fs_1.default.rmdirSync(starterSrcPath, { recursive: true })];
            case 4:
                _a.sent();
                return [4 /*yield*/, extract_zip_1.default(clientZipPath, { dir: starterSrcPath })];
            case 5:
                _a.sent();
                spinner.text = "Delete downloaded zip files";
                return [4 /*yield*/, fs_1.default.unlinkSync(starterZipPath)];
            case 6:
                _a.sent();
                return [4 /*yield*/, fs_1.default.unlinkSync(clientZipPath)];
            case 7:
                _a.sent();
                spinner.text = "Rename starter package name";
                starterPkgPath = path_1.default.resolve(starterDirPath, "package.json");
                starterPkgLockPath = path_1.default.resolve(starterDirPath, "package-lock.json");
                pkg = JSON.parse(fs_1.default.readFileSync(starterPkgPath, "utf-8"));
                pkgLock = JSON.parse(fs_1.default.readFileSync(starterPkgLockPath, "utf-8"));
                pkg.name = argv.name;
                pkgLock.name = argv.name;
                fs_1.default.writeFileSync(starterPkgPath, JSON.stringify(pkg, null, 2));
                fs_1.default.writeFileSync(starterPkgLockPath, JSON.stringify(pkgLock, null, 2));
                spinner.stop();
                return [2 /*return*/];
        }
    });
}); })
    .command("update <specUrl>", "Update existing Swagger client SDK", {}, function (argv) { return __awaiter(void 0, void 0, void 0, function () {
    var msg, msgBox, msg, msgBox, starterSrcPath, clientZipPath;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!validator_1.default.isURL(argv.specUrl)) {
                    msg = chalk_1.default.redBright("Error - Invalid specUrl value: " + argv.specUrl);
                    msgBox = boxen_1.default(msg, { padding: 1, borderStyle: "round" /* Round */ });
                    console.error(msgBox);
                    process.exit(1);
                }
                spinner.text = "Validate execution context";
                if (!fs_1.default.existsSync(path_1.default.resolve(process.cwd(), "package.json"))) {
                    msg = chalk_1.default.redBright("Error - Invalid execution context. Could't validate Node package.");
                    msgBox = boxen_1.default(msg, { padding: 1, borderStyle: "round" /* Round */ });
                    console.error(msgBox);
                    process.exit(1);
                }
                spinner.text = "Download and extract swagger client into the starter project dir";
                starterSrcPath = path_1.default.resolve(process.cwd(), "src");
                return [4 /*yield*/, client_1.Client.fetch(tmpDir, argv.specUrl)];
            case 1:
                clientZipPath = _a.sent();
                return [4 /*yield*/, fs_1.default.rmdirSync(starterSrcPath, { recursive: true })];
            case 2:
                _a.sent();
                return [4 /*yield*/, extract_zip_1.default(clientZipPath, { dir: starterSrcPath })];
            case 3:
                _a.sent();
                spinner.text = "Delete downloaded zip files";
                return [4 /*yield*/, fs_1.default.unlinkSync(clientZipPath)];
            case 4:
                _a.sent();
                spinner.stop();
                return [2 /*return*/];
        }
    });
}); }).argv;
