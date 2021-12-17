const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {

    let leaderboardData = await client.data.getLeaderboard(message.member.guild.id)
    if (!leaderboardData || (leaderboardData === undefined)) return message.channel.send(`:x: **|** Impossible de charger le leaderboard sur ${message.member.guild.name}. Veuillez reessayer plus tard ...`)

    let usernameArray = []
    for (const user of leaderboardData) {
        usernameArray.push(await message.member.guild.member(user._id).user.tag)
    }

    var counter = 0
    let leaderboardArray = []
    for (const username of usernameArray) {
        leaderboardArray.push(`\n**${counter + 1} |** ${username} - :white_check_mark: ${leaderboardData[counter].invites} :infinity: ${leaderboardData[counter].invites_join} :sparkles: ${leaderboardData[counter].invites_bonus} :poop: ${leaderboardData[counter].invites_invalid} :x: ${leaderboardData[counter].invites_left}`)
        counter++
    }

    message.channel.send(new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle('Leaderboard of ' + message.guild.name)
        .setDescription(`Invites leaderboard of ${message.member.guild.name}
        
:white_check_mark: Real invites
:infinity: Total invites
:sparkles: Bonus invites
:poop: Fakes
:x: Leaves
${leaderboardArray}`)
        .setTimestamp()
        .setFooter(`Demanded by ${message.member.user.tag}`)
    )
}
