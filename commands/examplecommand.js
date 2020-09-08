const { MessageEmbed } = require('discord.js');

module.exports = {
    description: "This is an example description for a command",
    usage: {
        "<example argument>": "Argument for command"
    },
    checkArgs: (args) => args.length >= 0 //Define the minimum arguments allowed for the command, in this case, it's 0 at the moment.
}

module.exports.run = async (client, message, args) => {
    message.reply(`You said: "${args.join(" ")}"`); //This will have the bot respond with whatever you placed in the arguments, for example, if you said 'examplecommand hello', the bot will say 'You said: "hello"'
    var embed = new MessageEmbed()
        .setTitle("This is an example embed")
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setDescription("This is an example description for an embed")
        .setFooter("And this is the footer, the small text at the bottom of the embed");
    message.channel.send(embed);
}