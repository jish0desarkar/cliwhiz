# CliWhiz - CLI Helper for Command Generation

**CliWhiz** is a command-line interface (CLI) tool designed to assist users in generating commands effortlessly. Whether you're a beginner looking for guidance or an experienced user seeking quick command suggestions, CliWhiz is here to streamline your command-line experience.

## Features

- **Intuitive Command Generation:** Easily generate complex commands with natural language queries.
- **OpenAI Integration:** Leverage the power of OpenAI's GPT-3.5 Turbo to receive accurate and context-aware command suggestions.
- **Clipboard Integration:** Copy the selected command directly to your clipboard for quick and convenient use.

## Installation

To get started with CliWhiz, follow these simple steps:

Download the tool from NPM using the following command

```bash
npm install cliwhiz --global
```
Please note `--global` flag is necessary for the tool to work in any directory.



## Usage

### Setting Up API Key

When you run the tool for the first time, it will prompt you to enter your OpenAI API key. If you already have a key, simply copy and paste it into the terminal prompt and press enter. If you don't have a key yet, visit [OpenAI's platform](https://platform.openai.com/) to generate an API key.

<img src="./assets/Screenshot 2024-01-20 at 1.15.57 PM.png" alt="drawing" width="480"/>

# Generating Commands

To generate a command, simply provide a natural language query as an argument:

```bash
cwz "list all docker containers with label nginx"
```

# Copying Commands

1. CliWhiz provides a selection menu for suggested commands. Choose a command and hit enter and it will be copied to your clipboard for easy pasting. After generating a command, the tool will prompt you to select a command from a list:

	```bash
	cwz "list all docker containers with label nginx"
	```
	<img src="./assets/Screenshot 2024-01-20 at 1.31.55 PM.png" alt="drawing" width="480"/>

2. In the event that multiple commands are generated, you have the option to select "Copy All" to copy all the commands separated by `&&`:

	<img src="./assets/Screenshot 2024-01-20 at 1.18.33 PM.png" alt="drawing" width="480"/>

## Examples

Generate a command to list all Docker containers:

```bash
cwz "list all docker containers"
```


Feel free to contribute, report issues, or suggest improvements! Happy command-line hacking!