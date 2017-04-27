# discord-colorbot

## Description
This is a simple bot to allow users to edit their color via a text command within any text channel the bot has access to.

## Prerequisites
- node
- npm
- Assumes you are an admin/own the server you want this bot to run on

## Installation
1. Clone this repo.
2. Run `npm install`.
3. Create a new `app` under your Discord account through [Discord's Developer Docs ](https://discordapp.com/developers/applications/me).
4. Within that new `app`, create a `bot user`.
5. The bot user above should at least give you a `Token` field. Click to reveal it, copy it, and open `app_credentials.json` within this repo.
6. Within `app_credentials.json`, replace `token_goes_here` with that copied token of your bot user.
7. Navigate to the [Discord Permissions Calculator](https://discordapi.com/permissions.html), and generate an invite link for your bot. Since this bot works through roles, we need the `Manage Roles` permission. So you can click `Manage Roles`, and supply the Client ID in the bottom text field (which is on the same page as where you got the `Token`). You'll be given the invite link below. So if your bot's client ID is 7, your invite link would be: `https://discordapp.com/oauth2/authorize?client_id=7&scope=bot&permissions=268435456`.
    - These permissions are explained more on the [official docs](https://discordapp.com/developers/docs/topics/permissions)
8. Once the bot is successfully added to your server, it should have a new role with the same name as the `app` you created in Discord. Go into Server Settings -> Roles, and **drag the role to the top/highest priority**. This *must* be done, or the bot will not be able to manage the color roles as intended and **will not work properly**. The role order should look like this, where `ColorBot` is the role of my bot user: ![example](https://cdn.discordapp.com/attachments/306934974727192578/307001511886716929/asdf.PNG)
9. Run `npm start` and the bot should run and work as intended.

## Usage
Simply type `.color #XXXXXX` into a text channel the bot has access to, where `#XXXXXX` is a valid hex code.

This may be changed in the future to support looser formats, such as `XXXXXX` instead of `#XXXXXX`.

## License
Provided under the MIT License.
