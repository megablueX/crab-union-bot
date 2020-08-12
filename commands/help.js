const { commandNames, commandUsage, commandDescription } = require('../bot.js'), { MessageEmbed } = require('discord.js');

module.exports = {
    description: "Lists all of the commands that are available.",
    usage: {
        "": ""
    },
    checkArgs: (args) => args.length >= 0
}

module.exports.run = async (client, message, args) => {
    var fields = [];
    for (var i in commandNames) {
        fields.push({ name: `${commandNames[i]} ${commandUsage[i]}`, value: commandDescription[i] });
    }
    console.log(`commandNames: ${commandNames} ${commandNames.length}`);
    console.log(`commandUsage: ${commandUsage} ${commandUsage.length}`);
    console.log(`commandUsageDetails: ${commandDescription} ${commandDescription.length}`);

    var embed = new MessageEmbed()
        .setTitle("Command List")
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setThumbnail(client.user.avatarURL())
        .setDescription("All of the commands are listed here")
        .addFields(fields)
        .setFooter("Crab Union Info bot stuff");
    message.channel.send(embed);
}