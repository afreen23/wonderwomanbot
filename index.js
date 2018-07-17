var Discord =require('discord.js');
var config = require("./config.json");

const client = new Discord.Client();

client.on("ready",()=>{
	console.log("I am ready");
})

const prefix =config.prefix; // prefix: !
client.on("message", (message) => {
 if(message.author.bot) return
 if (message.content.indexOf(prefix) !== 0) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
 
 //!give arg1 arg2 arg3
 if(command === 'give') {
	let member = message.member;
	args.map((role) => {
		if(role === 'diy' || role === 'mentor'|| role === 'mentor-py'||role === 'mentor-js'||role === '@volunteer') {
			let roleid = message.guild.roles.find("name", `@${role}`);
			member.addRole(roleid)
				.then(message.reply("added "+role+" !!!"))
				.catch(console.error)
		}
		else 
		  message.reply("Wait for the confirmation from admins!")
		  // dm to mods
		  // await for reply y/n
	});
   }

//!help
 if(command === 'help') {
 	// embed help for the channel
 }

});

client.login(config.token);


// message.channel.send('What tag would you like to see? This will await will be cancelled in 30 seconds. It will finish when you provide a message that goes through the filter the first time.')
// .then(() => {
//   message.channel.awaitMessages(response => response.content === 'test', {
//     max: 1,
//     time: 30000,
//     errors: ['time'],
//   })
//   .then((collected) => {
//       message.channel.send(`The collected message was: ${collected.first().content}`);
//     })
//     .catch(() => {
//       message.channel.send('There was no collected message that passed the filter within the time limit!');
//     });
// });