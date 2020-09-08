const { Client } = require('discord.js'), client = new Client(), config = require('./config.json'), fs = require('fs');
client.login(config.token);
const commands = {}, aliases = {}, commandNames = [], commandUsage = [], commandDescription = []; // { "command": require("that_command") }, { "alias": "command" }
module.exports = {
	commandNames: commandNames,
	commandUsage: commandUsage,
	commandDescription: commandDescription
}
fs.readdir("./commands/", (err, files) => {
	if (err) return console.log(err);
	for (const file of files) if (file.endsWith(".js")) {
		const commandFile = require(`./commands/${file}`), fileName = file.replace(".js", "");
		commands[fileName] = commandFile;
		var objectKeys = Object.keys(commands[fileName].usage);
		commandNames.push(fileName);
		commandUsage.push(objectKeys);
		commandDescription.push(commands[fileName].description);
		if (commandFile.aliases) for (const alias of commandFile.aliases) aliases[alias] = fileName;
	}
})

client.on('ready', () => {
	console.log("The Info bot is active.");
});

var myActivity = setInterval(ShowMyActivity, 10000);

async function ShowMyActivity() {
	var robloxActivity;
	var me = client.users.cache.get("721849157047943188");
	if (me == undefined) {
		return;
	}
	if (me.presence.activities.length <= 0) {
		robloxActivity = "Nothing at the moment";
	} else if (me.presence.activities[0].name != "Custom Status") {
		robloxActivity = me.presence.activities[0].name;
	} else {
		robloxActivity = "Status unavailable currently";
	}
	client.user.setActivity(`s!help in ${client.guilds.cache.size} servers | roblox no sound: ${robloxActivity}`, { type: "PLAYING" });
}

client.on('messages', async (message) => {
	if (message.author.id == botID) return;
	const prefix = config.prefix;
	var content = message.content;
	if (message.content.startsWith(prefix) || message.content.match(`^<@!?${client.user.id}> `)) {
		let content = message.content.split(" ")
		if (content[0].match(`^<@!?${client.user.id}>`)) content.shift(); else content = message.content.slice(prefix.length).split(" ")
		const identifier = content.shift().toLowerCase(), command = identifier;
		content = content.join(" ")

		const commandFile = commands[command]
		if (commandFile) {
			const args = content;
			if (!commandFile.checkArgs(args, content)) return message.channel.send(`❌ Invalid arguments! Usage is \`${prefix}${command}${Object.keys(commandFile.usage).map(a => " " + a).join("")}\`, for additional help, see \`${prefix}help\`.`)
			commandFile.run(client, message, args, { content });
		}
	}
})