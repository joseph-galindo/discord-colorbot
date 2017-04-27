// Requires
const Discord = require("discord.js");
let credentials = require('./app_credentials.json');

// Initialization
let colorBot = new Discord.Client();

// Helper Functions
let createRole = () => {

}

// Listeners
colorBot.on("message", (messageObject) => {

});

// Login
colorBot.login(credentials.bot_token);
