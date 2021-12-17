const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {

    if (!args[0]) {
        let userData = await client.data.getUserDB(message.member.id, message.member.guild.id)

        return message.channel.send(new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle("Invites of " + message.member.user.tag)
            .setTimestamp()
            .setThumbnail(message.member.user.displayAvatarURL())
            .setFooter(`Demanded by ${message.member.user.tag}`)
            .setDescription(`:infinity: **${!userData ? 0 : userData.invites_join}** invites
:x: **${!userData? 0 : userData.invites_left}** leaves
:poop: **${!userData ? 0 : userData.invites_invalid}** fakes
:sparkles: **${!userData ? 0 : userData.invites_bonus}** bonus

:white_check_mark: You currently have **${!userData ? 0 : userData.invites}** invitations ! :clap:`)
        )
    }

    let userTargeted = message.mentions.users.first()
    let userData = await client.data.getUserDB(userTargeted.id, message.member.guild.id)

    return message.channel.send(new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle("Invites of " + userTargeted.tag)
        .setTimestamp()
        .setThumbnail(userTargeted.displayAvatarURL())
        .setFooter(`Demanded by ${message.member.user.tag}`)
        .setDescription(`:infinity: **${!userData ? 0 : userData.invites_join}** invites
:x: **${!userData ? 0 : userData.invites_left}** leaves
:poop: **${!userData ? 0 :userData.invites_invalid}** fakes
:sparkles: **${!userData ? 0 : userData.invites_bonus}** bonus

:white_check_mark: You currently have **${!userData ? 0 : userData.invites}** invitations ! :clap:`)
    )

}
