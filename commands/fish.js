const schema = require("../schemas/currencySchema");
const discord = require("discord.js");
const ms = require("ms");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("fish")
    .setDescription("Masi Raw bkaw Para Wargra"),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    let fishAmount = Math.floor(Math.random() * 15) + 1;
    let amount = fishAmount * 150 * 1;

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

    let timeout = 30000;

    if (timeout - (Date.now() - data.fishTimeout) > 0) {
      let timeLeft = ms(timeout - (Date.now() - data.fishTimeout));

      await interaction.reply({
        content: `Tkaya Chawarwan ba, Dway **${timeLeft}** Hawllbdawa.`,
      });
    } else {
      data.fishTimeout = Date.now();
      data.wallet += amount * 1;
      await data.save();

      const fishEmbed = new discord.EmbedBuilder()
        .setColor("#00FDFF")
        .setDescription(
          `to bri **${fishAmount}** :tropical_fish: Grt w bri **:dollar: ${amount.toLocaleString()}** Wargrt`
        );

      await interaction.reply({
        embeds: [fishEmbed],
      });
    }
  },
};
