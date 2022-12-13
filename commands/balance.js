const schema = require("../schemas/currencySchema");
const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("profile")
    .setDescription("Shows the profile of a user")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("Select a user to view their balance")
    ),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    let user = interaction.options.getUser("user");

    if (!user) {
      user = interaction.user;
    }

    let data;
    try {
      data = await schema.findOne({
        userId: user.id,
      });

      if (!data) {
        data = await schema.create({
          userId: user.id,
          guildId: interaction.guild.id,
        });
      }
    } catch (err) {
      await interaction.reply({
        content: "There was an error while executing this command...",
        ephemeral: true,
      });
    }

    const balanceEmbed = new discord.EmbedBuilder()
      .setColor("#AAFF00")
      .setThumbnail(user.displayAvatarURL())
      .setTitle(`${user.username}\'s Profile`)
      .setImage('https://i.postimg.cc/X7tpgZKS/20221210-224806-1.jpg')
      .addFields(
        {
          "name": `:dollar: Cash`,
          "value": `**${data.wallet.toLocaleString()}**`
        },
        {
          "name": `:classical_building: Bank`,
          "value": `**${data.bank.toLocaleString()}**`
        },)
      .setTimestamp();

    await interaction.reply({
      embeds: [balanceEmbed],
    });
  },
};
