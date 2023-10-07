from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.text_splitter import CharacterTextSplitter
from langchain.vectorstores import Chroma
from langchain.llms import OpenAI
from langchain.chat_models import ChatOpenAI
from langchain.chains import RetrievalQA
from dotenv import load_dotenv
from pdfParser import pdfParse
from responseParser import parse

load_dotenv()

courseName = "biology"
pdfs = ["./notes1.pdf", "./notes2.pdf"]

# Set up text to be stored in vector database
textSplitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
textSplit = textSplitter.split_text(pdfParse(pdfs))

embeddings = OpenAIEmbeddings()

vectorStore = Chroma.from_texts(textSplit, embeddings)

questionAnswer = RetrievalQA.from_chain_type(
    llm=OpenAI(temperature=0),
    chain_type="stuff",
    retriever=vectorStore.as_retriever(search_kwargs={"k": 1})
)

query = """
Only using the context provided, give me 1 practice question
that review the content in the context with four possible answers 
and only one of them is correct. Use the format,
Question: (question)
A. (answer1)
B. (answer2)
C. (answer3)
D. (answer4)
Answer: (answer choice)
"""

result = questionAnswer.run(query)
print(parse(result))
print(result)