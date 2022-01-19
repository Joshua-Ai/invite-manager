const Discord = require("discord.js")
const mongoose = require("mongoose")
const mongoDB = process.env['mongoDB']
const botToken = process.env['botToken']
const client = new Discord.Client({
    disableEveryone: true,
    autoReconnect: true,
    fetchAllMembers: true,
    disabledEvents: ["TYPING_START"],
    partials: ['MESSAGE', 'CHANNEL', 'GUILD_MEMBER', 'REACTION']
})

//const PrivateConfig = require('./PrivateConfig.json')

const fs = require('fs')
client.commands = new Discord.Collection()
client.data = require("./database/mongoDB.js")

const guildInvites = new Map()
client.guildInvites = guildInvites

fs.readdir("./commands/", (err, content) => {
    if (err) console.log(err)
    if (content.length < 1) return console.log('Veuillez créer des dossiers dans le dossier commands !')
    var groups = []
    content.forEach(element => {
        if (!element.includes('.')) groups.push(element)
    })
    groups.forEach(folder => {
        fs.readdir("./commands/" + folder, (e, files) => {
            let js_files = files.filter(f => f.split(".").pop() === "js")
            if (js_files.length < 1) return console.log('Veuillez créer des fichiers dans le dossier "' + folder + '" !')
            if (e) console.log(e)
            js_files.forEach(element => {
                let props = require('./commands/' + folder + '/' + element)
                client.commands.set(element.split('.')[0], props)
            })
        })
    })
})

fs.readdir("./events/", (err, f) => {
    if (err) console.log(err)

    f.forEach((f) => {
        const events = require(`./events/${f}`)
        const event = f.split(".")[0]

        client.on(event, events.bind(null, client))
    })
    console.log(`[+] ${f.length} events chargés`)
})

mongoose.connect(mongoDB, {
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then(() => {
	console.log("[+] Connexion établie avec la base de données MongoDB")
	client.login(botToken)
}).catch((err) => {
	console.log("[+] Impossible de se connecter à la base de données MongoDB. Erreur: "+err)
})


client.on("disconnect", () => console.log("[+] Le bot se déconnecte ..."))
	.on("reconnecting", () => console.log("[+] Reconnexion du bot ..."))
	.on("error", (e) => console.log("ERROR: ", e))
	.on("warn", (i) => console.log("WARN: ", i))

process.on("unhandledRejection", (err) => {
	console.error(err)
})
