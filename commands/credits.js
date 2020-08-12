const { MessageEmbed } = require('discord.js');

module.exports = {
    description: "Lists who helped with the development of this bot.",
    usage: {
        "": ""
    },
    checkArgs: (args) => args.length >= 0
}

module.exports.run = async (client, message, args) => {

}