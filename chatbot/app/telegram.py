import os
import time

import dotenv
import telebot

from db_initialize import post_survey_response

dotenv.load_dotenv()


class Telegram:
    def __init__(self, message_handler):
        self.bot = telebot.TeleBot(os.getenv("TELEGRAM_API_KEY"), parse_mode=None)
        self.message_handler = message_handler
        self.poll_answers = []

    def start(self):
        def run_polling():
            while True:
                try:
                    self.bot.polling(non_stop=True)
                except Exception as e:
                    print(f"Polling error: {e}")
                    time.sleep(5)

        @self.bot.message_handler(func=lambda message: True)
        def handle_message(message):
            self.message_handler(message.text, message.chat.id)

        @self.bot.poll_answer_handler()
        def handle_poll_answer(answer):
            option_index = answer.option_ids[0]
            poll_id = answer.poll_id
            for pole_answer in self.poll_answers:
                if pole_answer["pole_id"] == poll_id:
                    selected_option = pole_answer["options"][option_index]
                    pole_answer["selected_option"] = selected_option
            for pole_answer in self.poll_answers:
                if pole_answer["selected_option"] != "":
                    post_survey_response(pole_answer)

        run_polling()

    def send_message(self, chat_id, response):
        self.bot.send_message(chat_id, response)

    def send_poll(self, chat_id, question, options):
        poll_response = self.bot.send_poll(chat_id, question, options, is_anonymous=False)
        sav_info = {
            "pole_id": poll_response.poll.id,
            "user_id": poll_response.chat.id,
            "user_name": poll_response.chat.first_name + " " + poll_response.chat.last_name,
            "question": question,
            "options": options,
            "selected_option": "",
        }
        self.poll_answers.append(sav_info)
