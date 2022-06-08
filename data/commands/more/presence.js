const api = require("../../functions/presence");
const config = require("../../../config.json");

async function command(interaction) {
    if (interaction.user.id !== config["owner"]) {
        await interaction.reply({
            content: "You are not permitted to change the bot's presence!",
            ephemeral: true,
        });
        return;
    }

    switch (interaction.options.getSubcommand()) {
        case "text": {
            await api.text(interaction.options.getString("text"));
        }
        case "status": {
            await api.status(interaction.options.getString("status"));
        }
        case "type": {
            await api.type(interaction.options.getString("type"));
        }
        case "automation": {
            await api.automated(interaction.options.getBoolean("enabled"));
        }
    }
    await api.update(interaction.client);
    await interaction.reply({
        content: "Presence settings updated.",
        ephemeral: true,
    });
}

exports.command = command;
