const { SlashCommandBuilder } = require("@discordjs/builders")

const create = require("./create")
const vote = require("./vote")
const getvotes = require("./getvotes")
const end = require("./end")
const getpolls = require("./getpolls")

module.exports = {

    data: new SlashCommandBuilder()
        .setName('poll')
        .setDescription('Create and end polls.')
        .addSubcommandGroup(group => group
            .setName('get')
            .setDescription("Get properies of polls.")
            .addSubcommand(option => option
                .setName('votes')
                .setDescription("Get who votet which option.")
                .addIntegerOption(option => option
                    .setName('id')
                    .setDescription('The ID of the survey you want to know the votes from.')
                    .setRequired(true)
                )
            ).addSubcommand(option => option
                .setName('polls')
                .setDescription('List all active votes in this Server.')  
            )
        )
        .addSubcommand(subcommand => subcommand
            .setName('create')
            .setDescription('Create a new poll.')
            .addStringOption(option => option
                .setName('title')
                .setDescription('The title of the poll you want to create.')
                .setRequired(true)
            ).addStringOption(option => option
                .setName('description')
                .setDescription('The Description of the poll you want to create.')
                .setRequired(true)
            ).addIntegerOption(option => option
                .setName('id')
                .setDescription('The ID of the poll you want to create. Must be a unique number.')
                .setRequired(true)
            ).addIntegerOption(option => option
                .setName('min')
                .setDescription('The minimal required votes to enter the poll.')
                .setMinValue(1)
                .setMaxValue(10)
                .setRequired(true)
            ).addIntegerOption(option => option
                .setName('max')
                .setDescription('The maximal number of votes you can vote.')
                .setMinValue(1)
                .setMaxValue(10)
                .setRequired(true)
            ).addNumberOption(option => option
                .setName('end')
                .setDescription('The time in hours until the poll ends. (1 = 1h; 1.5 = 1h30m; etc.)')
                .setMinValue(0.1)
                .setRequired(true)
            ).addBooleanOption(option => option
                .setName('autoend')
                .setDescription('"True" if poll should end automaticly after defined time has ended.')
                .setRequired(true)
            ).addBooleanOption(option => option
                .setName('results')
                .setDescription('"True" if the votes should be published after poll has ended.')
                .setRequired(true)
            ).addStringOption(option => option
                .setName('option1')
                .setDescription('The first option which can be voted.')
                .setRequired(true)
            ).addStringOption(option => option
                .setName('option2')
                .setDescription('The second option which can be voted.')
                .setRequired(true)
            ).addStringOption(option => option
                .setName('option3')
                .setDescription('[...]')
            ).addStringOption(option => option
                .setName('option4')
                .setDescription('[...]')
            ).addStringOption(option => option
                .setName('option5')
                .setDescription('[...]')
            ).addStringOption(option => option
                .setName('option6')
                .setDescription('[...]')
            ).addStringOption(option => option
                .setName('option7')
                .setDescription('[...]')
            ).addStringOption(option => option
                .setName('option8')
                .setDescription('[...]')
            ).addStringOption(option => option
                .setName('option9')
                .setDescription('[...]')
            ).addStringOption(option => option
                .setName('option10')
                .setDescription('[...]')
            )
            
        )
        .addSubcommand(subcommand => subcommand
            .setName('end')
            .setDescription('End a poll.')
            .addIntegerOption(option => option
                .setName('id')
                .setDescription('The ID of the poll you want to manually end')
                .setRequired(true) 
            ).addBooleanOption(option => option
                .setName('results')
                .setDescription('`True` if the votes should be published after poll has ended. (overwrite)')
                .setRequired(true)    
            )
        ),


    async command(interaction) {
        switch (interaction.options.getSubcommand()) {
            case "create": {await create.execute(interaction); return}
            case "end": {await end.execute(interaction); return}
            case "votes": {await getvotes.execute(interaction); return}
            case "polls": {await getpolls.execute(interaction); return}
            default: {interaction.reply({content: "Thats odd... How did you get here? Seams like this is an outdated command or something went wrong :/", ephemeral: true}); return}
        }
    },

    async menu(interaction) {
        await vote.execute(interaction)
    }

    
}