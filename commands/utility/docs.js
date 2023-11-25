const {
  SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder,
} = require('discord.js');

const row = new ActionRowBuilder()
  .addComponents(
    new StringSelectMenuBuilder()
      .setCustomId('select')
      .setPlaceholder('Nenhuma linguagem selecionada')
      .addOptions(
        {
          label: 'javascript',
          description: 'Veja a documentação de Javascript',
          value: 'javascript',
        },
        {
          label: 'Typescript',
          description: 'Veja a documentação de Typescript',
          value: 'typescript',
        },
        {
          label: 'python',
          description: 'Veja a documentação de Python',
          value: 'python',
        },
        {
          label: 'C#',
          description: 'Veja a documentação de C#',
          value: 'csharp',
        },
        {
          label: 'React',
          description: 'Veja a documentação de React',
          value: 'react',
        },
        {
          label: 'Java',
          description: 'Veja a documentação de Java',
          value: 'java',
        },
        {
          label: 'Angular',
          description: 'Veja a documentação de Angular',
          value: 'angular',
        },
        {
          label: 'Django',
          description: 'Veja a documentação de Django - Framework Python',
          value: 'django',
        },
        {
          label: 'Spring-Boot',
          description: 'Veja a documentação de Spring-Boot - Framework Java',
          value: 'spring-boot',
        },
        {
          label: 'Dotnet-Core',
          description: 'Veja a documentação de Dotnet-Core - Framework Java',
          value: 'dotnet-core',
        },
      ),
  );

module.exports = {
  data: new SlashCommandBuilder()
    .setName('docs')
    .setDescription('Acesse a documentação da tecnologia que quiser'),

  async execute(interaction) {
    await interaction.reply({ content: 'Selecione uma das techs abaixo:', components: [row] });
  },
};
