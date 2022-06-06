

const api = require("../../functions/pollmanager")

async function execute(interaction) {
    await api.vote(interaction, interaction.values)
}


exports.execute = execute









