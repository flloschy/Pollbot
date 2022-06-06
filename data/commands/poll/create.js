const fs = require("fs")
const api = require("../../functions/pollmanager")


async function execute(interaction) {
    let polljson = JSON.parse(fs.readFileSync("./data/commands/poll/polls.json", "utf8"))

    let values = interaction.options
    let title = values.getString('title')
    let description = values.getString('description')
    
    let id = values.getInteger('id')

    if (!polljson.hasOwnProperty(interaction.guild.id)) polljson[interaction.guild.id] = {}
    if (polljson[interaction.guild.id].hasOwnProperty(id)) { 
        await interaction.reply({content: "A poll with this ID allready exist.", ephemeral: true})
        return
    }

    let end = Math.floor((Date.now() + values.getNumber('end')*3600000)/1000)
    let min = values.getInteger('min')
    let max = values.getInteger('max')
    let autoend = values.getBoolean('autoend')
    let results = values.getBoolean('results')
    let options = []
    for (var i = 1; i <=10; i++) {
        let op = values.getString(`option${i}`)
        if (op !== null) options.push(op)
        else i = 11
    }

    if (min > options.length) {
        await interaction.reply({content: "The minimum required amount of votes cant be higher than votable options", empheral: true})
        return
    }
    if (title.length > 30) {
        await interaction.reply({content: "The title of the poll can't be longer than 30 characters", empheral: true})
        return
    }
    if (description.length > 130) {
        await interaction.reply({content: "The description of the poll can't be longer than 130 characters", empheral: true})
        return
    }

    if (max > options.length) max = options.length 
    if (min > max) [max, min] = [min, max]

    await fs.writeFileSync("./data/commands/poll/polls.json", JSON.stringify(polljson, null, 2))
    await api.create(interaction, title, description, id, options, min, max, end, autoend, results)
}


exports.execute = execute