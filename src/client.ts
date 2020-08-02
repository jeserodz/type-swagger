import axios from "axios";
import fs from "fs";
import path from "path";

export const Client = {
  async fetch(dir: string, specUrl: string): Promise<string> {
    const spec = (await axios.get(specUrl)).data;

    const dest = path.resolve(dir, "api.zip");
    const writer = fs.createWriteStream(dest);

    let response = await axios({
      method: "POST",
      url: "https://generator3.swagger.io/api/generate",
      headers: { "Content-Type": "application/json" },
      responseType: "stream",
      data: JSON.stringify({
        type: "CLIENT",
        lang: "typescript-fetch",
        spec,
      }),
    });

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on("finish", () => resolve(dest));
      writer.on("error", reject);
    });
  },

  async extract() {},
};
