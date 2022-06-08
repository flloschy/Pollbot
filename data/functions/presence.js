const fs = require("fs");

module.exports = {
    async text(text) {
        let config = JSON.parse(fs.readFileSync("./config.json"));
        config["presence"]["text"] = text;
        fs.writeFileSync("./config.json", JSON.stringify(config, null, 1));
    },

    async status(status) {
        let config = JSON.parse(fs.readFileSync("./config.json"));
        config["presence"]["status"] = status;
        fs.writeFileSync("./config.json", JSON.stringify(config, null, 1));
    },

    async type(type) {
        let config = JSON.parse(fs.readFileSync("./config.json"));
        config["presence"]["type"] = type;
        fs.writeFileSync("./config.json", JSON.stringify(config, null, 1));
    },

    async automated(automated) {
        let config = JSON.parse(fs.readFileSync("./config.json"));
        config["presence"]["automated"] = automated;
        fs.writeFileSync("./config.json", JSON.stringify(config, null, 1));
    },

    async update(client) {
        let config = JSON.parse(fs.readFileSync("./config.json"));
        let status = config["presence"]["status"];
        let text = config["presence"]["text"];
        let type = config["presence"]["type"];
        await client.user.setPresence({
            activities: [
                {
                    name: text,
                    type: type,
                },
            ],
            status: status,
        });
    },
};
