from datetime import datetime
import os
from pymongo import MongoClient
from dotenv import load_dotenv

db = None


def connect_to_mongodb():
    global db
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


def store_survey_data():
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


def get_survey_data():
    collection = db["survey_data"]
    questions = list(collection.find({}, {"_id": 0}))
    return questions


def post_survey_response(response):
    collection = db["survey_response"]
    question = response['question']
    user_name = response['user_name']
    existing_response = collection.find_one({"question": question, "user_name": user_name})
    if existing_response:
        print(f"User {user_name} has already responded to this question.")
        return False

    new_response = {
        "question": question,
        "user_name": user_name,
        "pole_id": response['pole_id'],
        "user_id": response['user_id'],
        "selected_option": response['selected_option'],
    }
    result = collection.insert_one(new_response)
    if result.acknowledged:
        print(f"Response from {user_name} recorded successfully.")
        return True
    else:
        print("Failed to record the response. Please try again.")
        return False
