const schema = require("../schemas/currencySchema");
const discord = require("discord.js");
const ms = require("ms");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("work")
    .setDescription("Kar bka w Para Warbgra")
    .addStringOption((option) =>
      option
        .setName("job")
        .setDescription("Karek Hallbzhera")
        .addChoices(
          {
            name: "Kary Software",
            value: "Software Developer",
          },
          {
            name: "Mamostay Zanst",
            value: "Data Scientist",
          },
          {
            name: "Doctor",
            value: "doctor",
          },
          {
            name: "Krekari",
            value: "Waiter",
          },
          {
            name: "Wenakesh",
            value: "Painter",
          }
        )
        .setRequired(true)
    ),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    let job = interaction.options.getString("job");
    let amount = Math.floor(Math.random() * 3000) + 1000;

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

    let timeout = 3600000;

    if (timeout - (Date.now() - data.workTimeout) > 0) {
      let timeLeft = ms(timeout - (Date.now() - data.workTimeout));

      await interaction.reply({
        content: `Tkaya Chawarwan ba, Dwai **${timeLeft}** Hawllbdawa.`,
      });
    } else {
      data.workTimeout = Date.now();
      data.wallet += amount * 1;
      await data.save();

      const workEmbed = new discord.EmbedBuilder()
        .setColor("#FF9900")
        .setDescription(
          `To Kart krd wak **${job}** w bri **:dollar: ${amount.toLocaleString()}** war grt`
        );

      await interaction.reply({
        embeds: [workEmbed],
      });
    }
  },
};
