// Requires
const Discord = require("discord.js");
let credentials = require('./app_credentials.json');

// Initialization
let colorBot = new Discord.Client();

// Helper Functions
let fetchMember = (guild, userResolvable, callback) => {
    if (typeof callback !== 'function') {
        return;
    }

    guild.fetchMember(userResolvable)
        .then((response) => callback(response));
};

let processRequest = (msg, hex) => {
    let guild = msg.guild;
    let author = msg.author;

    fetchMember(guild, author, (response) => {
        createGuildRole(response, hex)
    });
};

let createGuildRole = (guildMember, hex) => {
    let guild = guildMember.guild;
    let newRole = {
        name: `color-${guildMember.user.username}`,
        color: hex
    };
    let existingRole = null;

    existingRole = guild.roles.find('name', newRole.name);

    if (existingRole) {
        existingRole.edit(newRole)
            .then((roleData) => setRolePosition(guildMember, existingRole));
    } else {
        guild.createRole(newRole)
            .then((role) => assignGuildMemberRole(guildMember, role));
    }
};

let assignGuildMemberRole = (guildMember, role) => {
    guildMember.addRole(role)
        .then((member) => {
            let savedRole = member.roles.find('name', role.name);
            setRolePosition(guildMember, savedRole);
        });
};

let setRolePosition = (guildMember, role) => {
    let guild = guildMember.guild;
    let highestPriorityPosition = guildMember.guild.roles.size - 1;

    role.setPosition(highestPriorityPosition);
};

// Listeners
colorBot.on("message", (messageObject) => {
    let message = messageObject.content.trim();
    let messageWords = message.split(' ');
    let hexCode = '';
    let hexRegex = new RegExp('^#(?:[0-9a-fA-F]{3}){1,2}$');
    let errorMessage = 'Not a valid hex code. Please try again with a valid hex code, such as `.color #FFFFFF`.';

    if (messageWords.length > 1 && messageWords[0] === '.color') {
        hexCode = messageWords[1];

        if (hexRegex.test(hexCode)) {
            processRequest(messageObject, hexCode);
        } else {
            messageObject.channel.sendMessage(errorMessage);
        }
    }
});

// Login
colorBot.login(credentials.bot_token);
