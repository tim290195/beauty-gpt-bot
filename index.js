
const { Telegraf } = require("telegraf");
const OpenAI = require("openai");

require("dotenv").config();

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

bot.start((ctx) => ctx.reply("Привет, я бот Beauty GPT! Напиши, что тебе нужно."));

bot.on("text", async (ctx) => {
  const prompt = ctx.message.text;

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        { role: "system", content: "Ты помощник для владельца студии лазерной эпиляции." },
        { role: "user", content: prompt },
      ],
    });

    const reply = response.data.choices[0].message.content;
    ctx.reply(reply);
  } catch (err) {
    console.error(err);
    ctx.reply("Ошибка при обращении к OpenAI.");
  }
});

bot.launch();
