import langchain
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.text_splitter import CharacterTextSplitter
from langchain.vectorstores import Chroma
from langchain.chat_models import ChatOpenAI
from langchain.chains import RetrievalQA
from langchain.cache import InMemoryCache
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
import PyPDF2
import os
from waitress import serve

# init
app = Flask(__name__)
CORS(app)
langchain.llm_cache = InMemoryCache()
load_dotenv()

@app.route("/api/getQuestion", methods=["POST"])
def generateQuestion():
    topic = request.form.get("topic")
    prevQuestions = request.form.get("prevQuestions")

    try:
        notes = ""
        files = [request.files.get("file")]
        for file in files:
            if file.content_type != "application/pdf":
                return (
                    jsonify({"error": "Invalid file format. Please upload a PDF file."}),
                    400,
                )

            pdf_reader = PyPDF2.PdfReader(file)

            # extract text from each page of pdf
            text = ""
            for page in pdf_reader.pages:
                text += page.extract_text() + ' '

            notes += text + ' '

    except Exception as e:
        return jsonify({"error": "Error parsing PDF"}), 500

    # split text into chunks and store in vector db
    textSplitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
    textSplit = textSplitter.split_text(notes)
    vectorStore = Chroma.from_texts(textSplit, OpenAIEmbeddings())

    # setup stuff chain to generate questions
    generator = RetrievalQA.from_chain_type(
        llm=ChatOpenAI(temperature=0, model_name="gpt-4-1106-preview"),
        chain_type="stuff",
        retriever=vectorStore.as_retriever(search_kwargs={"k": 1})
    )

    prompt = f"""
    Only using the context provided, give me 1 descriptive practice question that reviews the content in the
    context related to the topic, {topic}, with four descriptive possible answers and only one of them is
    correct and don't let any of the other answer choices be true. The wrong answer choices should be similar to the correct answer choice while still being wrongDescriptively explain why each wrong answer choice is wrong and don't include any periods at the
    end of the sentences (If the answer is correct, just say "Correct"). Don't include new lines
    between answer choices. Don't include any periods at the end of any sentence, including all of
    the explanations for why an answer is incorrect. Strictly follow the format,
    Question: (question)
    A. (answer1)
    Incorrect because
    B. (answer2)
    Incorrect because
    C. (answer3)
    Incorrect because
    D. (answer4)
    Incorrect because
    Answer: (answer choice)

    Don't use any of these questions:
    {prevQuestions}
    """

    res = generator.run(prompt)
    return res

if __name__ == "__main__":
    serve(app, host="127.0.0.1", port=os.environ["FLASK_PORT"])
    