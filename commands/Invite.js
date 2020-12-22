const { MessageEmbed } = require('discord.js');

module.exports = {
    description: "instructions to invite this bot",
    usage: {
        "": ""
    },
    checkArgs: (args) => args.length >= 0
}

module.exports.run = async (client, message, args) => {

}
