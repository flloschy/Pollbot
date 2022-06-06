
api = require("../../functions/pollmanager")

async function execute(interaction) {
    let id = interaction.options.getInteger('id')
    
    let votes = await api.getvotes(interaction.guild.id, id, interaction.client)
    await interaction.reply({content: votes, ephemeral: true})
}

exports.execute = execute