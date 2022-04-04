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
		// TODO add cases for all women's team sports
		// cases for sports statistics below
		// this can be refactored to be made more concise
		// !season + sport for this season's current overall record
		case "!season baseball":
			(async () => {
				// page is loaded in Chromium by the bot + puppeteer
				async function run() {
					const browser = await puppeteer.launch({ headless: false })
					const page = await browser.newPage()
					await page.goto('https://gopsusports.com/sports/baseball/schedule')
					const element = await page.$("li.large-flex-item-1");
					const text = await (await element.getProperty("innerText")).jsonValue();
					console.log(await text);
					msg.reply(await text);
				}
				run()
			})();
			break;
		case "!season softball":
			(async () => {
				// page is loaded in Chromium by the bot + puppeteer
				async function run() {
					const browser = await puppeteer.launch({ headless: false })
					const page = await browser.newPage()
					await page.goto('https://gopsusports.com/sports/softball/schedule')
					const element = await page.$("li.large-flex-item-1");
					const text = await (await element.getProperty("innerText")).jsonValue();
					console.log(await text);
					msg.reply(await text);
				}
				run()
			})();
			break;
		case "!season mbasketball":
			(async () => {
				async function run() {
					const browser = await puppeteer.launch({ headless: false })
					const page = await browser.newPage()
					await page.goto('https://gopsusports.com/sports/mens-basketball/schedule')
					const element = await page.$("li.large-flex-item-1");
					const text = await (await element.getProperty("innerText")).jsonValue();
					console.log(await text);
					msg.reply(await text);
				}
				run()
			})();
			break;
		case "!season wbasketball":
			(async () => {
				async function run() {
					const browser = await puppeteer.launch({ headless: false })
					const page = await browser.newPage()
					await page.goto('https://gopsusports.com/sports/womens-basketball/schedule')
					const element = await page.$("li.large-flex-item-1");
					const text = await (await element.getProperty("innerText")).jsonValue();
					console.log(await text);
					msg.reply(await text);
				}
				run()
			})();
			break;
		case "!season football":
			(async () => {
				async function run() {
					const browser = await puppeteer.launch({ headless: false })
					const page = await browser.newPage()
					await page.goto('https://gopsusports.com/sports/football/schedule')
					const element = await page.$("div.c-events__next-date");
					const text = await (await element.getProperty("innerText")).jsonValue();
					console.log(await text);
					msg.reply(await text);
				}
				run()
			})();
			break;
		case "!season mgymnastics":
			(async () => {
				async function run() {
					const browser = await puppeteer.launch({ headless: false })
					const page = await browser.newPage()
					await page.goto('https://gopsusports.com/sports/mens-gymnastics/schedule')
					const element = await page.$("li.large-flex-item-1");
					const text = await (await element.getProperty("innerText")).jsonValue();
					console.log(await text);
					msg.reply(await text);
				}
				run()
			})();
			break;
		case "!season wgymnastics":
			(async () => {
				async function run() {
					const browser = await puppeteer.launch({ headless: false })
					const page = await browser.newPage()
					await page.goto('https://gopsusports.com/sports/womens-gymnastics/schedule')
					const element = await page.$("li.large-flex-item-1");
					const text = await (await element.getProperty("innerText")).jsonValue();
					console.log(await text);
					msg.reply(await text);
				}
				run()
			})();
			break;
		case "!season mhockey":
			(async () => {
				async function run() {
					const browser = await puppeteer.launch({ headless: false })
					const page = await browser.newPage()
					await page.goto('https://gopsusports.com/sports/mens-ice-hockey/schedule')
					const element = await page.$("li.large-flex-item-1");
					const text = await (await element.getProperty("innerText")).jsonValue();
					console.log(await text);
					msg.reply(await text);
				}
				run()
			})();
			break;
		case "!season whockey":
			(async () => {
				async function run() {
					const browser = await puppeteer.launch({ headless: false })
					const page = await browser.newPage()
					await page.goto('https://gopsusports.com/sports/womens-ice-hockey/schedule')
					const element = await page.$("li.large-flex-item-1");
					const text = await (await element.getProperty("innerText")).jsonValue();
					console.log(await text);
					msg.reply(await text);
				}
				run()
			})();
			break;
		case "!season mlacrosse":
			(async () => {
				async function run() {
					const browser = await puppeteer.launch({ headless: false })
					const page = await browser.newPage()
					await page.goto('https://gopsusports.com/sports/mens-lacrosse/schedule')
					const element = await page.$("li.large-flex-item-1");
					const text = await (await element.getProperty("innerText")).jsonValue();
					console.log(await text);
					msg.reply(await text);
				}
				run()
			})();
			break;
		case "!season wlacrosse":
			(async () => {
				async function run() {
					const browser = await puppeteer.launch({ headless: false })
					const page = await browser.newPage()
					await page.goto('https://gopsusports.com/sports/womens-lacrosse/schedule')
					const element = await page.$("li.large-flex-item-1");
					const text = await (await element.getProperty("innerText")).jsonValue();
					console.log(await text);
					msg.reply(await text);
				}
				run()
			})();
			break;
		case "!season msoccer":
			(async () => {
				async function run() {
					const browser = await puppeteer.launch({ headless: false })
					const page = await browser.newPage()
					await page.goto('https://gopsusports.com/sports/mens-soccer/schedule')
					const element = await page.$("div.c-events__next-date");
					const text = await (await element.getProperty("innerText")).jsonValue();
					console.log(await text);
					msg.reply(await text);
				}
				run()
			})();
			break;
		case "!season wsoccer":
			(async () => {
				async function run() {
					const browser = await puppeteer.launch({ headless: false })
					const page = await browser.newPage()
					await page.goto('https://gopsusports.com/sports/womens-soccer/schedule')
					const element = await page.$("div.c-events__next-date");
					const text = await (await element.getProperty("innerText")).jsonValue();
					console.log(await text);
					msg.reply(await text);
				}
				run()
			})();
			break;
		case "!season mswimming":
			(async () => {
				async function run() {
					const browser = await puppeteer.launch({ headless: false })
					const page = await browser.newPage()
					await page.goto('https://gopsusports.com/sports/mens-swimming-and-diving/schedule')
					const element = await page.$("li.large-flex-item-1");
					const text = await (await element.getProperty("innerText")).jsonValue();
					console.log(await text);
					msg.reply(await text);
				}
				run()
			})();
			break;
		case "!season wswimming":
			(async () => {
				async function run() {
					const browser = await puppeteer.launch({ headless: false })
					const page = await browser.newPage()
					await page.goto('https://gopsusports.com/sports/womens-swimming-and-diving/schedule')
					const element = await page.$("li.large-flex-item-1");
					const text = await (await element.getProperty("innerText")).jsonValue();
					console.log(await text);
					msg.reply(await text);
				}
				run()
			})();
			break;
		case "!season mtennis":
			(async () => {
				async function run() {
					const browser = await puppeteer.launch({ headless: false })
					const page = await browser.newPage()
					await page.goto('https://gopsusports.com/sports/mens-tennis/schedule')
					const element = await page.$("li.large-flex-item-1");
					const text = await (await element.getProperty("innerText")).jsonValue();
					console.log(await text);
					msg.reply(await text);
				}
				run()
			})();
			break;
		case "!season wtennis":
			(async () => {
				async function run() {
					const browser = await puppeteer.launch({ headless: false })
					const page = await browser.newPage()
					await page.goto('https://gopsusports.com/sports/womens-tennis/schedule')
					const element = await page.$("li.large-flex-item-1");
					const text = await (await element.getProperty("innerText")).jsonValue();
					console.log(await text);
					msg.reply(await text);
				}
				run()
			})();
			break;
		case "!season mvolleyball":
			(async () => {
				async function run() {
					const browser = await puppeteer.launch({ headless: false })
					const page = await browser.newPage()
					await page.goto('https://gopsusports.com/sports/mens-volleyball/schedule')
					const element = await page.$("li.large-flex-item-1");
					const text = await (await element.getProperty("innerText")).jsonValue();
					console.log(await text);
					msg.reply(await text);
				}
				run()
			})();
			break;
		case "!season wvolleyball":
			(async () => {
				async function run() {
					const browser = await puppeteer.launch({ headless: false })
					const page = await browser.newPage()
					await page.goto('https://gopsusports.com/sports/womens-volleyball/schedule')
					const element = await page.$("li.large-flex-item-1");
					const text = await (await element.getProperty("innerText")).jsonValue();
					console.log(await text);
					msg.reply(await text);
				}
				run()
			})();
			break;
		case "!season wrestling":
			(async () => {
				async function run() {
					const browser = await puppeteer.launch({ headless: false })
					const page = await browser.newPage()
					await page.goto('https://gopsusports.com/sports/wrestling/schedule')
					const element = await page.$("li.large-flex-item-1");
					const text = await (await element.getProperty("innerText")).jsonValue();
					console.log(await text);
					msg.reply(await text);
				}
				run()
			})();
			break;
		case "!season help":
			msg.reply();
			break;
		// the case below is trying to find a specified game based on user command	
		case "!stats mbasketball March 10":
			// todo for specific team and date
			(async () => {
				// page is loaded in Chromium by the bot + puppeteer
				async function run() {
					const browser = await puppeteer.launch({ headless: false })
					const page = await browser.newPage()
					await page.goto('https://gopsusports.com/sports/mens-basketball/schedule')
					const elements = await page.$$("div.sidearm-schedule-game-result");
					elements.forEach(async element => {
						const text = await (await element.getProperty("innerText")).jsonValue();
						console.log(await text);
					});
					msg.reply("need to work on");
				}
				run()
			})();
			break;
		case "!webscrape":
			// webscraping done directly from the HTML of gopsusports.com
			// Testing use of https://github.com/puppeteer/puppeteer
			(async () => {
				// page is loaded in Chromium by the bot + puppeteer
				async function run() {
					const browser = await puppeteer.launch({ headless: false })
					const page = await browser.newPage()
					await page.goto('https://gopsusports.com/sports/mens-basketball/schedule')

					const element = await page.$("div.sidearm-schedule-game-result");
					const text = await (await element.getProperty("innerText")).jsonValue();
					console.log(await text);
					msg.reply(await text);
				}
				run()
			})();
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

