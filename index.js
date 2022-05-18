/// Импорт пакета
const telegramApi = require('node-telegram-bot-api')

/// Токен
const token = '5223896231:AAFWujkhXSN2ic7UMHjo-wOTC9hjzia49mg'

/// Создание бота
const bot = new telegramApi(token, {polling: true})

bot.on('message', message => {
    const text = message.text
    const chatId = message.chat.id 

    if (text === '/start') {
        bot.sendMessage(chatId, `Добро пожаловать`)    
    }

    if (text === '/info') {
        bot.sendMessage(chatId, `Тебя зовут ${message.from.first_name}`)
    }
})