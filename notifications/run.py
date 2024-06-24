from supabase import create_client, Client
import os
import discord
from discord.ext import commands, tasks
import datetime
from dotenv import load_dotenv
from EDITME import mode
import sentry_sdk

mode = mode()

if mode == "test":
    load_dotenv(
        os.path.abspath(os.path.join(os.getcwd(), ".env.development"))
    )
else:
    if ((os.environ.get("PY_DSN") is None)):
        load_dotenv(
            os.path.abspath(os.path.join(os.getcwd(), ".env.production"))
        )

sentry_sdk.init(
    dsn=os.environ.get("PY_DSN") or "",
    # Set traces_sample_rate to 1.0 to capture 100%
    # of transactions for performance monitoring.
    traces_sample_rate=1.0,
    # Set profiles_sample_rate to 1.0 to profile 100%
    # of sampled transactions.
    # We recommend adjusting this value in production.
    profiles_sample_rate=1.0,
)

supabase: Client = create_client(os.environ.get(
    "NEXT_PUBLIC_SUPABASE_URL") or "", os.environ.get("SUPABASE_SERVICE_KEY") or "")

intents = discord.Intents.default()
bot = commands.Bot(command_prefix="", intents=intents)


class TodoModal(discord.ui.Modal):
    def __init__(self, content, due_date):
        super().__init__(title=content)
        self.add_item(discord.ui.TextInput(
                      label=due_date, style=discord.TextStyle.short))


class DashboardButton(discord.ui.View):
    def __init__(self):
        super().__init__()
        self.add_item(discord.ui.Button(label="Go to Dashboard",
                      url=f"{os.environ.get("URL")}/dashboard", style=discord.ButtonStyle.success))


async def query_and_send_messages():
    now = datetime.datetime.now(datetime.UTC).isoformat()
    # Query the database for todos
    response = supabase.table("todos").select(
        "*").eq("sent", False).eq("completed", False).lte("due_date", now).execute()
    print(response)
    todos = response.data

    for todo in todos:
        user_id = todo["discord_id"]
        content = todo["content"]
        due_date = todo["due_date"]
        todo_id = todo["id"]

        user = await bot.fetch_user(user_id)
        if user:
            embed = discord.Embed(title=f"Hello, {'{Todo}'}^2 here to remind you to: {content}", description="If you want to check this todo off, please visit the website with the link below.", color=discord.Color.green())  # noqa
            await user.send(embed=embed, view=DashboardButton())
            # Update the todo as sent
            supabase.table("todos").update(
                {"sent": True}).eq("id", todo_id).execute()


@tasks.loop(seconds=5)
async def check_todos():
    await query_and_send_messages()


@bot.event
async def on_ready():
    check_todos.start()
    print('Bot is ready and task is running.')

bot.run(os.environ.get("DISCORD_BOT_TOKEN") or "")
