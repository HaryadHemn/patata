const schema = require("../schemas/currencySchema");
const discord = require("discord.js");
const ms = require("ms");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("daily")
    .setDescription("Wargrtni Paray Rozhana"),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    let amount = Math.floor(Math.random() * 10000) + 1000;

    let data;
    try {
      data = await schema.findOne({
        userId: interaction.user.id,
      });

      if (!data) {
        data = await schema.create({
          userId: interaction.user.id,
          guildId: interaction.guild.id,
        });
      }
    } catch (err) {
      console.log(err);
      await interaction.reply({
        content: "There was an error while executing this command...",
        ephemeral: true,
      });
    }

    let timeout = 86400000;

    if (timeout - (Date.now() - data.dailyTimeout) > 0) {
      let timeLeft = ms(timeout - (Date.now() - data.dailyTimeout));

      await interaction.reply({
        content: `Tkaya Chawarwan ba, Dway **${timeLeft}** Hawll bdawa.`,
      });
    } else {
      data.dailyTimeout = Date.now();
      data.wallet += amount * 1;
      await data.save();

      const dailyEmbed = new discord.EmbedBuilder()
        .setColor("#0155b6")
        .setDescription(
          `To Paray Rozhanat Wargrt bri **:dollar: ${amount.toLocaleString()}**`
        );

      await interaction.reply({
        embeds: [dailyEmbed],
      });
    }
  },
};
