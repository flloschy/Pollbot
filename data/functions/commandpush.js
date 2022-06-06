const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const commands = [];

// load command folders
const commandFiles = fs
    .readdirSync("./data/commands")
    .filter((file) => !file.startsWith("."));


// load each folders command manager to get command builder
commandFiles.forEach((commanddir) => {
    const command = require(`../commands/${commanddir}/manager.js`);
    commands.push(command.data.toJSON()); // get command builder
});


config = require("../../config.json");
const restClient = new REST({ version: "9" }).setToken(config.token);

// publish command builder to discord
restClient
    .put(
        //Routes.applicationGuildCommands(config.id, "917794710851035167"), {body: commands}
        Routes.applicationCommands(config.id),
        { body: commands }
    )
    .catch(console.error);
