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
message.channel.send(embed);
var embed2 = new MessageEmbed()
  .setTitle("Here is a list of our groups.")
  .setDescription("1. https://www.roblox.com/groups/5540783/megabluess-blue-army#!/about 2. https://discord.gg/HQnDtuWzqU");
message.channel.send(embed2);
}
