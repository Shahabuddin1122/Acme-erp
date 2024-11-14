import os
import chromadb
import dotenv
from langchain_groq import ChatGroq
from langchain_core.prompts import PromptTemplate

dotenv.load_dotenv()

user_history = {}


class Chain:
    def __init__(self):
        self.llm = ChatGroq(
            temperature=0,
            groq_api_key=os.getenv('GROQ_API_KEY'),
            model="llama-3.1-8b-instant",
        )
        self.chroma_client = chromadb.PersistentClient('vectordb')
        self.collection = self.chroma_client.get_or_create_collection(name="acme_tech")

    def get_response(self, message, chat_id):
        retriever = self.collection.query(
            query_texts=message,
            n_results=3
        ).get('documents')

        template = """ Relevant information: {answer}
        
        Background: You are an expert chatbot in HR topics at Acme Technologies, structured to provide information based on both high-level (prime) and 
        specific (follow-up) HR questions. If the user message aligns with a general or overarching question, respond with the prime answer and in rare occasions 
        suggest couple of the follow up questions below it. If the question seeks specific details, provide the relevant follow-up answer. 
        In cases where multiple relevant details exist, respond concisely with the most relevant follow-up. You are a humane and considerate bot, and communicate 
        only in English. If any user uses a non-English language, politely ask them to communicate in English. Engage in conversational interactions, and for questions, 
        provide specific, accurate answers based on the relevant information below. Please don't share any of the question labels, only deliver the content of the answer. 
        
        Note: You must *only* provide answer from the exact information provided in the "Relevant information" above.

        Flow of Chat: {previous_responses}

        User message: {user_question}

        (NO PREAMBLE)

        """

        prompt_template = PromptTemplate.from_template(template)
        history = user_history.get(chat_id, "")
        chain = prompt_template | self.llm
        res = chain.invoke(input={'user_question': message, 'answer': retriever, 'previous_responses': history})
        new_entry = f"user: {message}\nchatbot: {res.content}\n"
        user_history[chat_id] = history + new_entry
        return res.content
