require('dotenv').config(); //initialize dotenv
const Discord = require('discord.js'); //import discord.js
const config = require("./config.json");

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });//create new client

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', msg => {
	switch (msg.content) {
		case "ping":
			msg.reply('Pong!');
			break;
		case "!test":
			msg.channel.send("Hello!");
			break;
		case "!help":
			// TODO design help documentation
			msg.channel.send("todo stats");
			break;
		case "!ticketinfo":
			// bot provides link for sports tickets
			msg.channel.send("https://gopsusports.com/sports/2018/10/4/tickets-home.aspx");
			break;
		case "!calendar":
			msg.channel.send("https://gopsusports.com/calendar");
			break;
		case "!news":
			// embedded psu sports news webpage link
			const newsEmbed = new Discord.MessageEmbed()
				.setTitle("Penn State Sports News")
				.setURL("https://gopsusports.com/sports/general/archives?search=&sport=general&season=0")
				.setDescription("The official General news stories archives for the Penn State University Nittany Lions")
				.setThumbnail("https://pngset.com/images/penn-state-logo-text-symbol-alphabet-number-transparent-png-1011448.png");
			msg.channel.send({ embeds: [newsEmbed] });
			break;
		case "!options":
			// list of command options with links to website for easy access
			const optionsEmbed = new Discord.MessageEmbed()
				.setTitle("Penn State SportsStat Bot Options")
				.setDescription("Clickable options below direct to gopsusports.com")
				.addFields(
					{ name: 'Tickets:', value: '[Ticket Link](https://gopsusports.com/sports/2018/10/4/tickets-home.aspx)' },
					{ name: 'Calendar:', value: '[Calendar Link](https://gopsusports.com/calendar)' },
					{ name: 'News:', value: '[News Link](https://gopsusports.com/sports/general/archives?search=&sport=general&season=0)' }
				)
			msg.channel.send({ embeds: [optionsEmbed] });
			break;
		case "!stats":
			// TODO import statistics dynamically
			msg.channel.send("todo stats");
			break;
	}
});

//make sure this line is the last line
client.login(config.BOT_TOKEN); //login bot using token

