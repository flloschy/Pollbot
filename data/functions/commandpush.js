const fs = require("fs")
const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v9")
const commands = []

const commandFiles = fs.readdirSync('./data/commands').filter(file => !file.startsWith('.'))

commandFiles.forEach(commanddir => {
    const command = require(`../commands/${commanddir}/manager.js`)
    commands.push(command.data.toJSON())
})

config = require("../../config.json")
const restClient = new REST({version: "9"}).setToken(config.token)

restClient.put(
    //Routes.applicationGuildCommands(config.id, "917794710851035167"), {body: commands}
    Routes.applicationCommands(config.id), {body: commands}
)
.catch((console.error))