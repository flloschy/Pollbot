
api = require("../../functions/pollmanager")

async function execute(interaction) {

    let id = interaction.options.getInteger('id')
    let results = interaction.options.getBoolean('results')
    let guildid = interaction.guild.id
    let client = interaction.client

    await api.endpoll(guildid, id, client, results)
    await interaction.reply({content: "Poll ended.", ephemeral: true})


}



exports.execute = execute