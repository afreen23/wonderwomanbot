var Discord =require('discord.js');
var config = require("./config.json");

const client = new Discord.Client();

client.on("ready",()=>{
	console.log("I am ready");
})

const prefix =config.prefix; // prefix: !
client.on("message", (message) => {
 if(message.author.bot) return;
 if (message.content.indexOf(prefix) !== 0) return;
  const args = message.content.toLowerCase().slice(prefix.length).trim().split(/ +/g);
  const command = args.shift();
 
 //!give arg1 arg2 arg3
 if(command === 'give') {
	
	let member = message.member;
	args.map((role) => {

		if(role !== 'vip' && role !== 'gold') {
			let roleid = message.guild.roles.find("name", `@${role}`);
			// role does not exist
			if(!roleid) {
				message.reply("No such role exists!")
			}
			// already having the role
			else if(message.member.roles.find("name", `@${role}`)) {
				message.reply(`You already have ${role} !`)
			}
			// add role
			else {
				member.addRole(roleid)
				.then(message.reply("added "+role+" !!!"))
				.catch(console.error)
			}
		}
		else {
			message.reply("Wait for the confirmation from admins!")
			    // find mods
			    var mods = message.guild.roles.find("name","new role").members;
			    // rich embed:TODO
			    let data = {
			    	mes: "W"
			    }
			    let mod_message = new RichEmbed(data);
			    // dm to mods
			    mods.map((g)=> g.send(/*rich embed*/))
			    // `${member} wants the role ${role}`					
		}
 	});
}

//!help :TODO
 if(command === 'help') {
	 // embed help for the channel
	const embed = {
		"title": "HELP DESK",
		"description": "Please peruse the links below.",
		"url": "https://discordapp.com",
		"color": 11270735,
		"timestamp": "2018-07-28T01:22:50.281Z",
		"fields": [
		  {
			"name": "Login to member portal for course videos and homework uploads:",
			"value": "[Member Portal](https://1millionwomentotech.com/summerofcode1/)"
		  },
		  {
			"name": "Find course syllabus, hackathon info, and coding exercises here:",
			"value": "[Toolkitten Repo](https://github.com/1millionwomentotech/toolkitten/tree/master/summer-of-code)"
		  }
		]
	};
	channel.send("Someone called for help?", { embed }); 

 }

 
 

});

client.login(config.token);