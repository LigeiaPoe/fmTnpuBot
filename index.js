'use strict';

const TelegramBot = require('node-telegram-bot-api'),
      request = require('request'),
      fs = require('fs'),
	  mysql = require('mysql'),
      functions = require('./function'),
      objects = require('./objects'),
	  moodleClient = require("moodle-client"),
      token = '598197061:AAHUUN_1P4oaI1MQ-FAPkOHoPL-wFZok95A',
      bot = new TelegramBot(token,{polling:true});


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "fmtnpubot"
});
      con.connect(function(err) {
		  if (err) throw err;
		});
bot.onText(/\/start/, function (msg) {
    bot.sendMessage(msg.from.id, 'Розклад - розклад пар \n' +
        'Розклад дзвінків - розклад дзвінків \n' +
        'Назва Вашої групи у форматі "Ф-11" - розклад пар для Вашої групи \n' +
        'Назва Вашої групи у форматі "Ф-11 `назва дня`" (Ф-11 понеділок) - розклад Вашої групи у вказаний день \n' +
        'Факультет - інформація про факультет\n' +
        'Список предметів - your_moodle_login - your_moodle_password - список предметів доступних для Вас у Moodle\n' +
		'Додатково- інформація про розташування корпусів та додаткових приміщень');
});
bot.onText(/\/help/, function (msg) {
    bot.sendMessage(msg.from.id, 'Розклад - розклад пар \n' +
        'Розклад дзвінків - розклад дзвінків \n' +
        'Назва Вашої групи у форматі "Ф-11" - розклад пар для Вашої групи \n' +
        'Назва Вашої групи у форматі "Ф-11 `назва дня`" (Ф-11 понеділок) - розклад Вашої групи у вказаний день \n' +
        'Факультет - інформація про факультет\n' +
        'Список предметів - your_moodle_login - your_moodle_password - список предметів доступних для Вас у Moodle\n' +
		'Додатково - інформація про розташування корпусів та додаткових приміщень');
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
        bot.sendMessage(id, 'Привіт, введи /help та читай як зі мною працювати');
    } else if (messageText === 'розклад дзвінків') {
		con.query('SELECT * FROM shedule_lessons_bell WHERE id=1', function (error, results, fields) {
		  if (error) throw error;
		  var res = JSON.parse(results[0].shedule);
			var mess = '';
			for (var k in res) {
				mess = mess + k + " - ";
				mess = mess + res[k] + '; \n';
			}
			bot.sendMessage(id, mess);
		});
    } else if (messageText.split(' - ')[0] === 'список предметів') {
		moodleClient.init({
		wwwroot: "http://elr.tnpu.edu.ua/",
		username: messageText.split(' - ')[1],
		password: messageText.split(' - ')[2],
		service: 'moodle_mobile_app'
		}).then(client => {
			client.call({
				wsfunction: 'core_webservice_get_site_info'
			}).then(r => {
				client.call({
					wsfunction: 'core_enrol_get_users_courses',
					args: {
						userid: r.userid
					}
				}).then(r => {
					var mess = '';
					for (var i = 0; i < r.length; i++) {
						
						mess = mess + r[i].fullname + '\n';
					}
					bot.sendMessage(id, mess);
				});
			});
		});
    } else if (messageText === 'факультет') {
        bot.sendMessage(id, "Оберіть пункт", {
            "reply_markup": {
                "keyboard": [["Декан", "Замдекана", "Деканат"], ["Контакти та розташування"], ["Кафедри"]]
            }
        });
    } else if (messageText === 'декан') {
		var mess = 'Декан факультету - Громяк Мирон Іванович';
		bot.sendMessage(id, mess);
    } else if (messageText === 'замдекана') {
		var mess = 'Замдекан факультету - Федчишин Ольга Михайлівна';
		bot.sendMessage(id, mess);
    } else if (messageText === 'деканат') {
		var mess = 'Аудиторія 413';
		bot.sendMessage(id, mess);
    } else if (messageText === 'контакти та розташування') {
		var mess = 'Телефон: 0352 533 612 \n Адреса: Корпус №4, вул. В. Винниченка, 10, м. Тернопіль';
		bot.sendLocation(id, 49.5430057, 25.5722451);
		bot.sendMessage(id, mess);
    } else if (messageText === 'додатково') {
        bot.sendMessage(id, "Оберіть пункт", {
            "reply_markup": {
                "keyboard": [["Корпуси", "Гуртожитки"], ["Бібліотека", "Світлиця"]]
            }
        });
    } else if (messageText === 'корпуси') {
        bot.sendMessage(id, "Виберіть корпус", {
            "reply_markup": {
                "keyboard": [["Корпус №1", "Корпус №2"], 
				[ "Корпус №3", "Корпус №4"], ["Корпус №7", "Корпус №10"]]
            }
        });
    } else if (messageText === 'корпус №1') {
		var mess = 'Центральний корпус (аудиторії 1-187)';
		bot.sendLocation(id, 49.5456511, 25.5635977);
		bot.sendMessage(id, mess);
    } else if (messageText === 'корпус №2') {
		var mess = 'Інженерно-педагогічний факультет, психолого-педагогічне відділення (аудиторії 203-234)';
		bot.sendLocation(id, 49.5426886, 25.5711154);
		bot.sendMessage(id, mess);
    } else if (messageText === 'корпус №3') {
		var mess = 'Факультет мистецтв, відділення ПВПК (аудиторії 301-349)';
		bot.sendLocation(id, 49.5427725, 25.5707754);
		bot.sendMessage(id, mess);
    } else if (messageText === 'корпус №4') {
		var mess = 'Фізико-математичний факультет) (аудиторії 403-447)';
		bot.sendLocation(id, 49.5427725, 25.5707754);
		bot.sendMessage(id, mess);
    } else if (messageText === 'корпус №7') {
		var mess = 'На вул. Петриківській – філологічний факультет (аудиторії 701-709)';
		bot.sendLocation(id, 49.5490261, 25.56912);
		bot.sendMessage(id, mess);
    } else if (messageText === 'корпус №10') {
		var mess = 'Історичний факультет (аудиторії 1001-1011)';
		bot.sendLocation(id, 49.5466908, 25.5621703);
		bot.sendMessage(id, mess);
    } else if (messageText === 'гуртожитки') {
        bot.sendMessage(id, "Виберіть гуртожиток", {
            "reply_markup": {
                "keyboard": [["Гуртожиток №1", "Гуртожиток №2"], 
				[ "Гуртожиток №3", "Гуртожиток №4"], ["Гуртожиток №5"]]
            }
        });
    } else if (messageText === 'гуртожиток №1') {
		var mess = 'Інститут мистецтв (аудиторії 602-611)';
		bot.sendLocation(id, 49.5430057, 25.5722451);
		bot.sendMessage(id, mess);
    } else if (messageText === 'гуртожиток №2') {
		var mess = 'Філологічний, факультет фізичного виховання (аудиторії 902-906)';
		bot.sendLocation(id, 49.550179, 25.5624705);
		bot.sendMessage(id, mess);
    } else if (messageText === 'гуртожиток №3') {
		var mess = 'Хіміко-біологічний, географічний факультети (медіастудія)';
		bot.sendLocation(id, 49.5439581, 25.5698046);
		bot.sendMessage(id, mess);
    } else if (messageText === 'гуртожиток №4') {
		var mess = 'Історичний, інститут педагогіки та психології, інженерно-педагогічний факультет (аудиторії 829-833)';
		bot.sendLocation(id, 49.5442331, 25.5686835);
		bot.sendMessage(id, mess);
    } else if (messageText === 'гуртожиток №5') {
		var mess = 'Факультет іноземних мов та фізико-математичний (аудиторії 821-828)';
		bot.sendLocation(id, 49.5440208, 25.5682436);
		bot.sendMessage(id, mess);
    } else if (messageText === 'бібліотека') {
		var mess = 'Бібліотека ТНПУ';
		bot.sendLocation(id, 49.5472968, 25.5647835);
		bot.sendMessage(id, mess);
    } else if (messageText === 'світлиця') {
		var mess = 'Світлиця/Кампус';
		bot.sendLocation(id, 49.5430152, 25.5708687);
		bot.sendMessage(id, mess);
    } else if (messageText === 'кафедри') {
        bot.sendMessage(id, "Виберіть кафедру", {
            "reply_markup": {
                "keyboard": [["Кафедра фізики"], ["Кафедра математики"], ["Кафедра інформатики"]]
            }
        });
    } else if (messageText === 'кафедра інформатики') {
		bot.sendMessage(id, "Кафедра інформатики", {
            "reply_markup": {
                "keyboard": [["Завідувач кафедри інформатики"], ["Список викладачів кафедри інформатики"], ["Росташування кафедри інформатики"]]
            }
        });
    } else if (messageText === 'кафедра фізики') {
		bot.sendMessage(id, "Кафедра фізики", {
            "reply_markup": {
                "keyboard": [["Завідувач кафедри фізики"], ["Список викладачів кафедри фізики"], ["Росташування кафедри фізики"]]
            }
        });
    } else if (messageText === 'кафедра математики') {
		bot.sendMessage(id, "Кафедра математики", {
            "reply_markup": {
                "keyboard": [["Завідувач кафедри математики"], ["Список викладачів кафедри математики"], ["Росташування кафедри математики"]]
            }
        });
    } else if (messageText === 'завідувач кафедри інформатики') {
		con.query('SELECT * FROM chairs WHERE id=3', function (error, results, fields) {
			if (error) throw error;
			var res = JSON.parse(results[0].generals);
			var mess = '';
			for (var k in res) {
				mess = mess + k + " - ";
				mess = mess + res[k] + '\n';
			}		
			bot.sendMessage(id, mess);
		});
    } else if (messageText === 'список викладачів кафедри інформатики') {
		con.query('SELECT * FROM chairs WHERE id=3', function (error, results, fields) {
		  if (error) throw error;
		  var res = JSON.parse(results[0].teachers);
			var mess = '';
			for (var k in res) {
				mess = mess + res[k] + '\n';
			}
			bot.sendMessage(id, mess);
		});
    } else if (messageText === 'росташування кафедри інформатики') {
		con.query('SELECT * FROM chairs WHERE id=3', function (error, results, fields) {
			if (error) throw error;
			var mess = results[0].auditory;

			bot.sendMessage(id, mess);
		});
    } else if (messageText === 'завідувач кафедри математики') {
		con.query('SELECT * FROM chairs WHERE id=1', function (error, results, fields) {
			if (error) throw error;
			var res = JSON.parse(results[0].generals);
			var mess = '';
			for (var k in res) {
				mess = mess + k + " - ";
				mess = mess + res[k] + '\n';
			}		
			bot.sendMessage(id, mess);
		});
    } else if (messageText === 'список викладачів кафедри математики') {
		con.query('SELECT * FROM chairs WHERE id=1', function (error, results, fields) {
		  if (error) throw error;
		  var res = JSON.parse(results[0].teachers);
			var mess = '';
			for (var k in res) {
				mess = mess + res[k] + '\n';
			}
			bot.sendMessage(id, mess);
		});
    } else if (messageText === 'росташування кафедри математики') {
		con.query('SELECT * FROM chairs WHERE id=1', function (error, results, fields) {
			if (error) throw error;
			var mess = results[0].auditory;

			bot.sendMessage(id, mess);
		});
    } else if (messageText === 'завідувач кафедри фізики') {
		con.query('SELECT * FROM chairs WHERE id=2', function (error, results, fields) {
			if (error) throw error;
			var res = JSON.parse(results[0].generals);
			var mess = '';
			for (var k in res) {
				mess = mess + k + " - ";
				mess = mess + res[k] + '\n';
			}		
			bot.sendMessage(id, mess);
		});
    } else if (messageText === 'список викладачів кафедри фізики') {
		con.query('SELECT * FROM chairs WHERE id=2', function (error, results, fields) {
		  if (error) throw error;
		  var res = JSON.parse(results[0].teachers);
			var mess = '';
			for (var k in res) {
				mess = mess + res[k] + '\n';
			}
			bot.sendMessage(id, mess);
		});
    } else if (messageText === 'росташування кафедри фізики') {
		con.query('SELECT * FROM chairs WHERE id=2', function (error, results, fields) {
			if (error) throw error;
			var mess = results[0].auditory;
			bot.sendMessage(id, mess);
		});
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
       // var mess = functions.sendMessSheduleByGroup(con, messageText);
		con.query('SELECT * FROM shedule_lessons_by_day WHERE groups="'+messageText+'"', function (error, results, fields) {
		  if (error) throw error;
		  var res = JSON.parse(results[0].shedule);

			var mess = functions.returnSheduleByGroup(res);
			bot.sendMessage(id, mess);
		});
    } else if ((messageText === 'ф-11 понеділок') || (messageText === 'ф-11 вівторок') || (messageText === 'ф-11 середа') || (messageText === 'ф-11 четвер') || (messageText === 'ф-11 п\'ятниця')) {
        var day = messageText.split(' ');
		con.query('SELECT * FROM shedule_lessons_by_day WHERE groups="'+day[0]+'"', function (error, results, fields) {
			if (error) throw error;
			var res = JSON.parse(results[0].shedule);

			var mess = functions.returnSheduleByGroupForDay(res, day[1]);
			bot.sendMessage(id, mess);
		});
    } else if (messageText === 'м-12') {
        con.query('SELECT * FROM shedule_lessons_by_day WHERE groups="'+messageText+'"', function (error, results, fields) {
		  if (error) throw error;
		  var res = JSON.parse(results[0].shedule);

			var mess = functions.returnSheduleByGroup(res);
			bot.sendMessage(id, mess);
		});
    } else if (messageText === 'м-12 понеділок' || (messageText === 'м-12 вівторок') || (messageText === 'м-12 середа') || (messageText === 'м-12 четвер') || (messageText === 'м-12 п\'ятниця')) {
		var day = messageText.split(' ');
		con.query('SELECT * FROM shedule_lessons_by_day WHERE groups="'+day[0]+'"', function (error, results, fields) {
			if (error) throw error;
			var res = JSON.parse(results[0].shedule);

			var mess = functions.returnSheduleByGroupForDay(res, day[1]);
			bot.sendMessage(id, mess);
		});
    } else if (messageText === 'і-13') {
        con.query('SELECT * FROM shedule_lessons_by_day WHERE groups="'+messageText+'"', function (error, results, fields) {
		  if (error) throw error;
		  var res = JSON.parse(results[0].shedule);

			var mess = functions.returnSheduleByGroup(res);
			bot.sendMessage(id, mess);
		});
    } else if ((messageText === 'і-13 понеділок') || (messageText === 'і-13 вівторок') || (messageText === 'і-13 середа') || (messageText === 'і-13 четвер') || (messageText === 'і-13 п\'ятниця')) {
        var day = messageText.split(' ');
		con.query('SELECT * FROM shedule_lessons_by_day WHERE groups="'+day[0]+'"', function (error, results, fields) {
			if (error) throw error;
			var res = JSON.parse(results[0].shedule);

			var mess = functions.returnSheduleByGroupForDay(res, day[1]);
			bot.sendMessage(id, mess);
		});
    } else if (messageText === 'другий курс') {
        var second = objects.shesule.second;
        bot.sendMessage(id, "Виберіть групу", {
            "reply_markup": {
                "keyboard": [["Назад", "Ф-21", "М-22", "І-23"]]
            }
        });
    } else if (messageText === 'ф-21') {
        con.query('SELECT * FROM shedule_lessons_by_day WHERE groups="'+messageText+'"', function (error, results, fields) {
		  if (error) throw error;
		  var res = JSON.parse(results[0].shedule);

			var mess = functions.returnSheduleByGroup(res);
			bot.sendMessage(id, mess);
		});
    } else if ((messageText === 'ф-21 понеділок') || (messageText === 'ф-21 вівторок') || (messageText === 'ф-21 середа') || (messageText === 'ф-21 четвер') || (messageText === 'ф-21 п\'ятниця')) {
        var day = messageText.split(' ');
		con.query('SELECT * FROM shedule_lessons_by_day WHERE groups="'+day[0]+'"', function (error, results, fields) {
			if (error) throw error;
			var res = JSON.parse(results[0].shedule);

			var mess = functions.returnSheduleByGroupForDay(res, day[1]);
			bot.sendMessage(id, mess);
		});
    } else if (messageText === 'м-22') {
        con.query('SELECT * FROM shedule_lessons_by_day WHERE groups="'+messageText+'"', function (error, results, fields) {
		  if (error) throw error;
		  var res = JSON.parse(results[0].shedule);

			var mess = functions.returnSheduleByGroup(res);
			bot.sendMessage(id, mess);
		});
    } else if (messageText === 'м-22 понеділок' || (messageText === 'м-22 вівторок') || (messageText === 'м-22 середа') || (messageText === 'м-22 четвер') || (messageText === 'м-22 п\'ятниця')) {
        var day = messageText.split(' ');
		con.query('SELECT * FROM shedule_lessons_by_day WHERE groups="'+day[0]+'"', function (error, results, fields) {
			if (error) throw error;
			var res = JSON.parse(results[0].shedule);

			var mess = functions.returnSheduleByGroupForDay(res, day[1]);
			bot.sendMessage(id, mess);
		});
    } else if (messageText === 'і-23') {
        con.query('SELECT * FROM shedule_lessons_by_day WHERE groups="'+messageText+'"', function (error, results, fields) {
		  if (error) throw error;
		  var res = JSON.parse(results[0].shedule);

			var mess = functions.returnSheduleByGroup(res);
			bot.sendMessage(id, mess);
		});
    } else if ((messageText === 'і-23 понеділок') || (messageText === 'і-23 вівторок') || (messageText === 'і-23 середа') || (messageText === 'і-23 четвер') || (messageText === 'і-23 п\'ятниця')) {
        var day = messageText.split(' ');
		con.query('SELECT * FROM shedule_lessons_by_day WHERE groups="'+day[0]+'"', function (error, results, fields) {
			if (error) throw error;
			var res = JSON.parse(results[0].shedule);

			var mess = functions.returnSheduleByGroupForDay(res, day[1]);
			bot.sendMessage(id, mess);
		});
    } else if (messageText === 'третій курс') {
        var third = objects.shesule.third;
        bot.sendMessage(id, "Виберіть групу", {
            "reply_markup": {
                "keyboard": [["Назад", "Ф-31", "М-32", "М-33", "І-34"]]
            }
        });
    } else if (messageText === 'ф-31') {
        con.query('SELECT * FROM shedule_lessons_by_day WHERE groups="'+messageText+'"', function (error, results, fields) {
		  if (error) throw error;
		  var res = JSON.parse(results[0].shedule);

			var mess = functions.returnSheduleByGroup(res);
			bot.sendMessage(id, mess);
		});
    } else if ((messageText === 'ф-31 понеділок') || (messageText === 'ф-31 вівторок') || (messageText === 'ф-31 середа') || (messageText === 'ф-31 четвер') || (messageText === 'ф-31 п\'ятниця')) {
        var day = messageText.split(' ');
		con.query('SELECT * FROM shedule_lessons_by_day WHERE groups="'+day[0]+'"', function (error, results, fields) {
			if (error) throw error;
			var res = JSON.parse(results[0].shedule);

			var mess = functions.returnSheduleByGroupForDay(res, day[1]);
			bot.sendMessage(id, mess);
		});
    } else if (messageText === 'м-32') {
        con.query('SELECT * FROM shedule_lessons_by_day WHERE groups="'+messageText+'"', function (error, results, fields) {
		  if (error) throw error;
		  var res = JSON.parse(results[0].shedule);

			var mess = functions.returnSheduleByGroup(res);
			bot.sendMessage(id, mess);
		});
    } else if (messageText === 'м-32 понеділок' || (messageText === 'м-32 вівторок') || (messageText === 'м-32 середа') || (messageText === 'м-32 четвер') || (messageText === 'м-32 п\'ятниця')) {
        var day = messageText.split(' ');
		con.query('SELECT * FROM shedule_lessons_by_day WHERE groups="'+day[0]+'"', function (error, results, fields) {
			if (error) throw error;
			var res = JSON.parse(results[0].shedule);

			var mess = functions.returnSheduleByGroupForDay(res, day[1]);
			bot.sendMessage(id, mess);
		});
    } else if (messageText === 'м-33') {
        con.query('SELECT * FROM shedule_lessons_by_day WHERE groups="'+messageText+'"', function (error, results, fields) {
		  if (error) throw error;
		  var res = JSON.parse(results[0].shedule);

			var mess = functions.returnSheduleByGroup(res);
			bot.sendMessage(id, mess);
		});
    } else if (messageText === 'м-33 понеділок' || (messageText === 'м-33 вівторок') || (messageText === 'м-33 середа') || (messageText === 'м-33 четвер') || (messageText === 'м-33 п\'ятниця')) {
        var day = messageText.split(' ');
		con.query('SELECT * FROM shedule_lessons_by_day WHERE groups="'+day[0]+'"', function (error, results, fields) {
			if (error) throw error;
			var res = JSON.parse(results[0].shedule);

			var mess = functions.returnSheduleByGroupForDay(res, day[1]);
			bot.sendMessage(id, mess);
		});
    } else if (messageText === 'і-34') {
        con.query('SELECT * FROM shedule_lessons_by_day WHERE groups="'+messageText+'"', function (error, results, fields) {
		  if (error) throw error;
		  var res = JSON.parse(results[0].shedule);

			var mess = functions.returnSheduleByGroup(res);
			bot.sendMessage(id, mess);
		});
    } else if ((messageText === 'і-34 понеділок') || (messageText === 'і-34 вівторок') || (messageText === 'і-34 середа') || (messageText === 'і-34 четвер') || (messageText === 'і-34 п\'ятниця')) {
        var day = messageText.split(' ');
		con.query('SELECT * FROM shedule_lessons_by_day WHERE groups="'+day[0]+'"', function (error, results, fields) {
			if (error) throw error;
			var res = JSON.parse(results[0].shedule);

			var mess = functions.returnSheduleByGroupForDay(res, day[1]);
			bot.sendMessage(id, mess);
		});
    } else if (messageText === 'четвертий курс') {
        var fourth = objects.shesule.fourth;
        bot.sendMessage(id, "Виберіть групу", {
            "reply_markup": {
                "keyboard": [["Назад", "Ф-41", "М-42", "М-43", "І-44"]]
            }
        });
    } else if (messageText === 'ф-41') {
        con.query('SELECT * FROM shedule_lessons_by_day WHERE groups="'+messageText+'"', function (error, results, fields) {
		  if (error) throw error;
		  var res = JSON.parse(results[0].shedule);

			var mess = functions.returnSheduleByGroup(res);
			bot.sendMessage(id, mess);
		});
    } else if ((messageText === 'ф-41 понеділок') || (messageText === 'ф-41 вівторок') || (messageText === 'ф-41 середа') || (messageText === 'ф-41 четвер') || (messageText === 'ф-41 п\'ятниця')) {
        var day = messageText.split(' ');
		con.query('SELECT * FROM shedule_lessons_by_day WHERE groups="'+day[0]+'"', function (error, results, fields) {
			if (error) throw error;
			var res = JSON.parse(results[0].shedule);

			var mess = functions.returnSheduleByGroupForDay(res, day[1]);
			bot.sendMessage(id, mess);
		});
    } else if (messageText === 'м-42') {
        con.query('SELECT * FROM shedule_lessons_by_day WHERE groups="'+messageText+'"', function (error, results, fields) {
		  if (error) throw error;
		  var res = JSON.parse(results[0].shedule);

			var mess = functions.returnSheduleByGroup(res);
			bot.sendMessage(id, mess);
		});
    } else if (messageText === 'м-42 понеділок' || (messageText === 'м-42 вівторок') || (messageText === 'м-42 середа') || (messageText === 'м-42 четвер') || (messageText === 'м-42 п\'ятниця')) {
        var day = messageText.split(' ');
		con.query('SELECT * FROM shedule_lessons_by_day WHERE groups="'+day[0]+'"', function (error, results, fields) {
			if (error) throw error;
			var res = JSON.parse(results[0].shedule);

			var mess = functions.returnSheduleByGroupForDay(res, day[1]);
			bot.sendMessage(id, mess);
		});
    } else if (messageText === 'м-43') {
        con.query('SELECT * FROM shedule_lessons_by_day WHERE groups="'+messageText+'"', function (error, results, fields) {
		  if (error) throw error;
		  var res = JSON.parse(results[0].shedule);

			var mess = functions.returnSheduleByGroup(res);
			bot.sendMessage(id, mess);
		});
    } else if (messageText === 'м-43 понеділок' || (messageText === 'м-43 вівторок') || (messageText === 'м-43 середа') || (messageText === 'м-43 четвер') || (messageText === 'м-43 п\'ятниця')) {
        var day = messageText.split(' ');
		con.query('SELECT * FROM shedule_lessons_by_day WHERE groups="'+day[0]+'"', function (error, results, fields) {
			if (error) throw error;
			var res = JSON.parse(results[0].shedule);

			var mess = functions.returnSheduleByGroupForDay(res, day[1]);
			bot.sendMessage(id, mess);
		});
    } else if (messageText === 'і-44') {
        con.query('SELECT * FROM shedule_lessons_by_day WHERE groups="'+messageText+'"', function (error, results, fields) {
		  if (error) throw error;
		  var res = JSON.parse(results[0].shedule);

			var mess = functions.returnSheduleByGroup(res);
			bot.sendMessage(id, mess);
		});
    } else if ((messageText === 'і-44 понеділок') || (messageText === 'і-44 вівторок') || (messageText === 'і-44 середа') || (messageText === 'і-44 четвер') || (messageText === 'і-44 п\'ятниця')) {
        var day = messageText.split(' ');
		con.query('SELECT * FROM shedule_lessons_by_day WHERE groups="'+day[0]+'"', function (error, results, fields) {
			if (error) throw error;
			var res = JSON.parse(results[0].shedule);

			var mess = functions.returnSheduleByGroupForDay(res, day[1]);
			bot.sendMessage(id, mess);
		});
    } else if (messageText === 'магістри 1ий курс') {
        var fifth = objects.shesule.fifth;
        bot.sendMessage(id, "Виберіть групу", {
            "reply_markup": {
                "keyboard": [["Назад", "МФ-1", "ММ-1", "МІ-1"]]
            }
        });
    } else if (messageText === 'мф-1') {
        con.query('SELECT * FROM shedule_lessons_by_day WHERE groups="'+messageText+'"', function (error, results, fields) {
		  if (error) throw error;
		  var res = JSON.parse(results[0].shedule);

			var mess = functions.returnSheduleByGroup(res);
			bot.sendMessage(id, mess);
		});
    } else if ((messageText === 'мф-1 понеділок') || (messageText === 'мф-1 вівторок') || (messageText === 'мф-1 середа') || (messageText === 'мф-1 четвер') || (messageText === 'мф-1 п\'ятниця')) {
        var day = messageText.split(' ');
		con.query('SELECT * FROM shedule_lessons_by_day WHERE groups="'+day[0]+'"', function (error, results, fields) {
			if (error) throw error;
			var res = JSON.parse(results[0].shedule);

			var mess = functions.returnSheduleByGroupForDay(res, day[1]);
			bot.sendMessage(id, mess);
		});
    } else if (messageText === 'мм-1') {
        con.query('SELECT * FROM shedule_lessons_by_day WHERE groups="'+messageText+'"', function (error, results, fields) {
		  if (error) throw error;
		  var res = JSON.parse(results[0].shedule);

			var mess = functions.returnSheduleByGroup(res);
			bot.sendMessage(id, mess);
		});
    } else if (messageText === 'мм-1 понеділок' || (messageText === 'мм-1 вівторок') || (messageText === 'мм-1 середа') || (messageText === 'мм-1 четвер') || (messageText === 'мм-1 п\'ятниця')) {
        var day = messageText.split(' ');
		con.query('SELECT * FROM shedule_lessons_by_day WHERE groups="'+day[0]+'"', function (error, results, fields) {
			if (error) throw error;
			var res = JSON.parse(results[0].shedule);

			var mess = functions.returnSheduleByGroupForDay(res, day[1]);
			bot.sendMessage(id, mess);
		});
    } else if (messageText === 'мі-1') {
        con.query('SELECT * FROM shedule_lessons_by_day WHERE groups="'+messageText+'"', function (error, results, fields) {
		  if (error) throw error;
		  var res = JSON.parse(results[0].shedule);

			var mess = functions.returnSheduleByGroup(res);
			bot.sendMessage(id, mess);
		});
    } else if ((messageText === 'мі-1 понеділок') || (messageText === 'мі-1 вівторок') || (messageText === 'мі-1 середа') || (messageText === 'мі-1 четвер') || (messageText === 'мі-1 п\'ятниця')) {
        var day = messageText.split(' ');
		con.query('SELECT * FROM shedule_lessons_by_day WHERE groups="'+day[0]+'"', function (error, results, fields) {
			if (error) throw error;
			var res = JSON.parse(results[0].shedule);

			var mess = functions.returnSheduleByGroupForDay(res, day[1]);
			bot.sendMessage(id, mess);
		});
    } else if (messageText === 'магістри 2ий курс') {
        var sixth = objects.shesule.sixth;
        bot.sendMessage(id, "Виберіть групу", {
            "reply_markup": {
                "keyboard": [["Назад", "МФ-2", "ММ-2", "МІ-2"]]
            }
        });
    } else if (messageText === 'мф-2') {
		con.query('SELECT * FROM shedule_lessons_by_day WHERE groups="'+messageText+'"', function (error, results, fields) {
		  if (error) throw error;
		  var res = JSON.parse(results[0].shedule);

			var mess = functions.returnSheduleByGroup(res);
			bot.sendMessage(id, mess);
		});
    } else if ((messageText === 'мф-2 понеділок') || (messageText === 'мф-2 вівторок') || (messageText === 'мф-2 середа') || (messageText === 'мф-2 четвер') || (messageText === 'мф-2 п\'ятниця')) {
        var day = messageText.split(' ');
		con.query('SELECT * FROM shedule_lessons_by_day WHERE groups="'+day[0]+'"', function (error, results, fields) {
			if (error) throw error;
			var res = JSON.parse(results[0].shedule);

			var mess = functions.returnSheduleByGroupForDay(res, day[1]);
			bot.sendMessage(id, mess);
		});
    } else if (messageText === 'мм-2') {
        con.query('SELECT * FROM shedule_lessons_by_day WHERE groups="'+messageText+'"', function (error, results, fields) {
		  if (error) throw error;
		  var res = JSON.parse(results[0].shedule);

			var mess = functions.returnSheduleByGroup(res);
			bot.sendMessage(id, mess);
		});
    } else if (messageText === 'мм-2 понеділок' || (messageText === 'мм-2 вівторок') || (messageText === 'мм-2 середа') || (messageText === 'мм-2 четвер') || (messageText === 'мм-2 п\'ятниця')) {
        var day = messageText.split(' ');
		con.query('SELECT * FROM shedule_lessons_by_day WHERE groups="'+day[0]+'"', function (error, results, fields) {
			if (error) throw error;
			var res = JSON.parse(results[0].shedule);

			var mess = functions.returnSheduleByGroupForDay(res, day[1]);
			bot.sendMessage(id, mess);
		});
    } else if (messageText === 'мі-2') {
        con.query('SELECT * FROM shedule_lessons_by_day WHERE groups="'+messageText+'"', function (error, results, fields) {
		  if (error) throw error;
		  var res = JSON.parse(results[0].shedule);

			var mess = functions.returnSheduleByGroup(res);
			bot.sendMessage(id, mess);
		});
    } else if ((messageText === 'мі-2 понеділок') || (messageText === 'мі-2 вівторок') || (messageText === 'мі-2 середа') || (messageText === 'мі-2 четвер') || (messageText === 'мі-2 п\'ятниця')) {
        var day = messageText.split(' ');
		con.query('SELECT * FROM shedule_lessons_by_day WHERE groups="'+day[0]+'"', function (error, results, fields) {
			if (error) throw error;
			var res = JSON.parse(results[0].shedule);

			var mess = functions.returnSheduleByGroupForDay(res, day[1]);
			bot.sendMessage(id, mess);
		});
    }
});

		//con.end();
