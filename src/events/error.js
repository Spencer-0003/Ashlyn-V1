const log = require("@utils/LogError");

module.exports = (client, err) => {
    log(client, "Client Error", err);
};