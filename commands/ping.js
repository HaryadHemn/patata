const discord = require("discord.js");
const ms = require("ms");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("ping")
    .setDescription("Shows the bot latency and the uptime of bot"),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    const pingEmbed = new discord.EmbedBuilder()
      .setColor("#0155b6")
      .setDescription(
        ` Websocket - **${
          client.ws.ping
        }ms**\nUptime - **${ms(client.uptime)}**`
      );

    await interaction.reply({
      embeds: [pingEmbed],
    });
  },
};
