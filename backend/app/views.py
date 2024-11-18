from collections import defaultdict, Counter
from datetime import datetime

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from app.utils import db


# Create your views here.
@api_view(['POST'])
def create_pole(request):
    question = request.data.get('question')
    options = request.data.get('options')

    if not question or not isinstance(options, list):
        return Response(
            {"error": "Invalid data format. 'question' and 'options' are required."},
            status=status.HTTP_400_BAD_REQUEST
        )

    survey_data = {
        "question": question,
        "options": options,
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    }
    try:
        db.survey_data.insert_one(survey_data)
        return Response({"message": "Survey created successfully"}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def get_poles(request):
    try:
        poles_response = list(db.survey_response.find({}))
        poles = list(db.survey_data.find({}))

        question_data = {
            pole["question"]: {
                "options": pole["options"],
                "option_counts": Counter({option: 0 for option in pole["options"]})
            }
            for pole in poles
        }

        for pole_response in poles_response:
            question = pole_response["question"]
            selected_option = pole_response["selected_option"]

            if question in question_data:
                question_data[question]["option_counts"][selected_option] += 1

        processed_poles = []
        for question, data in question_data.items():
            option_counts = {option: data["option_counts"].get(option, 0) for option in data["options"]}

            processed_poles.append({
                "question": question,
                "options": data["options"],
                "option_counts": option_counts
            })

        return Response(processed_poles, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def get_top_queries(request):
    try:
        categories = list(db.categories.find({}))
        for category in categories:
            category["_id"] = str(category["_id"])
        top_categories = sorted(categories, key=lambda x: x["count"], reverse=True)[:5]
        return Response(top_categories, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['DELETE'])
def delete_pole(request):
    try:
        question = request.data.get('question')
        pole_response_deleted = db.survey_response.delete_many({"question": question})
        poles_deleted = db.survey_data.delete_many({"question": question})

        if pole_response_deleted.deleted_count == 0 and poles_deleted.deleted_count == 0:
            return Response({"message": "No records found to delete."}, status=status.HTTP_404_NOT_FOUND)

        return Response(
            {"message": f"Deleted {pole_response_deleted.deleted_count} from survey_response and {poles_deleted.deleted_count} from survey_data."},
            status=status.HTTP_200_OK
        )
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
