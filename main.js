const { Client, Collection, Interaction } = require(`discord.js`);
const client = new Client({
    intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"],
});
const fs = require("fs");

require("./data/functions/commandpush");

client.once(
    "ready", // this gets called when client is inizialized
    async () => {
        // add commands to client, so the module can be called easily
        client.commands = new Collection();
        const commandFiles = fs
            .readdirSync("./data/commands")
            .filter((file) => !file.startsWith("."));
        commandFiles.forEach((commandFile) => {
            const command = require(`./data/commands/${commandFile}/manager.js`);
            client.commands.set(command.data.name, command);
        });

        // set client presence
        await client.user.setPresence({
            activities: [{ name: "with polls", type: "PLAYING" }],
            status: "online",
        });

        const autoend = require("./data/functions/autoend");
        autoend.start(client); //start the loop which ends polls
    }
);
client.on("interactionCreate", async (interaction) => {
    if (interaction.isCommand()) {
        const command = client.commands.get(interaction.commandName);
        if (command) await command.command(interaction); // execute manager of the command
    } else if (interaction.isSelectMenu()) {
        if (interaction.customId === "poll") {
            const command = client.commands.get("poll");
            if (command) await command.menu(interaction);
        }
    }
});
// client.on('guildCreate',
//     async (guild) => event.guildCreate(client, guild))
// client.on('guildDelete',
//     async (guild) => event.guildDelete(client, guild))

client.login(require("./config.json").token);
