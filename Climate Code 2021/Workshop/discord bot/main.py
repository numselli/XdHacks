import json, os, asyncio, random, discord
from discord.ext import commands
config = json.load(open('config.json', 'r'))
bot = commands.Bot(command_prefix="+", case_insensitive=True)


@bot.event
async def on_ready():
    print("loged in")

# @bot.event
# async def on_message(message):
#     if message.author.bot:
#         return
    # if message.content.lower().strip(".?/!") in ["hello", "hi", "good mornting", "hey"]:
        # await message.channel.send("hi")

    # def check(mesage):
        # mesage.content.lower().strip(".?/!") in ["good", "bad"]
        # return

    # try:
        # await bot.wait_for("message", check=check, timeout=20.0)
    # except asyncio.TimeoutError:
        # await message.channel.send("oh ok then")
    # else:
        # await message.channel.send(f"oh, {message.content.lower().strip('.?/!')} thats good")

@bot.command
async def info(ctx):
    embed = discord.Embed(
        title="Title", 
        description="Desc", 
        color=discord.Color.green()
    )
    embed.add_field(name="Field1", value="hi", inline=False)
    embed.add_field(name="Field2", value="hi2", inline=False)
    await ctx.send(embed=embed)

bot.run(config["token"])
