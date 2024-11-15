import chromadb


def get_message_type(message):
    client = chromadb.PersistentClient(path='vectordb')
    collection = client.get_or_create_collection(name='category')
    retriever = collection.query(
        query_texts=[message],
        n_results=2
    )
    return retriever['documents'][0][0]
