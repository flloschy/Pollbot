let logger = require('./modules/log').logger
logger = new logger(__filename, "main", "data/logs/log.log")
logger.info("Loading modules")

require("./commandpush")
const { Client, Collection, Interaction } = require(`discord.js`)
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"] })

const event = require('./modules/on.js')

client.once('ready', 
    async () => {


        const { Client, Collection, Interaction } = require(`discord.js`);
        const fs = require("fs")
        
        client.commands = new Collection()
        const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js") && !file.startsWith("_"))
        commandFiles.forEach(commandFile => {
            const command = require(`./commands/${commandFile}`)
            client.commands.set(command.data.name, command)
        })



        event.ready(client)
    })
client.on('interactionCreate', 
    async (interaction) => event.interactionCreate(client, interaction))
client.on('guildCreate', 
    async (guild) => event.guildCreate(client, guild))
client.on('guildDelete', 
    async (guild) => event.guildDelete(client, guild))


client.login(require("./config.json").token)


