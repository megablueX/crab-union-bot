const { MessageEmbed } = require('discord.js');

module.exports = {
    description: "lists all groups",
    usage: {
        "": ""
    },
    checkArgs: (args) => args.length >= 0
}

module.exports.run = async (client, message, args) => {

}