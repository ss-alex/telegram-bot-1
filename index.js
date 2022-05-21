/// Импорт пакета
const telegramApi = require('node-telegram-bot-api')

/// Токен
const token = '5223896231:AAFWujkhXSN2ic7UMHjo-wOTC9hjzia49mg'

/// Создание бота
const bot = new telegramApi(token, {polling: true})

/// Локальная база данных
const chats = {}

/// Игровые кнопки
const gameOptions = {
    reply_markup: JSON.stringify(
        {
            inline_keyboard: [
                [
                    {text: '1', callback_data: '1'}, 
                    {text: '2', callback_data: '2'},
                    {text: '3', callback_data: '3'},
                ],

                [
                    {text: '4', callback_data: '4'}, 
                    {text: '5', callback_data: '5'}, 
                    {text: '6', callback_data: '6'}
                ],

                [
                    {text: '7', callback_data: '7'},
                    {text: '8', callback_data: '8'},
                    {text: '9', callback_data: '9'}
                ],

                [
                    {text: '0', callback_data: '0'}
                ]
            ]
        }
    )
}

/// Кнопка: Играть ещё раз
const againOption = {
    reply_markup: JSON.stringify(
        {
            inline_keyboard: [
                [
                    {text: 'Играть ещё раз', callback_data: '/again'}
                ]
            ]
        }
    )
}

const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Начальное приветствие'},
        {command: '/info', description: 'Получить информацию о пользователе'},
        {command: '/game', description: 'Игра угадай цифру'}
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

        if (text === '/game') {
            await bot.sendMessage(chatId, `Сейчас я загадаю цифру от 0 до 9, а ты должен её отгадать`)
            const randomNumber = Math.floor((Math.random() * 10))
            chats[chatId] = randomNumber
            return bot.sendMessage(chatId, 'Отгадывай', gameOptions)
        }

        /// Месседж, если ни одна из функций не отработала
        return bot.sendMessage(chatId, `Я тебя не понимаю, попробуй еще раз`)
    })

    bot.on('callback_query', async message => {
        const data = message.data
        const chatId = message.message.chat.id

        if (data == chats[chatId]) {
            return await bot.sendMessage(chatId, `Поздравляю ты отгадал ${chats[chatId]}`, againOption)
        } else {
            return await bot.sendMessage(chatId, `К сожалению ты не угадал цифру, бот загадал цифру ${chats[chatId]}`, againOption)
        }
    })
}

start()