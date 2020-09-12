const { MessageEmbed } = require('discord.js');

module.exports = {
    description: "lists all groups",
    usage: {
        "": ""
    },
    checkArgs: (args) => args.length >= 0
}

var embed = new MessageEmbed()
  .setTitle("Here is a list of our groups.")
  .setDescription("1. https://www.roblox.com/groups/5540783/megabluess-blue-army#!/about");
message.channel.send(embed);
}
