const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("help")
    .setDescription("Pshandani Hamw Commandakan")
    .addStringOption((option) =>
      option
        .setName("category")
        .setDescription("Enter the commands category")
        .addChoices(
          {
            name: "Commandakan",
            value: "economy",
          },
        )
        .setRequired(true)
    ),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    const category = interaction.options.getString("category");

    if (category === "economy") {
      const embed = new discord.EmbedBuilder()
        .setColor("#fb0202")
        .setThumbnail(client.user.displayAvatarURL({ size: 512 }))
        .setTitle("KOSMP Games Commands")
        .setDescription(
          "Commandakani boti KOSMP\nTaybat ba King Of Samp:\nhttps://discord.gg/yyEjXZbzjC"
        )
        .setImage('https://i.postimg.cc/wjg9fZrg/sadasdsadasdad.png')
        .addFields(
        {
          "name": `/profile`,
          "value": `Bo Saerkrdny Profile Xot yan Kaseki Tr`
        },
        {
          "name": `/slots`,
          "value": `Bo Krdny Yary Slots ( Yary baxt )`
        },
        {
          "name": `/beg (la brawa)`,
          "value": `Bo Dziny Para`
        },
        {
          "name": `/deposit`,
          "value": `Bo Danany Para La Bank`
        },
        {
          "name": `/withdraw`,
          "value": `Bo Darhenany Para La Bank`
        },
        {
          "name": `/fish`,
          "value": `Bo Rawkrdni Masi`
        },
        {
          "name": `/hunt`,
          "value": `Bo Rawkrdni Azhall`
        },
        {
          "name": `/chopwood (la brawa)`,
          "value": `Bo Dar Brinawa`
        },
        {
          "name": `/dig (la brawa)`,
          "value": `Bo Mine Krdn`
        },
        {
          "name": `/daily`,
          "value": `Wargrtni Paray Rozhana`
        },
        {
          "name": `/ping`,
          "value": `Pingi Botaka`
        },
        {
          "name": `/work`,
          "value": `Bo Karkrdn`
        })
        .setFooter({
          text: "Tanha ba (/) Kar Dakat",
        });

      await interaction.reply({
        embeds: [embed],
      });
    }
  },
};
