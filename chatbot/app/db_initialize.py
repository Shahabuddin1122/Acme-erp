from datetime import datetime
import os
from pymongo import MongoClient
from dotenv import load_dotenv

from chromadb_init import get_message_type

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
        store_category_data()
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


def store_category_data():
    try:
        category_collection = db['categories']
        category_questions = [
            {"name": "Organization Structure & Establishment", "count": 0},
            {"name": "Manpower Planning", "count": 0},
            {"name": "Succession Planning & Organization Review", "count": 0},
            {"name": "Minimum Standards for Employment", "count": 0},
            {"name": "Definition of Employment Status", "count": 0},
            {"name": "Recruitment and Selection", "count": 0},
            {"name": "Equal Employment Opportunity", "count": 0},
            {"name": "Employment Interview", "count": 0},
            {"name": "Pre-Placement Medical Examination", "count": 0},
            {"name": "Reference Checking", "count": 0},
            {"name": "Job Contract Contractor", "count": 0},
            {"name": "New Employee Orientation", "count": 0},
            {"name": "Employee Responsibilities & Obligations", "count": 0},
            {"name": "Standards of Conduct", "count": 0},
            {"name": "Conflict of Interest", "count": 0},
            {"name": "Attendance", "count": 0},
            {"name": "Safety", "count": 0},
            {"name": "Smoking in the Workplace", "count": 0},
            {"name": "Employee Counseling and Assistance", "count": 0},
            {"name": "Communication", "count": 0},
            {"name": "Suggestions/Ideas", "count": 0},
            {"name": "Participation Committee/Welfare Committee", "count": 0},
            {"name": "Objectives of the Committees", "count": 0},
            {"name": "Grievance Procedure", "count": 0},
            {"name": "Employee Relations", "count": 0},
            {"name": "Performance Management – Management Staff", "count": 0},
            {"name": "Training and Development", "count": 0},
            {"name": "Employees Records Privacy and Retention", "count": 0},
            {"name": "Reports, Information, and HRIS", "count": 0},
            {"name": "Compensation & Benefits", "count": 0},
            {"name": "Salary Administration", "count": 0},
            {"name": "Incentive Scheme Plan", "count": 0},
            {"name": "Loan Facilities", "count": 0},
            {"name": "Medical Benefits", "count": 0},
            {"name": "Provident Fund", "count": 0},
            {"name": "Gratuity", "count": 0},
            {"name": "Group Term & Hospital Insurance", "count": 0},
            {"name": "Car Scheme", "count": 0},
            {"name": "Transfer & Transfer Expenses", "count": 0},
            {"name": "Travel", "count": 0},
            {"name": "Standard Service Year", "count": 0},
            {"name": "Leave Entitlement", "count": 0},
            {"name": "Annual Leave", "count": 0},
            {"name": "Sick/Prolonged/Accident Leave", "count": 0},
            {"name": "Casual Leave", "count": 0},
            {"name": "Maternity Leave", "count": 0},
            {"name": "Leave Without Pay (LWP) & Unauthorized Absence", "count": 0},
            {"name": "Leave Encashment", "count": 0},
            {"name": "Over-Staying of Leave / Loss of Lien", "count": 0},
            {"name": "Employee Discipline", "count": 0},
            {"name": "Suspensions", "count": 0},
            {"name": "Compliance & Regulatory Affairs", "count": 0},
            {"name": "Stoppage of Works", "count": 0},
            {"name": "Lay Off", "count": 0},
            {"name": "Employee Separations", "count": 0},
            {"name": "Resignation", "count": 0},
            {"name": "Termination", "count": 0},
            {"name": "Dismissal", "count": 0},
            {"name": "Discharge", "count": 0},
            {"name": "Deceased Employees", "count": 0},
            {"name": "Retirement", "count": 0},
            {"name": "Redundancy", "count": 0},
            {"name": "Exit Interview", "count": 0}
        ]
        category_collection.insert_many(category_questions)
        print("Category data inserted successfully.")
    except Exception as e:
        print("Failed to insert category data:", e)


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


def store_top_user(message):
    user_id = message.chat.id
    user_name = message.chat.first_name + " " + message.chat.last_name
    text = message.text
    store_top_queries(text)
    collection = db['users']
    existing_response = collection.find_one({"user_id": user_id, "user_name": user_name})
    if existing_response:
        print(f"User {user_name} has already responded to this message.")
        return False

    result = collection.insert_one({"user_id": user_id, "user_name": user_name})
    if result.acknowledged:
        print(f"Response from {user_name} recorded successfully.")
    else:
        print("Failed to record the response. Please try again.")


def store_top_queries(message):
    category_collection = db['categories']
    message_type = get_message_type(message)
    category = category_collection.find_one({"name": message_type})
    if category:
        new_count = category['count'] + 1
        category_collection.update_one(
            {"name": message_type},
            {"$set": {"count": new_count}}
        )
        print(f"Updated count for {message_type}: {new_count}")
    else:
        print(f"No category found for message type: {message_type}")
