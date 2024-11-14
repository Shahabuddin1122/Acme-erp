import random

from db_initialize import *
from telegram import Telegram
from chain import Chain


class MainApp:
    def __init__(self):
        self.telegram = Telegram(self.handle_message)
        self.chain = Chain()
        self.db = connect_to_mongodb()
        self.intro_templates = [
            "I am Acme Technology Ltd's HR chatbot. Here at the HR Knowledge Hub, I can assist you with a wide range "
            "of topics related to:",
            "Hello! I'm your HR assistant at Acme Technology Ltd. You can ask me about:",
            "Welcome to Acme Technology Ltd's HR chatbot! If you have any questions regarding:",
            "Hi there! I'm here to help with HR-related queries for Acme Technology Ltd. I cover topics such as:",
            "Greetings! I'm Acme Technology Ltd's HR chatbot. Whether you have questions about:"
        ]

        self.topics = [
            "- Leave policies",
            "- Attendance guidelines",
            "- Workplace safety",
            "- Employee benefits",
            "- Employee relations",
            "- HR policies and procedures",
            "- Dress code",
            "- Training and development",
            "- Performance management",
            "- Harassment and discrimination policies",
            "- Compensation and benefits",
            "- Leave requests",
            "- Workplace policies",
            "- Employee rights"
        ]

        self.closing_text = "\n\nFeel free to ask any HR inquiries you have! I'm here to help!"

    def get_intro_response(self):
        random.shuffle(self.topics)
        intro = random.choice(self.intro_templates)
        topics_list = "\n".join(self.topics[:5])
        response = f"{intro}\n{topics_list}{self.closing_text}"
        return response

    def handle_message(self, message, chat_id):
        if message.lower() == "/survey":
            self.start_survey(chat_id)
        elif message.lower() in ['/start', 'hello', 'hi', 'greetings']:
            response = self.get_intro_response()
            self.telegram.send_message(chat_id, response)
        else:
            response = self.chain.get_response(message, chat_id)
            self.telegram.send_message(chat_id, response)

    def start_survey(self, chat_id):
        survey_questions = get_survey_data()
        for survey in survey_questions:
            question = survey["question"]
            options = survey["options"]
            self.telegram.send_poll(chat_id, question, options)

    def run(self):
        print("Starting the bot...")
        self.telegram.start()


if __name__ == '__main__':
    app = MainApp()
    app.run()
