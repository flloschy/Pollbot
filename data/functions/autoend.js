const api = require("./pollmanager");
const fs = require("fs");

async function startloop(client) {
    while (true) {
        // load poll data
        let polljson = JSON.parse(
            fs.readFileSync("./data/commands/poll/polls.json", "utf8")
        );
        let config = JSON.parse(fs.readFileSync("./config.json"));

        let active_polls = 0;
        // go throw every server
        for (let [guildid, polls] of Object.entries(polljson)) {
            // go throw every poll in this server
            for (let [id, value] of Object.entries(polls)) {
                active_polls++;
                // check if pollend has passed
                if (value["end"] <= Math.floor(Date.now() / 1000)) {
                    // end poll
                    await api.endpoll(guildid, id, client);
                }
            }
        }
        if (config["presence"]["automated"]) {
            if (active_polls == 0)
                await client.user.setPresence({ status: "idle" });
            else await client.user.setPresence({ status: "online" });
        }

        // sleep for 2 minutes
        await new Promise((resolve) => setTimeout(resolve, 120000));
    }
}

exports.start = startloop;
