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
        poles = list(db.survey_response.find({}))
        question_data = defaultdict(lambda: {"options": [], "option_counts": Counter()})

        for pole in poles:
            question = pole["question"]
            selected_option = pole["selected_option"]
            options = pole["options"]

            if not question_data[question]["options"]:
                question_data[question]["options"] = options

            question_data[question]["option_counts"][selected_option] += 1

        processed_poles = []
        for question, data in question_data.items():
            option_counts = {option: data["option_counts"].get(option, 0) for option in data["options"]}

            processed_poles.append({
                "question": question,
                "options": data["options"],
                "option_counts": option_counts
            })

        return Response({"poles": processed_poles}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
