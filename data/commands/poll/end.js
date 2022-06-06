api = require("../../functions/pollmanager");

async function execute(interaction) {
    // load values to be useable in ending poll
    let id = interaction.options.getInteger("id");
    let results = interaction.options.getBoolean("results");
    let guildid = interaction.guild.id;
    let client = interaction.client;

    // end poll
    await api.endpoll(guildid, id, client, results);
    // send validation to user
    await interaction.reply({ content: "Poll ended.", ephemeral: true });
}

exports.execute = execute;
