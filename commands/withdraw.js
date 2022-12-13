const schema = require("../schemas/currencySchema");
const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("withdraw")
    .setDescription("bo Darhenany Para la bank")
    .addIntegerOption((option) =>
      option
        .setName("withdraw_amount")
        .setDescription("Tkaya braka dyary bka")
        .setRequired(true)
    ),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    let withdrawAmount = interaction.options.getInteger("withdraw_amount");

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

    if (withdrawAmount > data.bank) {
      await interaction.reply({
        content: "To am brat pe nya la bank.",
      });
    } else if (withdrawAmount <= 0) {
      await interaction.reply({
        content: "Tkaya sarw 0 bnusa.",
      });
    } else {
      data.bank -= withdrawAmount * 1;
      data.wallet += withdrawAmount * 1;
      await data.save();

      const withdrawEmbed = new discord.EmbedBuilder()
        .setColor("#0155b6")
        .setDescription(
          `ba sarkawtwy bri **${withdrawAmount.toLocaleString()}** La bank Dar krd :dollar:`
        );

      await interaction.reply({
        embeds: [withdrawEmbed],
      });
    }
  },
};
