
const { Client, Collection, Interaction } = require(`discord.js`)
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"] })

require('./data/functions/commandpush')

client.once('ready', 
    async () => {

        const { Client, Collection, Interaction } = require(`discord.js`);
        const fs = require("fs")
        
        client.commands = new Collection()
        const commandFiles = fs.readdirSync('./data/commands').filter(file => !file.startsWith('.'))
        commandFiles.forEach(commandFile => {
            const command = require(`./data/commands/${commandFile}/manager.js`)
            client.commands.set(command.data.name, command)
        })

        // uncomment to delete all commands

        // client.application.commands.set([])
        // const guild = await client.guilds.fetch("917794710851035167")
        // guild.commands.set([])

        const autoend = require('./data/functions/autoend')
        autoend.start(client)

    })
client.on('interactionCreate', async (interaction) => {
    
    if (interaction.isCommand()) {
        const command = client.commands.get(interaction.commandName)
        if (command) await command.command(interaction)
    } else if (interaction.isSelectMenu()) {
        if (interaction.customId === "poll") {
            const command = client.commands.get("poll")
            if (command) await command.menu(interaction)
        }
    }



})
// client.on('guildCreate', 
//     async (guild) => event.guildCreate(client, guild))
// client.on('guildDelete', 
//     async (guild) => event.guildDelete(client, guild))


client.login(require("./config.json").token)


