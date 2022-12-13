const schema = require("../schemas/currencySchema");
const discord = require("discord.js");
const ms = require("ms");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("slots")
    .setDescription("Yary Slot Mania, Yary Baxt")
    .addIntegerOption((option) =>
      option
        .setName("bet_amount")
        .setDescription("bri aw paraya dyary bka ka daydaneyt")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("choice")
        .setDescription("Hallbzhera")
        .addChoices(
          {
            name: "Play 1",
            value: "rock",
          },
          {
            name: "Play 2",
            value: "paper",
          },
          {
            name: "Play 3",
            value: "scissors",
          }
        )
        .setRequired(true)
    ),
  /** https://i.postimg.cc/L6KNfvff/image-2022-12-13-004411788.png
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    let choiceArray = ["rock", "paper", "scissors"];
    let betAmount = interaction.options.getInteger("bet_amount");
    let choice = interaction.options.getString("choice");
    let botChoice = choiceArray[Math.floor(Math.random() * choiceArray.length)];

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

    if (timeout - (Date.now() - data.rpsTimeout) > 0) {
      let timeLeft = ms(timeout - (Date.now() - data.rpsTimeout));

      await interaction.reply({
        content: `Tkaya Chawarwan ba, Dwai **${timeLeft}** Hawllbdawa.`,
      });
    } else if (betAmount > data.wallet) {
      await interaction.reply({
        content: "To paray Pewestt nya...",
        ephemeral: true,
      });
    } else if (betAmount > 10000) {
      await interaction.reply({
        content: "To La 10k Zyatr natwanit...",
        ephemeral: true,
      });
    } else if (choice === botChoice) {
      data.rpsTimeout = Date.now();
      await data.save();

      const tieEmbed = new discord.EmbedBuilder()
        .setColor("#0155b6")
        .setTitle(`${interaction.user.username}\'s Slot Machine`)
        .addFields(
		        { name: 'Slots Machine', value: ':egg: :egg: :egg:' },
        )
        .setImage('https://i.postimg.cc/L6KNfvff/image-2022-12-13-004411788.png')
        .setDescription(
         `To Hamw Parakat Wargrtawa w Hicht Nabrdawa`
        );

      await interaction.reply({
        embeds: [tieEmbed],
      });
    } else if (choice === "rock" && botChoice === "scissors") {
      let winAmount1 = betAmount * 2;

      data.rpsTimeout = Date.now();
      data.wallet -= betAmount * 1;
      data.wallet += winAmount1 * 1;
      await data.save();

      const winEmbed1 = new discord.EmbedBuilder()
        .setColor("#0155b6")
        .setTitle(`${interaction.user.username}\'s Slot Machine`)
        .addFields(
		        { name: 'Slots Machine', value: ':moneybag: :moneybag: :moneybag:' },
        )
        .setImage('https://i.postimg.cc/L6KNfvff/image-2022-12-13-004411788.png')
        .setDescription(
          `To Dw Awanday Parakat brdawa`
        );

      await interaction.reply({
        embeds: [winEmbed1],
      });
    } else if (choice === "scissors" && botChoice === "scissors") {
      let winAmount2 = betAmount * 2;

      data.rpsTimeout = Date.now();
      data.wallet -= betAmount * 1;
      data.wallet += winAmount2 * 1;
      await data.save();

      const winEmbed2 = new discord.EmbedBuilder()
        .setColor("#0155b6")
        .setTitle(`${interaction.user.username}\'s Slot Machine`
        .addFields(
		        { name: 'Slots Machine', value: ':egg: :egg: :egg:' },
        )
        .setImage('https://i.postimg.cc/L6KNfvff/image-2022-12-13-004411788.png')
        .setDescription(
         `To Hamw Parakat Wargrtawa w Hicht Nabrdawa`
        )
      );

      await interaction.reply({
        embeds: [winEmbed2],
      });
    } else if (choice === "paper" && botChoice === "rock") {
      let winAmount3 = betAmount * 2;

      data.rpsTimeout = Date.now();
      data.wallet -= betAmount * 1;
      data.wallet += winAmount3 * 1;
      await data.save();

      const winEmbed3 = new discord.EmbedBuilder()
        .setColor("#0155b6")
        .setTitle(`${interaction.user.username}\'s Slot Machine`)
        .addFields(
		        { name: 'Slots Machine', value: ':moneybag: :moneybag: :moneybag:' },
        )
        .setImage('https://i.postimg.cc/L6KNfvff/image-2022-12-13-004411788.png')
        .setDescription(
          `To Dw Awanday Parakat brdawa`
        );

      await interaction.reply({
        embeds: [winEmbed3],
      });
    } else {
      data.rpsTimeout = Date.now();
      data.wallet -= betAmount * 1;
      await data.save();

      const loseEmbed = new discord.EmbedBuilder()
        .setColor("#0155b6")
        .setTitle(
          `${interaction.user.username}\'s Slot Machine`
        )
        .addFields(
		        { name: 'Slots Machine', value: ':moneybag: :moneybag: :egg:' },
        )
        .setImage('https://i.postimg.cc/L6KNfvff/image-2022-12-13-004411788.png')
        .setDescription(
          `To Hamw Parakat Dorand`
        );

      await interaction.reply({
        embeds: [loseEmbed],
      });
    }
  },
};
