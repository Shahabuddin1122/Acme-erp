interface QueriesType {
    _id: string;
    name: string;
    count: string;
}

interface OptionCounts {
    [option: string]: number;
}


interface QuestionData {
    question: string;
    options: string[];
    option_counts: OptionCounts;
}

type SurveyData = QuestionData[];
