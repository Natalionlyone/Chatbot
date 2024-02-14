const TelegramBot = require('node-telegram-bot-api');

const token = '6929182904:AAHVKO3I-NZWLO6N678sEX7xrivz1QGS51c';
const bot = new TelegramBot(token, { polling: true });

// Массив кнопок в футере
const footerButtons = [
    [{ text: '🌟 Вступить в клуб', url: 'https://urly.fi/3qjE' }],
    [{ text: '💰 Оплатить членство за текущий год', url: 'https://urly.fi/3oCh' }],
    [{ text: '❓ Поддержка', url: 'https://urly.fi/3qjE' }]
];

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const mainMessage = 'Привет, выберите опцию:';

    // Отправляем основное сообщение с кнопками в футере
    bot.sendMessage(chatId, mainMessage, {
        parse_mode: 'Markdown',
        reply_markup: {
            inline_keyboard: footerButtons
        }
    });
});

bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;
    const buttonText = query.data;

    // Отправляем ответ с ссылкой из текста кнопки
    bot.sendMessage(chatId, `Вы выбрали: ${buttonText}`, {
        parse_mode: 'Markdown',
        reply_markup: {
            inline_keyboard: [[{ text: 'Перейти', url: 'https://example.com/' + buttonText.toLowerCase() }]]
        }
    });
});