require('dotenv').config(); //initialize dotenv
const Discord = require('discord.js'); //import discord.js
const config = require("./config.json");
const https = require("https");
const puppeteer = require('puppeteer'); //for web scraping online documents

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
			// documentation for bot commands
			const helpEmbed = new Discord.MessageEmbed()
				.setTitle("Commands Documentation")
				.setDescription(`!test - bot responds with "Hello"\n!help - provides full list of bot commands\n!options - outputs list of command options with hyperlinks for easy access\n!ticketinfo - bot provides link to get PSU sports tickets\n!calendar - outputs link to PSU sports calendar\n!news - links to current sports news\n!crash - resets the bot`);
			msg.reply({ embeds: [helpEmbed] });
			break;
		case "!ticketinfo":
			// bot provides link for sports tickets
			msg.reply("https://gopsusports.com/sports/2018/10/4/tickets-home.aspx");
			break;
		case "!calendar":
			msg.reply("https://gopsusports.com/calendar");
			break;
		case "!news":
			// embedded psu sports news webpage link
			const newsEmbed = new Discord.MessageEmbed()
				.setTitle("Penn State Sports News")
				.setURL("https://gopsusports.com/sports/general/archives?search=&sport=general&season=0")
				.setDescription("The official General news stories archives for the Penn State University Nittany Lions")
				.setThumbnail("https://pngset.com/images/penn-state-logo-text-symbol-alphabet-number-transparent-png-1011448.png");
			msg.reply({ embeds: [newsEmbed] });
			break;
		case "!options":
			// list of command options with links to website for easy access
			const optionsEmbed = new Discord.MessageEmbed()
				.setTitle("Penn State SportsStat Bot Options")
				.setDescription("Clickable links below direct to gopsusports.com")
				.addFields(
					{ name: 'Tickets:', value: '[Ticket Link](https://gopsusports.com/sports/2018/10/4/tickets-home.aspx)' },
					{ name: 'Calendar:', value: '[Calendar Link](https://gopsusports.com/calendar)' },
					{ name: 'News:', value: '[News Link](https://gopsusports.com/sports/general/archives?search=&sport=general&season=0)' },
					{ name: 'Store:', value: '[Store Link](https://shop.gopsusports.com/?_s=bm-top_nav&utm_source=psu&utm_medium=referral)' }
				)
			msg.reply({ embeds: [optionsEmbed] });
			break;
		case "!crash":
			// reset the bot by ending the client
			resetBot(msg.channel)
			break;
		case "!webscrape":
			// webscraping may need to be done directly from the HTML of gopsusports.com
			// Testing using https://github.com/puppeteer/puppeteer
			// try page.createPDFStream([option]) for streaming pdf data to the bot
			(async () => {
				// page is loaded in the browser by the bot + puppeteer
				const browser = await puppeteer.launch();
				const page = await browser.newPage();
				await page.goto('https://gopsusports.com/documents/2022/3/31/2022_Baseball_Notes_Maryland.pdf');
				// other actions...
				// this doesnt work as i intended initially
				// something needed here to read scores from the webpage

				await browser.close();
			})();
			break;
		case "!stats mbasketball 3/22":
			// TODO import statistics dynamically
			
			msg.reply("todo stats for sports team and date");
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
client.login(config.BOT_TOKEN); //login and authenticate bot using token

