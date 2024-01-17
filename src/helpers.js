import inquirer from 'inquirer';
import fs from 'fs';
import chalk from 'chalk';
import os from 'os';
import { join, dirname } from 'path';


const configPath = join(os.homedir(), '.cmdaid', 'config.json');

const setupApiKeyPrompt = async () => {
	const answers = await inquirer.prompt([
		{
			type: 'input',
			name: 'apiKey',
			message: 'Please enter your API key:',
		},
	]);
	saveApiKey(answers.apiKey);
	console.log(chalk.greenBright('API key saved successfully. You can now use the tool.'));
}

const removeApiKeyPrompt = async () => {
	// Confirm deletion with the user
	const confirmation = await inquirer.prompt([
		{
			type: 'confirm',
			name: 'confirmDelete',
			message: 'Are you sure you want to delete the API key?',
		},
	]);

	if (confirmation.confirmDelete) {
		deleteApiKey();

		console.log(chalk.green('API key deleted successfully.'));
	} else {
		console.log(chalk.yellow('Deletion canceled.'));
	}
}

const deleteApiKey = () => {
	saveApiKey('');
}
const saveApiKey = (apiKey) => {

	const config = { API_KEY: apiKey };

	// Ensure the directory exists before saving the config file
	if (!fs.existsSync(dirname(configPath))) {
		fs.mkdirSync(dirname(configPath), { recursive: true });
	}

	fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
}

/**
 * Reads the API key from the configuration file and returns it.
 *
 * @return {string|null} The API key if it exists in the configuration file,
 *                       otherwise null.
 */
const loadApiKey = () => {
	try {
		const configData = fs.readFileSync(configPath, 'utf8');
		const config = JSON.parse(configData);
		return config.API_KEY;
	} catch (error) {
		return null;
	}
}

export { setupApiKeyPrompt, removeApiKeyPrompt, loadApiKey }