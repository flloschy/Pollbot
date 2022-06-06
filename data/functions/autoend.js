
const api = require("./pollmanager")
const fs = require("fs")

async function startloop(client) {
    while (true) {
        let polljson = JSON.parse(fs.readFileSync("./data/commands/poll/polls.json", "utf8"))
        for (let [guildid, polls] of Object.entries(polljson)) {
            for (let [id, value] of Object.entries(polls)) {
                if (value['end'] <= Math.floor(Date.now()/1000)) {
                    await api.endpoll(guildid, id, client)
                }
            }
        }
        await new Promise(resolve => setTimeout(resolve, 120000))
    }
}

exports.start = startloop