// Setup Custom Log

const oldLog = console.log;
console.log = (...args) => oldLog("[Ashlyn]", ...args);