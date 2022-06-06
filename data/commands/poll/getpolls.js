
const fs = require("fs")

async function execute(interaction) {
    let polljson = JSON.parse(fs.readFileSync("./data/commands/poll/polls.json", "utf8"))
    let polls = polljson[interaction.guild.id]
    let content = ""
    try {
        for ([id, value] of Object.entries(polls)) {
            content += `title: **${value['title']}** | id: ${id} | ends <t:${value['end']}:R>\n`
        }
    } catch (e) {
        content = "No polls exist."
    }
    if (content.length == 0) content = "No polls exist."
    interaction.reply({content: content, ephemeral: true})
}


exports.execute = execute