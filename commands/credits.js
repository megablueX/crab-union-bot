const { MessageEmbed } = require('discord.js');

module.exports = {
    description: "lists all of the people who help make this bot",
    usage: {
        "": ""
    },
    checkArgs: (args) => args.length >= 0
}

module.exports.run = async (client, message, args) => {
    message.reply("SirH scripted bot. No sound is the owner of bot")
}
