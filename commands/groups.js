const { MessageEmbed } = require('discord.js');
module.exports = {
    description: "lists all groups",
    usage: {
        "": ""
    },
    checkArgs: (args) => args.length >= 0
}
module.exports.run = async (client, message, args) => {
    message.reply(" ")
var embed = new MessageEmbed()
  .setTitle("Here are our groups.")
  .setDescription("join our groups!");
  .setTitle("Here is a list of our groups.")
  .setDescription("1. https://www.roblox.com/groups/5540783/megabluess-blue-army#!/about");
message.channel.send(embed);
}
