require('dotenv').config(); //initialize dotenv
const Discord = require('discord.js'); //import discord.js
const config = require("./config.json");
const https = require("https");
const pdfreader = require("pdfreader");

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
			msg.channel.send("Not yet implemented");
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
					{ name: 'News:', value: '[News Link](https://gopsusports.com/sports/general/archives?search=&sport=general&season=0)' },
					{ name: 'Store:', value: '[Store Link](https://shop.gopsusports.com/?_s=bm-top_nav&utm_source=psu&utm_medium=referral)' }
				)
			msg.channel.send({ embeds: [optionsEmbed] });
			break;
		case "!stats":
			// TODO import statistics dynamically
			msg.channel.send("todo stats");
			break;
		case "!crash":
			// reset the bot by ending the client
			resetBot(msg.channel)
			break;
		case "!webscrape":
			// TODO test pdfreader lib with this func
			async function bufferize(url) {
				var hn = url.substring(url.search("//") + 2);
				hn = hn.substring(0, hn.search("/"));
				var pt = url.substring(url.search("//") + 2);
				pt = pt.substring(pt.search("/"));
				const options = { hostname: hn, port: 443, path: pt, method: "GET" };
				return new Promise(function (resolve, reject) {
				  var buff = new Buffer.alloc(0);
				  const req = https.request(options, (res) => {
					res.on("data", (d) => {
					  buff = Buffer.concat([buff, d]);
					});
					res.on("end", () => {
					  resolve(buff);
					});
				  });
				  req.on("error", (e) => {
					console.error("https request error: " + e);
				  });
				  req.end();
				});
			  }
			break;
	}
});

function resetBot(channel) {
	// send channel message that you're resetting bot
	channel.send('Resetting...')
		.then(msg => client.destroy())
		.then(() => client.login(config.BOT_TOKEN));
}

//make sure this line is the last line
client.login(config.BOT_TOKEN); //login bot using token

