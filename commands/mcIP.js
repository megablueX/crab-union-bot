const { MessageEmbed } = require('discord.js');

module.exports = {
    description: "lists the mc IP",
    usage: {
        "": ""
    },
    checkArgs: (args) => args.length >= 0
}

module.exports.run = async (client, message, args) => {
    message.reply(" ")
  var embed = new MessageEmbed() // <-- use this for sending an embedded message
  .setTitle("This is the mc server IP!")
  .setDescription("Pyr4midCraftsmp.aternos.me |java edition only|");
message.channel.send(embed);
