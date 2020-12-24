const log = require("@utils/LogError");

module.exports = (client, warning) => {
    log(client, "Warning", warning);
};