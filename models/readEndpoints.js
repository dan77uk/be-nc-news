const { readFile } = require("fs/promises");

exports.readEndpoints = () => {
  return readFile(`endpoints.json`, "utf-8").then((result) => {
    return JSON.parse(result);
  });
};
