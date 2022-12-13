const schema = require("../schemas/currencySchema");
const discord = require("discord.js");
const ms = require("ms");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("hunt")
    .setDescription("Azhall Rawbka w Para Wargra"),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    let amount = Math.floor(Math.random() * 1000) + 500;
    let animals = [
      ":tiger2:",
      ":lion_face:",
      ":rabbit2:",
      ":skunk:",
      ":deer:",
      ":elephant:",
      ":hippopotamus:",
      ":polar_bear:",
      ":rhino:",
    ];
    let animal = animals[Math.floor(Math.random() * animals.length)];

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

    if (timeout - (Date.now() - data.huntTimeout) > 0) {
      let timeLeft = ms(timeout - (Date.now() - data.huntTimeout));

      await interaction.reply({
        content: `Tkaya Chawarwan ba, Dwai **${timeLeft}** Hawllbdawa.`,
      });
    } else {
      data.huntTimeout = Date.now();
      data.wallet += amount * 1;
      await data.save();

      const huntEmbed = new discord.EmbedBuilder()
        .setColor("#FF0000")
        .setDescription(
          `To **${animal}** Raw krd w bri **:dollar: ${amount.toLocaleString()}** Wargrt`
        );

      await interaction.reply({
        embeds: [huntEmbed],
      });
    }
  },
};
