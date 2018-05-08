'use strict';

const TelegramBot = require('node-telegram-bot-api'),
      request = require('request'),
      fs = require('fs'),
      functions = require('./function'),
      objects = require('./objects'),
      token = '',
      bot = new TelegramBot(token,{polling:true});


bot.onText(/\/start/, function (msg) {
    bot.sendMessage(msg.from.id, 'Розклад - розклад пар \n' +
        'Розклад дзвінків - розклад дзвінків \n' +
        'Назва Вашої групи у форматі "Ф-11" - розклад пар для Вашої групи \n' +
        'Назва Вашої групи у форматі "Ф-11 `назва дня`" (Ф-11 понеділок) - розклад Вашої групи у вказаний день \n' +
        'Список викладачів - список викладачів\n' +
        'Назва кафедри у форматі "Кафедра інформатики" - список викладачів вказаної кафедри\n');
});
bot.onText(/\/help/, function (msg) {
    bot.sendMessage(msg.from.id, 'Розклад - розклад пар \n' +
        'Розклад дзвінків - розклад дзвінків \n' +
        'Назва Вашої групи у форматі "Ф-11" - розклад пар для Вашої групи \n' +
        'Назва Вашої групи у форматі "Ф-11 `назва дня`" (Ф-11 понеділок) - розклад Вашої групи у вказаний день \n' +
        'Список викладачів - список викладачів\n' +
        'Назва кафедри у форматі "Кафедра інформатики" - список викладачів вказаної кафедри\n');
});
bot.onText(/\/розклад/, function (msg) {
    bot.sendMessage(msg.chat.id, "Виберіть курс", {
        "reply_markup": {
            "keyboard": [["Перший курс", "Другий курс", "Третій курс", "Четвертий курс"],   ["Магістри 1ий курс", "Магістри 2ий курс"]]
        }
    });
});

