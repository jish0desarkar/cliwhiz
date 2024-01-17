import { program } from 'commander'
import select from '@inquirer/select';
import clipboard from 'clipboardy'
import OpenAI from "openai";
import chalk from 'chalk';
import { setupApiKeyPrompt, removeApiKeyPrompt, loadApiKey } from './helpers.js';


program
	.name('CmdAid')
	.description(chalk.cyanBright('CLI helper to generate commands'))
	.version('1.0.1')

const apiKey = loadApiKey();

program
	.arguments('<query...>')
	.action((queries) => {
		if (queries.length !== 1) {
			console.log(chalk.redBright('Invalid command'));
			console.log(chalk.blueBright('Usage: cwz "<query>"'));
			console.log(chalk.yellowBright('Example: cwz "list all docker containers with label nginx"'));
			// Exit the process with a non-zero status code
			process.exit(1);
		}

		const query = queries[0];
		// Your logic for processing the single query
		console.log(chalk.greenBright('Processing query:'), query);
	});

program.parse(process.argv)

// Delete API Key
// if (program.args[0] === '--delete-api-key') {
// 	apiKey ? await removeApiKeyPrompt() : console.log(chalk.redBright('API key is not set or already deleted'))
// 	process.exit(0);
// }

// Check if API key is set
if (!apiKey) {
	console.log(chalk.yellowBright('API key is not set.'));
	await setupApiKeyPrompt();
}


const openai = new OpenAI({
	"apiKey": loadApiKey()
});

/**
 * Generates a list of suggested commands based on the provided content.
 *
 * @param {string} content - The user input content.
 * @returns {Array} The suggested commands as an array of strings.
 */
async function getSuggestedCommands(content) {
	const completion = await openai.chat.completions.create({
		messages: [
			{
				role: "system",
				content: "You are a helpful command line tool designed to suggest commands and nothing else. Suggest full commands so I can direclty copy and paste. Output as JSON, example structure {'commands': [`output_here`]}",
			},
			{ role: "user", content: content },
		],
		model: "gpt-3.5-turbo-1106",
		response_format: { type: "json_object" },
	});
	return JSON.parse(completion.choices[0].message.content).commands
}

const suggestedCommands = await getSuggestedCommands(program.args[0])

const choices = suggestedCommands.map(function (item) {
	return { name: item, value: item };
});

if (choices.length > 1) {
	choices.push({ name: 'Copy All', value: suggestedCommands.join(' && ') });
}

const answer = await select({
	message: 'Select a command to copy to clipboard',
	choices: choices,
});

clipboard.writeSync(answer);
console.log(chalk.green('\u2714 Selected command copied to your clipboard'));


