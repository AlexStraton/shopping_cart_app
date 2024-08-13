import devData from "../data/index.ts";

import seed from "./seed.ts";

const db = require("../connection.ts");

const runSeed = () => {
  return seed(devData).then(() => db.end());
};

runSeed();
