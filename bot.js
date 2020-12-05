// Setup Custom Log

const oldLog = console.log;
console.log = (...args) => oldLog("[Ashlyn]", ...args);

// Load Modules

require("module-alias/register");
require("dotenv").config();