bot.on('message', function (msg) {
    const id = msg.from.id,
          _messageText = msg.text,
          messageText = _messageText.toLowerCase().trim();

    if (messageText === 'hello') {
        bot.sendMessage(id, 'Hello, im a bot and its cool');
    } else if (messageText === 'розклад дзвінків') {
        var mess = '';
        for (var k in objects.lessonsCall) {
            mess = mess + k + " - ";
            mess = mess + objects.lessonsCall[k] + '; \n';
        }
        bot.sendMessage(id, mess);
    } else if (messageText === 'список викладачів') {
        bot.sendMessage(id, "Виберіть кафедру", {
            "reply_markup": {
                "keyboard": [["Кафедра фізики"], ["Кафедра математики"], ["Кафедра інформатики"]]
            }
        });
    } else if (messageText === 'кафедра фізики') {
        var mess = '';
        for (var i = 0; i <= objects.chairs.phisic.length - 1; i++) {
            mess = mess + objects.chairs.phisic[i] + '; \n';
        }
        bot.sendMessage(id, mess);
    } else if (messageText === 'кафедра математики') {
        var mess = '';
        for (var i = 0; i <= objects.chairs.math.length - 1; i++) {
            mess = mess + objects.chairs.math[i] + '; \n';
        }
        bot.sendMessage(id, mess);
    } else if (messageText === 'кафедра інформатики') {
        var mess = '';
        for (var i = 0; i <= objects.chairs.inf.length - 1; i++) {
            mess = mess + objects.chairs.inf[i] + '; \n';
        }
        bot.sendMessage(id, mess);
    } else if (messageText === 'розклад' || messageText === 'назад') {
        bot.sendMessage(id, "Виберіть курс", {
            "reply_markup": {
                "keyboard": [["Перший курс", "Другий курс", "Третій курс", "Четвертий курс"],   ["Магістри 1ий курс", "Магістри 2ий курс"]]
            }
        });
    } else if (messageText === 'перший курс') {
        var first = objects.shesule.first;
        bot.sendMessage(id, "Виберіть групу", {
            "reply_markup": {
                "keyboard": [["Назад", "Ф-11", "М-12", "І-13"]]
            }
        });
    } else if (messageText === 'ф-11') {
        var group = objects.shesule.first.f_11;
        var mess = functions.returnSheduleByGroup(group);
        bot.sendMessage(id, mess);
    }  else if (messageText === 'ф-11 понеділок') {
        var group = objects.shesule.first.f_11;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'ф-11 вівторок') {
        var group = objects.shesule.first.f_11;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'ф-11 середа') {
        var group = objects.shesule.first.f_11;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'ф-11 четвер') {
        var group = objects.shesule.first.f_11;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'ф-11 п\'ятниця') {
        var group = objects.shesule.first.f_11;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'м-12') {
        var group = objects.shesule.first.m_12;
        var mess = functions.returnSheduleByGroup(group);
        bot.sendMessage(id, mess);
    } else if (messageText === 'м-12 понеділок') {
        var group = objects.shesule.first.m_12;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'м-12 вівторок') {
        var group = objects.shesule.first.m_12;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'м-12 середа') {
        var group = objects.shesule.first.m_12;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'м-12 четвер') {
        var group = objects.shesule.first.m_12;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'м-12 п\'ятниця') {
        var group = objects.shesule.first.m_12;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'і-13') {
        var group = objects.shesule.first.i_13;
        var mess = functions.returnSheduleByGroup(group);
        bot.sendMessage(id, mess);
    }  else if (messageText === 'і-13 понеділок') {
        var group = objects.shesule.first.i_13;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'і-13 вівторок') {
        var group = objects.shesule.first.i_13;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'і-13 середа') {
        var group = objects.shesule.first.i_13;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'і-13 четвер') {
        var group = objects.shesule.first.i_13;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'і-13 п\'ятниця') {
        var group = objects.shesule.first.i_13;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'другий курс') {
        var second = objects.shesule.second;
        bot.sendMessage(id, "Виберіть групу", {
            "reply_markup": {
                "keyboard": [["Назад", "Ф-21", "М-22", "І-23"]]
            }
        });
    } else if (messageText === 'ф-21') {
        var group = objects.shesule.second.f_21;
        var mess = functions.returnSheduleByGroup(group);
        bot.sendMessage(id, mess);
    } else if (messageText === 'ф-21 понеділок') {
        var group = objects.shesule.second.f_21;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'ф-21 вівторок') {
        var group = objects.shesule.second.f_21;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'ф-21 середа') {
        var group = objects.shesule.second.f_21;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'ф-21 четвер') {
        var group = objects.shesule.second.f_21;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'ф-21 п\'ятниця') {
        var group = objects.shesule.second.f_21;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'м-22') {
        var group = objects.shesule.second.m_22;
        var mess = functions.returnSheduleByGroup(group);
        bot.sendMessage(id, mess);
    } else if (messageText === 'м-22 понеділок') {
        var group = objects.shesule.second.m_22;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'м-22 вівторок') {
        var group = objects.shesule.second.m_22;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'м-22 середа') {
        var group = objects.shesule.second.m_22;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'м-22 четвер') {
        var group = objects.shesule.second.m_22;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'м-22 п\'ятниця') {
        var group = objects.shesule.second.m_22;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'і-23') {
        var group = objects.shesule.second.i_23;
        var mess = functions.returnSheduleByGroup(group);
        bot.sendMessage(id, mess);
    } else if (messageText === 'і-23 понеділок') {
        var group = objects.shesule.second.i_23;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'і-23 вівторок') {
        var group = objects.shesule.second.i_23;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'і-23 середа') {
        var group = objects.shesule.second.i_23;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'і-23 четвер') {
        var group = objects.shesule.second.i_23;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'і-23 п\'ятниця') {
        var group = objects.shesule.second.i_23;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'третій курс') {
        var third = objects.shesule.third;
        bot.sendMessage(id, "Виберіть групу", {
            "reply_markup": {
                "keyboard": [["Назад", "Ф-31", "М-32", "М-33", "І-34"]]
            }
        });
    } else if (messageText === 'ф-31') {
        var group = objects.shesule.third.f_31;
        var mess = functions.returnSheduleByGroup(group);
        bot.sendMessage(id, mess);
    } else if (messageText === 'ф-31 понеділок') {
        var group = objects.shesule.third.f_31;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'ф-31 вівторок') {
        var group = objects.shesule.third.f_31;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'ф-31 середа') {
        var group = objects.shesule.third.f_31;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'ф-31 четвер') {
        var group = objects.shesule.third.f_31;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'ф-31 п\'ятниця') {
        var group = objects.shesule.third.f_31;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'м-32') {
        var group = objects.shesule.third.m_32;
        var mess = functions.returnSheduleByGroup(group);
        bot.sendMessage(id, mess);
    } else if (messageText === 'м-32 понеділок') {
        var group = objects.shesule.third.m_32;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'м-32 вівторок') {
        var group = objects.shesule.third.m_32;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'м-32 середа') {
        var group = objects.shesule.third.m_32;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'м-32 четвер') {
        var group = objects.shesule.third.m_32;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'м-32 п\'ятниця') {
        var group = objects.shesule.third.m_32;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'м-33') {
        var group = objects.shesule.third.m_33;
        var mess = functions.returnSheduleByGroup(group);
        bot.sendMessage(id, mess);
    } else if (messageText === 'м-33 понеділок') {
        var group = objects.shesule.third.m_33;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'м-33 вівторок') {
        var group = objects.shesule.third.m_33;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'м-33 середа') {
        var group = objects.shesule.third.m_33;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'м-33 четвер') {
        var group = objects.shesule.third.m_33;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'м-33 п\'ятниця') {
        var group = objects.shesule.third.m_33;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'і-34') {
        var group = objects.shesule.third.i_34;
        var mess = functions.returnSheduleByGroup(group);
        bot.sendMessage(id, mess);
    } else if (messageText === 'і-34 понеділок') {
        var group = objects.shesule.third.i_34;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'і-34 вівторок') {
        var group = objects.shesule.third.i_34;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'і-34 середа') {
        var group = objects.shesule.third.i_34;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'і-34 четвер') {
        var group = objects.shesule.third.i_34;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'і-34 п\'ятниця') {
        var group = objects.shesule.third.i_34;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'четвертий курс') {
        var fourth = objects.shesule.fourth;
        bot.sendMessage(id, "Виберіть групу", {
            "reply_markup": {
                "keyboard": [["Назад", "Ф-41", "М-42", "М-43", "І-44"]]
            }
        });
    } else if (messageText === 'ф-41') {
        var group = objects.shesule.fourth.f_41;
        var mess = functions.returnSheduleByGroup(group);
        bot.sendMessage(id, mess);
    } else if (messageText === 'ф-41 понеділок') {
        var group = objects.shesule.fourth.f_41;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'ф-41 вівторок') {
        var group = objects.shesule.fourth.f_41;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'ф-41 середа') {
        var group = objects.shesule.fourth.f_41;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'ф-41 четвер') {
        var group = objects.shesule.fourth.f_41;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'ф-41 п\'ятниця') {
        var group = objects.shesule.fourth.f_41;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'м-42') {
        var group = objects.shesule.fourth.m_42;
        var mess = functions.returnSheduleByGroup(group);
        bot.sendMessage(id, mess);
    } else if (messageText === 'м-42 понеділок') {
        var group = objects.shesule.fourth.m_42;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'м-42 вівторок') {
        var group = objects.shesule.fourth.m_42;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'м-42 середа') {
        var group = objects.shesule.fourth.m_42;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'м-42 четвер') {
        var group = objects.shesule.fourth.m_42;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'м-42 п\'ятниця') {
        var group = objects.shesule.fourth.m_42;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'м-43') {
        var group = objects.shesule.fourth.m_43;
        var mess = functions.returnSheduleByGroup(group);
        bot.sendMessage(id, mess);
    } else if (messageText === 'м-43 понеділок') {
        var group = objects.shesule.fourth.m_43;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'м-43 вівторок') {
        var group = objects.shesule.fourth.m_43;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'м-43 середа') {
        var group = objects.shesule.fourth.m_43;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'м-43 четвер') {
        var group = objects.shesule.fourth.m_43;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'м-43 п\'ятниця') {
        var group = objects.shesule.fourth.m_43;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'і-44') {
        var group = objects.shesule.fourth.i_44;
        var mess = functions.returnSheduleByGroup(group);
        bot.sendMessage(id, mess);
    } else if (messageText === 'і-44 понеділок') {
        var group = objects.shesule.fourth.i_44;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'і-44 вівторок') {
        var group = objects.shesule.fourth.i_44;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'і-44 середа') {
        var group = objects.shesule.fourth.i_44;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'і-44 четвер') {
        var group = objects.shesule.fourth.i_44;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'і-44 п\'ятниця') {
        var group = objects.shesule.fourth.i_44;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'магістри 1ий курс') {
        var fifth = objects.shesule.fifth;
        bot.sendMessage(id, "Виберіть групу", {
            "reply_markup": {
                "keyboard": [["Назад", "МФ-1", "ММ-1", "МІ-1"]]
            }
        });
    } else if (messageText === 'мф-1') {
        var group = objects.shesule.fifth.mf_1;
        var mess = functions.returnSheduleByGroup(group);
        bot.sendMessage(id, mess);
    } else if (messageText === 'мф-1 понеділок') {
        var group = objects.shesule.fifth.mf_1;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'мф-1 вівторок') {
        var group = objects.shesule.fifth.mf_1;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'мф-1 середа') {
        var group = objects.shesule.fifth.mf_1;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'мф-1 четвер') {
        var group = objects.shesule.fifth.mf_1;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'мф-1 п\'ятниця') {
        var group = objects.shesule.fifth.mf_1;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'мм-1') {
        var group = objects.shesule.fifth.mm_1;
        var mess = functions.returnSheduleByGroup(group);
        bot.sendMessage(id, mess);
    } else if (messageText === 'мм-1 понеділок') {
        var group = objects.shesule.fifth.mm_1;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'мм-1 вівторок') {
        var group = objects.shesule.fifth.mm_1;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'мм-1 середа') {
        var group = objects.shesule.fifth.mm_1;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'мм-1 четвер') {
        var group = objects.shesule.fifth.mm_1;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'мм-1 п\'ятниця') {
        var group = objects.shesule.fifth.mm_1;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'мі-1') {
        var group = objects.shesule.fifth.mi_1;
        var mess = functions.returnSheduleByGroup(group);
        bot.sendMessage(id, mess);
    } else if (messageText === 'мі-1 понеділок') {
        var group = objects.shesule.fifth.mi_1;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'мі-1 вівторок') {
        var group = objects.shesule.fifth.mi_1;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'мі-1 середа') {
        var group = objects.shesule.fifth.mi_1;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'мі-1 четвер') {
        var group = objects.shesule.fifth.mi_1;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'мі-1 п\'ятниця') {
        var group = objects.shesule.fifth.mi_1;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'магістри 2ий курс') {
        var sixth = objects.shesule.sixth;
        bot.sendMessage(id, "Виберіть групу", {
            "reply_markup": {
                "keyboard": [["Назад", "МФ-2", "ММ-2", "МІ-2"]]
            }
        });
    } else if (messageText === 'мф-2') {
        var group = objects.shesule.sixth.mf_2;
        var mess = functions.returnSheduleByGroup(group);
        bot.sendMessage(id, mess);
    } else if (messageText === 'мф-2 понеділок') {
        var group = objects.shesule.sixth.mf_2;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'мф-2 вівторок') {
        var group = objects.shesule.sixth.mf_2;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'мф-2 середа') {
        var group = objects.shesule.sixth.mf_2;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'мф-2 четвер') {
        var group = objects.shesule.sixth.mf_2;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'мф-2 п\'ятниця') {
        var group = objects.shesule.sixth.mf_2;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'мм-2') {
        var group = objects.shesule.sixth.mm_2;
        var mess = functions.returnSheduleByGroup(group);
        bot.sendMessage(id, mess);
    } else if (messageText === 'мм-2 понеділок') {
        var group = objects.shesule.sixth.mm_2;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'мм-2 вівторок') {
        var group = objects.shesule.sixth.mm_2;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'мм-2 середа') {
        var group = objects.shesule.sixth.mm_2;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'мм-2 четвер') {
        var group = objects.shesule.sixth.mm_2;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'мм-2 п\'ятниця') {
        var group = objects.shesule.sixth.mm_2;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'мі-2') {
        var group = objects.shesule.sixth.mi_2;
        var mess = functions.returnSheduleByGroup(group);
        bot.sendMessage(id, mess);
    } else if (messageText === 'мі-2 понеділок') {
        var group = objects.shesule.sixth.mi_2;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'мі-2 вівторок') {
        var group = objects.shesule.sixth.mi_2;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'мі-2 середа') {
        var group = objects.shesule.sixth.mi_2;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'мі-2 четвер') {
        var group = objects.shesule.sixth.mi_2;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    } else if (messageText === 'мі-2 п\'ятниця') {
        var group = objects.shesule.sixth.mi_2;
        var day = messageText.split(' ');
        var mess = functions.returnSheduleByGroupForDay(group, day[1]);
        bot.sendMessage(id, mess);
    }
});
