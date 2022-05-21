/// Импорт пакета
const telegramApi = require('node-telegram-bot-api')

/// Токен
const token = '5223896231:AAFWujkhXSN2ic7UMHjo-wOTC9hjzia49mg'

/// Создание бота
const bot = new telegramApi(token, {polling: true})

const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Начальное приветствие'},
        {command: '/info', description: 'Информация'}
    ]);
    
    bot.on('message', async message => {
        const text = message.text
        const chatId = message.chat.id 
    
        if (text === '/start') {
            await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/b0d/85f/b0d85fbf-de1b-4aaf-836c-1cddaa16e002/6.webp')
            return bot.sendMessage(chatId, `Добро пожаловать`)    
        }
    
        if (text === '/info') {
            return bot.sendMessage(chatId, `Тебя зовут ${message.from.first_name}`)
        }

        // Месседж, если ни одна из функций не отработала
        return bot.sendMessage(chatId, `Я тебя не понимаю, попробуй еще раз`)
    })
}

start()