const api = require("../../functions/pollmanager");

async function execute(interaction) {
    // vote 
    await api.vote(interaction, interaction.values); 
}

exports.execute = execute;
