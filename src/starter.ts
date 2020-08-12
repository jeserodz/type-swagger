import axios from "axios";
import fs from "fs";
import path from "path";

export const Starter = {
  async fetch(dir: string): Promise<string> {
    const dest = path.resolve(dir, "starter.zip");
    const writer = fs.createWriteStream(dest);

    let response = await axios({
      method: "GET",
      url: "https://github.com/jeserodz/type-swagger-starter/archive/master.zip",
      responseType: "stream",
    });

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on("finish", () => resolve(dest));
      writer.on("error", reject);
    });
  },
};
