# Brickly Reports Cli

A CLI tool for generating reports.

## Setup

1. Clone this repository to your local machine.

```shell
git clone git@github.com:claranet-it/brickly-cli.git
```
2. Navigate into the project directory.

```shell
cd brickly-cli
```
3. Link the package globally using npm.

```shell
npm link
```
4. You should now have the `brickly` command available globally.

## Authentication

This tool requires an environment variable for authentication:
BRICKLY_TOKEN: Obtain this token from Brickly, which can be found in localStorage['auth_token'] in your browser.

### Setting the Environment Variable
You can set the BRICKLY_TOKEN environment variable in several ways:

Temporarily for the current terminal session:
```shell
export BRICKLY_TOKEN='your-token'
```

Permanently for all terminal sessions:

Add the export command to your ~/.zshrc or ~/.bashrc file:
```shell
echo "export BRICKLY_TOKEN='your-token'" >> ~/.zshrc
```

After editing ~/.zshrc or ~/.bashrc, reload the file to apply the changes:
```shell
source ~/.zshrc  # For zsh users
source ~/.bashrc  # For bash users
```