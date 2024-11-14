from datetime import datetime
import os
from pymongo import MongoClient
from dotenv import load_dotenv


def connect_to_mongodb():
    load_dotenv()

    mongo_connection_string = os.getenv("MONGO_CONNECTION")

    if not mongo_connection_string:
        raise ValueError("MongoDB connection string is not set in the .env file.")

    try:
        client = MongoClient(mongo_connection_string)
        db = client["ACME_ERP"]
        print(f"Connected to MongoDB database:ACME_ERP")
        return db
    except Exception as e:
        print("Failed to connect to MongoDB:", e)
        raise


def store_survey_data(db):
    try:
        survey_collection = db["survey_data"]
        survey_questions = [
            {
                "question": "How satisfied are you with the HR bot?",
                "options": ["Very satisfied", "Satisfied", "Neutral", "Unsatisfied", "Very unsatisfied"],
                "created_at": datetime.now(),
                "updated_at": datetime.now()
            },
            {
                "question": "How frequently do you use the HR bot?",
                "options": ["Daily", "Weekly", "Monthly", "Rarely", "Never"],
                "created_at": datetime.now(),
                "updated_at": datetime.now()
            }
        ]
        survey_collection.insert_many(survey_questions)
        print("Survey questions inserted successfully.")
    except Exception as e:
        print("Failed to insert survey data:", e)


def get_survey_data(db):
    collection = db["survey_data"]
    questions = list(collection.find({}, {"_id": 0}))
    return questions
