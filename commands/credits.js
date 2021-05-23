const { MessageEmbed } = require('discord.js');

module.exports = {
    description: "lists all of the people who help make this bot",
    usage: {
        "": ""
    },
    checkArgs: (args) => args.length >= 0
}

module.exports.run = async (client, message, args) => {
    message.reply(" ")
  var embed = new MessageEmbed() // <-- use this for sending an embedded message
  .setTitle("This is a list of all the people who helped script bot")
  .setDescription("SirH scripted bot. No sound is the owner and is the person who does most of the updating of bot");
message.channel.send(embed);
}
