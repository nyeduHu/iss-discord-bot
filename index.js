require('dotenv').config();
const Discord = require('discord.js');
const Client = new Discord.Client();

const snekfetch = require('snekfetch');
const api = "https://api.wheretheiss.at/v1/satellites/25544&units=miles";

Client.on('ready', () => {
  console.log(`Logged in as ${Client.user.tag}!`);
});

Client.on('message', message => {
    const prefix = 'i!';

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(command == "iss"){
        snekfetch.get(api).then(r =>{
			      let body = r.body;
            let latitude = body["latitude"];
            let longitude = body["longitude"];
            let altitude = body["altitude"];
            let velocity = body["velocity"];
            let link = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`
            let embed = new Discord.MessageEmbed()
                .setAuthor('ISS - International Space Station')
                .setColor('random')
                .setTitle('ISS informations')
                .addField('Position:', `${latitude}, ${longitude}, ${altitude}`)
                .addField('Velocity:', `${velocity} mi/h`)
                .addField('On google maps:', link)
                .setFooter('created by nyedu#1822')
            message.channel.send(embed);
		});
    }

});

Client.login(process.env.TOKEN);
