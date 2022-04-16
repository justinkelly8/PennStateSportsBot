require('dotenv').config(); //initialize dotenv
const Discord = require('discord.js'); //import discord.js
const config = require("./config.json");
const https = require("https");
const puppeteer = require('puppeteer'); //for web scraping online documents
const axios = require('axios');
const cheerio = require('cheerio');
const jquery = require('jquery');

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });//create new client

const basketball_url = 'https://www.sports-reference.com/cbb/schools/penn-state/2022-schedule.html'

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
				.setDescription(`!test - bot responds with "Hello"\n!help - provides full list of bot commands\n!options - outputs list of command options with hyperlinks for easy access\n!ticketinfo - bot provides link to get PSU sports tickets\n!calendar - outputs link to PSU sports calendar\n!news - links to current sports news\n!crash - resets the bot\n!season followed by the desired sport eg. "!season mbasketball" (msoccer, wtennis, football, baseball, etc) - responds with this season's overall record for the sport
				!season help - provides a list of options for "!season" command `);
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
					{ name: 'Penn State Sports Tickets:', value: '[Tickets Link](https://gopsusports.com/sports/2018/10/4/tickets-home.aspx)' },
					{ name: 'Event Calendar:', value: '[Calendar Link](https://gopsusports.com/calendar)' },
					{ name: 'Keep Up to Date:', value: '[News Link](https://gopsusports.com/sports/general/archives?search=&sport=general&season=0)' },
					{ name: 'Merchandise:', value: '[Store Link](https://shop.gopsusports.com/?_s=bm-top_nav&utm_source=psu&utm_medium=referral)' }
				)
			msg.reply({ embeds: [optionsEmbed] });
			break;
		case "!crash":
			// reset the bot by ending the client
			resetBot(msg.channel)
			break;
		// cases for sports season statistics below
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
					msg.reply(await text);
					await browser.close();
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
					msg.reply(await text);
					await browser.close();
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
					msg.reply(await text);
					await browser.close();
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
					msg.reply(await text);
					await browser.close();
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
					msg.reply(await text);
					await browser.close();
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
					msg.reply(await text);
					await browser.close();
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
					msg.reply(await text);
					await browser.close();
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
					msg.reply(await text);
					await browser.close();
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
					msg.reply(await text);
					await browser.close();
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
					msg.reply(await text);
					await browser.close();
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
					msg.reply(await text);
					await browser.close();
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
					msg.reply(await text);
					await browser.close();
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
					msg.reply(await text);
					await browser.close();
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
					msg.reply(await text);
					await browser.close();
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
					msg.reply(await text);
					await browser.close();
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
					msg.reply(await text);
					await browser.close();
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
					msg.reply(await text);
					await browser.close();
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
					msg.reply(await text);
					await browser.close();
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
					msg.reply(await text);
					await browser.close();
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
					msg.reply(await text);
					await browser.close();
				}
				run()
			})();
			break;
		case "!season help":
			const seasonHelp = `!season followed by the sport eg. "!season wbasketball"; other options include: mbasketball, baseball, softball, football, wrestling, mgymnastics, wgymnastics, mhockey, whockey, msoccer, wsoccer, mlacrosse, wlacrosse, mswimming, wswimming, mtennis, wtennis, mvolleyball, wvolleyball`;
			msg.reply(seasonHelp);
			break;

		case "!mbasketball Nov 10":
			// gets input and compares to scores from Penn State's schedule
			async function getGameDaysAndLinks() {
				const { data } = await axios.get(basketball_url)
				const $ = cheerio.load(data);
				const table = $('#schedule')
				const games = []
				table.find('tbody > tr').each((i, element) => {
					const $row = $(element)
					const game = {}
					game.number = $row.find('th').first().text().trim()
					const labels = ['date_game', 'time_game', 'game_type', 'game_location', 'opp_name', 'conf_abbr', 'game_result', 'pts', 'opp_pts', 'overtimes', 'wins', 'losses', 'game_streak', 'arena']
					$row.find('td').each((i, element) => {
						const $col = $(element)
						const label = labels[i]
						game[label] = $col.text().trim()
					})
					games.push(game)
				})
				//console.log(games[0].date_game)
				if (games[0].date_game.includes("Nov 10")) {
					msg.reply("Penn State " + games[0].pts + " - " + games[0].opp_pts + " " + games[0].opp_name);
				}
			}
			getGameDaysAndLinks()

			break;

		case "!mbasketball Nov 15":
			// gets input and compares to scores from Penn State's schedule
			async function getGameDayAndLink() {
				const { data } = await axios.get(basketball_url)
				const $ = cheerio.load(data);
				const table = $('#schedule')
				const games = []
				table.find('tbody > tr').each((i, element) => {
					const $row = $(element)
					const game = {}
					game.number = $row.find('th').first().text().trim()
					const labels = ['date_game', 'time_game', 'game_type', 'game_location', 'opp_name', 'conf_abbr', 'game_result', 'pts', 'opp_pts', 'overtimes', 'wins', 'losses', 'game_streak', 'arena']
					$row.find('td').each((i, element) => {
						const $col = $(element)
						const label = labels[i]
						game[label] = $col.text().trim()
					})
					games.push(game)
				})
				//console.log(games[0].date_game)
				if (games[1].date_game.includes("Nov 15")) {
					msg.reply("Penn State " + games[1].pts + " - " + games[1].opp_pts + " " + games[1].opp_name);
				}
			}
			getGameDayAndLink()

			break;

		case "!mbasketball Mar 10":
			// gets input and compares to scores from Penn State's schedule
			async function ohioGameDayAndLink() {
				const { data } = await axios.get(basketball_url)
				const $ = cheerio.load(data);
				const table = $('#schedule')
				const games = []
				table.find('tbody > tr').each((i, element) => {
					const $row = $(element)
					const game = {}
					game.number = $row.find('th').first().text().trim()
					const labels = ['date_game', 'time_game', 'game_type', 'game_location', 'opp_name', 'conf_abbr', 'game_result', 'pts', 'opp_pts', 'overtimes', 'wins', 'losses', 'game_streak', 'arena']
					$row.find('td').each((i, element) => {
						const $col = $(element)
						const label = labels[i]
						game[label] = $col.text().trim()
					})
					games.push(game)
				})
				//console.log(games[0].date_game)
				if (games[30].date_game.includes("Mar 10")) {
					msg.reply("Penn State " + games[30].pts + " - " + games[30].opp_pts + " " + games[30].opp_name);
				}
			}
			ohioGameDayAndLink()

			break;

		case "!football Sep 4":
			const fBallDateInput1 = "Sep 4, 2021";
			// webscraping done directly from the HTML of sports-reference.com
			async function getFootBallGameDaysAndLinks1() {
				const page_url = 'https://www.sports-reference.com/cfb/schools/penn-state/2021-schedule.html'
				const { data } = await axios.get(page_url)
				const $ = cheerio.load(data)
				const table = $('#schedule')
				const games = []
				table.find('tbody > tr').each((i, element) => {
					const $row = $(element)
					const game = {}
					game.number = $row.find('th').first().text().trim()
					const labels = ['date_game', 'time_game', 'day_name', 'school_name', 'game_location', 'opp_name', 'conf_abbr', 'game_result', 'points', 'opp_points', 'wins', 'losses', 'game_streak', 'notes']
					$row.find('td').each((i, element) => {
						const $col = $(element)
						const label = labels[i]
						game[label] = $col.text().trim()
					})
					games.push(game)
				})
				for (var i = 0; i < games.length; i++) {
					if (games[i].date_game == fBallDateInput1) {
						console.log(games[i].school_name + " " + games[i].points + " - " + games[i].opp_points + " " + games[i].opp_name);
						msg.reply(games[i].school_name + " " + games[i].points + " - " + games[i].opp_points + " " + games[i].opp_name);
					}
				}
			}
			getFootBallGameDaysAndLinks1()
			break;

		case "!football Sep 18":
			const fBallDateInput = "Sep 18, 2021";
			// webscraping done directly from the HTML of sports-reference.com
			async function getFootBallGameDaysAndLinks() {
				const page_url = 'https://www.sports-reference.com/cfb/schools/penn-state/2021-schedule.html'
				const { data } = await axios.get(page_url)
				const $ = cheerio.load(data)
				const table = $('#schedule')
				const games = []
				table.find('tbody > tr').each((i, element) => {
					const $row = $(element)
					const game = {}
					game.number = $row.find('th').first().text().trim()
					const labels = ['date_game', 'time_game', 'day_name', 'school_name', 'game_location', 'opp_name', 'conf_abbr', 'game_result', 'points', 'opp_points', 'wins', 'losses', 'game_streak', 'notes']
					$row.find('td').each((i, element) => {
						const $col = $(element)
						const label = labels[i]
						game[label] = $col.text().trim()
					})
					games.push(game)
				})
				for (var i = 0; i < games.length; i++) {
					if (games[i].date_game == fBallDateInput) {
						console.log(games[i].school_name + " " + games[i].points + " - " + games[i].opp_points + " " + games[i].opp_name);
						msg.reply(games[i].school_name + " " + games[i].points + " - " + games[i].opp_points + " " + games[i].opp_name);
					}
				}
			}
			getFootBallGameDaysAndLinks()
			break;

		case "!stats ":
			if (games[0].date_game == dateInput) {
				console.log("Penn State " + games[0].pts + " - " + games[0].opp_pts + "" + games[0].opp_name);

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
client.login(config.BOT_TOKEN); //login and authenticate bot using token

