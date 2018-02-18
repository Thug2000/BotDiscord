const Discord = require('discord.js');
const client = new Discord.Client();
const token = 'process.env.TOKEN';
const Google = require('./commands/google');

client.on('ready', function () {
  client.user.setActivity('maintenance').catch(console.error)
})

client.on('ready', function (){
 console.log('pret')
})

client.on('message', function(message) {
    if (message.content == "+clear") {
        if (message.member.hasPermission("MANAGE_MESSAGES")) {
            message.channel.fetchMessages()
               .then(function(list){
                    message.channel.bulkDelete(list);
                }, function(err){message.channel.send("ERROR: ERROR CLEARING CHANNEL.")})                        
        }
    }

});

client.on('message', async message => {
  if(message.author.bot) return;
  if(message.content.indexOf(config.prefix) !==0) return;

  const args = message.content.slice(config.prefix.lenght).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

if(message.content == "+help") {
    message.channel.send({embed: {
color:Math.floor(Math.random() * 16777214) + 1,
description: "Aide", 
fields: [{
name:"**__COMMANDES:__**",
value:"Voici les differentes commandes:"
},
{
name:"__+ping__",
value:"calculer le ping"
},
{
name:"__+alea__",
value:"calculer un nombre aleatoire entre 1 et 10"
},
{
name:"__+color__",
value:"Envoyer un message avec une couleur aleatoire"
},
{
name:"__+pass__",
value:"generer un mot de passe aleatoire"
}]
}});
}

  if(message.content == "+ping") {
    const m = await message.channel.send("Ping?");
    m.edit("Pong! Latency is " + Math.round(client.ping) + " ms");
} 

  if(message.content == "+alea") {
    const nbAlea = Math.floor(Math.random()*101);
      message.channel.send("Le nombre aleatoire est " + nbAlea).catch(error => message.reply("Je ne peux pas" + error ));
}

  if(message.content == "+color") {
    message.channel.send({embed: {color:Math.floor(Math.random() * 16777214) + 1, description: "A very simple Embed!"}});
}

  if(message.content == "+pass") {
    const sAlea = Math.random().toString(36).substr(2, 20);
    message.channel.send(sAlea).catch(console.error)
}

  if(message.content == "+pi") {
    const pi = Math.PI
    const a = await message.channel.send("pi:");
    a.edit(pi);

}

});

client.on('message', function(message) {
  if(Google.match(message)) {
    return Google.action(message)
}
});

// Log our bot in
client.login(token);
