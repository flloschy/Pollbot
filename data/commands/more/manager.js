const { SlashCommandBuilder } = require("@discordjs/builders");

// load sub-modules
const presence = require("./presence");

module.exports = {
    // all miscellaneous commands
    data: new SlashCommandBuilder()
        .setName("miscellaneous")
        .setDescription("Commands which cant be categorized.")
        .addSubcommandGroup((group) =>
            group
                .setName("presence")
                .setDescription("Change the bot's presence.")
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName("text")
                        .setDescription("Change the bot's presence text.")
                        .addStringOption((option) =>
                            option
                                .setName("text")
                                .setDescription("the shown text.")
                                .setRequired(true)
                        )
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName("status")
                        .setDescription("Change the bot's presence status.")
                        .addStringOption((option) =>
                            option
                                .setName("status")
                                .setDescription("the shown status.")
                                .addChoices(
                                    { name: "🟢", value: "online" },
                                    { name: "🟡", value: "idle" },
                                    { name: "🔴", value: "dnd" },
                                    { name: "⚫", value: "invisible" }
                                )
                                .setRequired(true)
                        )
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName("type")
                        .setDescription("Change the bot's presence type.")
                        .addStringOption((option) =>
                            option
                                .setName("type")
                                .setDescription("the shown type.")
                                .addChoices(
                                    {
                                        name: "Playing [text]",
                                        value: "PLAYING",
                                    },
                                    {
                                        name: "Watching [text]",
                                        value: "WATCHING",
                                    },
                                    {
                                        name: "Listening to [text]",
                                        value: "LISTENING",
                                    }
                                )
                                .setRequired(true)
                        )
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName("automation")
                        .setDescription(
                            "Change the bot's status to '🟢' if there are active polls, and to '🟡' if not."
                        )
                        .addBooleanOption((option) =>
                            option
                                .setName("enabled")
                                .setDescription(
                                    "Enable/disable the automation."
                                )
                                .setRequired(true)
                        )
                )
        ),

    async command(interaction) {
        // select command matching sub execution

        switch (interaction.options.getSubcommandGroup()) {
            case "presence": {
                await presence.command(interaction);
                return;
            }
            default: {
                interaction.reply({
                    content:
                        "Thats odd... How did you get here? Seams like this is an outdated command or something went wrong :/",
                    ephemeral: true,
                });
                return;
            }
        }
    },

    async menu(interaction) {
        // execute ContextMenu update
        await vote.execute(interaction);
    },
};
