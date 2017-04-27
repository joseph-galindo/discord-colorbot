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
        createGuildRole(response, hex, msg)
    });
};

let createGuildRole = (guildMember, hex, msg) => {
    let guild = guildMember.guild;
    let newRole = {
        name: `color-${guildMember.user.username}`,
        color: hex
    };
    let existingRole = null;

    existingRole = guild.roles.find('name', newRole.name);

    if (existingRole) {
        existingRole.edit(newRole)
            .then((roleData) => {
                msg.channel.sendMessage(`Successfully edited color of ${roleData.name} to #${roleData.color.toString(16)}.`);
                setRolePosition(guildMember, existingRole, msg)
            });
    } else {
        guild.createRole(newRole)
            .then((role) => assignGuildMemberRole(guildMember, role, msg));
    }
};

let assignGuildMemberRole = (guildMember, role, msg) => {
    guildMember.addRole(role)
        .then((member) => {
            let savedRole = member.roles.find('name', role.name);
            setRolePosition(guildMember, savedRole, msg);
        });
};

let setRolePosition = (guildMember, role, msg) => {
    let guild = guildMember.guild;
    // Subtract 2, since the ColorBot role will be at guildMember.guild.roles.size - 1, and discord does not complain about this at all for some bad reason.
    let highestPriorityPosition = guildMember.guild.roles.size - 2;

    role.setPosition(highestPriorityPosition)
        .then((role) => {
            msg.channel.sendMessage(`Successfully moved role priority of ${role.name} to the highest priority.`)
        });
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
