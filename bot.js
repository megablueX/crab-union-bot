const { Client } = require('discord.js');
const token = 'NzQyNjYyMTQwMDc4MzI1ODUx.XzJYBA.FHxthr7B74nvY-IAFpVTBrs-uPY';
//const ytdl = require('ytdl-core');
const config = require('./config.json');
const fs = require('fs');

const client = new Client();
const prefix = config.prefix||'--!';

const commands = {},
	aliases = {},
	commandNames = [],
	commandUsage = [],
	commandDescription = []; // { "command": require("that_command") }, { "alias": "command" }
module.exports = {
	commandNames: commandNames,
	commandUsage: commandUsage,
	commandDescription: commandDescription,
};
fs.readdir('./commands/', (err, files) => {
	if (err) return console.log(err);
	for (const file of files)
		if (file.endsWith('.js')) {
			const commandFile = require(`./commands/${file}`),
				fileName = file.replace('.js', '');
			commands[fileName] = commandFile;
			var objectKeys = Object.keys(commands[fileName].usage);
			commandNames.push(fileName);
			commandUsage.push(objectKeys);
			commandDescription.push(commands[fileName].description);
			if (commandFile.aliases)
				for (const alias of commandFile.aliases)
					aliases[alias] = fileName;
		}
});

var myActivity = setInterval(ShowMyActivity, 10000);

async function ShowMyActivity() {
	var robloxActivity;
	var me = client.users.cache.get('504049242453573642');
	if (me == undefined) return;
	if (me.presence.activities.length <= 0) {
		robloxActivity = 'Nothing at the moment';
	} else if (me.presence.activities[0].name != 'Custom Status') {
		robloxActivity = me.presence.activities[0].name;
	} else {
		robloxActivity = me.presence.activities[0].details;
	}
	client.user.setActivity(
		`${prefix}help in ${client.guilds.cache.size} servers |No Sound: ${robloxActivity}`,
		{ type: 'PLAYING' }
	);
}


const queue = new Map();

client.once('ready', () => {
	console.log('Ready!');
});

client.once('reconnecting', () => {
	console.log('Reconnecting!');
});

client.once('disconnect', () => {
	console.log('Disconnect!');
});

client.on('message', async (message) => {
	if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) return;

	const serverQueue = queue.get(message.guild.id);
	/*var cmd = message.content.split(' ')[0].replace(prefix, '');
	switch(cmd)
	{
		case 'play':
		return execute(message, serverQueue);
		break;
		case 'skip':
		return skip(message, serverQueue);
		break;
		case 'stop':
		return stop(message, serverQueue);
		default:
	}*/
	var content = message.content;
	if (message.content.startsWith(prefix) || message.content.match(`^<@!?${client.user.id}> `)) {
		let content = message.content.split(' ');
		if (content[0].match(`^<@!?${client.user.id}>`)) content.shift();
		else content = message.content.slice(prefix.length).split(' ');
		const identifier = content.shift().toLowerCase(),
			command = identifier;
		content = content.join(' ');

		const commandFile = commands[command];
		if (commandFile) {
			const args = (
				content.match(/\"[^"]+\"|[^ ]+/g) || []
			).map((argument) =>
				argument.startsWith('"') && argument.endsWith('"')
					? argument.slice(1).slice(0, -1)
					: argument
			);
			if (!commandFile.checkArgs(args, content))
				return message.channel.send(
					`❌ Invalid arguments! Usage is \`${prefix}${command}${Object.keys(
						commandFile.usage
					)
						.map((a) => ' ' + a)
						.join(
							''
						)}\`, for additional help, see \`${prefix}help\`.`
				);
			commandFile.run(client, message, args, { content });
		}
	}
});

async function execute(message, serverQueue) {
	const args = message.content.split(' ');

	const voiceChannel = message.member.voice.channel;
	if (!voiceChannel)
		return message.channel.send(
			'You need to be in a voice channel to play music!'
		);
	const permissions = voiceChannel.permissionsFor(message.client.user);
	if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
		return message.channel.send(
			'I need the permissions to join and speak in your voice channel!'
		);
	}

	const songInfo = await ytdl.getInfo(args[1]);
	const song = {
		title: songInfo.title,
		url: songInfo.video_url,
	};

	if (!serverQueue) {
		const queueContruct = {
			textChannel: message.channel,
			voiceChannel: voiceChannel,
			connection: 5,
			songs: [],
			volume: 100,
			playing: true,
		};

		queue.set(message.guild.id, queueContruct);

		queueContruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueContruct.connection = connection;
			play(message.guild, queueContruct.songs[0]);
		} catch (err) {
			console.log(err);
			queue.delete(message.guild.id);
		}
	} else {
		serverQueue.songs.push(song);
		return message.channel.send(
			`${song.title} has been added to the queue!`
		);
	}
}

function skip(message, serverQueue) {
	if (!message.member.voice.channel)
		return message.channel.send(
			'You have to be in a voice channel to stop the music!'
		);
	if (!serverQueue)
		return message.channel.send('There is no song that I could skip!');
	serverQueue.connection.dispatcher.end();
}

function stop(message, serverQueue) {
	if (!message.member.voice.channel)
		return message.channel.send(
			'You have to be in a voice channel to stop the music!'
		);
	serverQueue.songs = [];
	serverQueue.connection.dispatcher.end();
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);
	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}

	const dispatcher = serverQueue.connection
		.play(ytdl(song.url))
		.on('finish', () => {
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', (error) => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
	serverQueue.textChannel.send(`Start playing: **${song.title}**`);
}

client.login(token);
