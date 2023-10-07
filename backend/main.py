from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.text_splitter import CharacterTextSplitter
from langchain.vectorstores import Chroma
from langchain.llms import OpenAI
from langchain.chains import RetrievalQA
from dotenv import load_dotenv
from pdfParser import parse

load_dotenv()

courseName = "biology"
pdfs = ["./notes1.pdf", "./notes2.pdf"]

# Set up text to be stored in vector database
textSplitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
textSplit = textSplitter.split_text(parse(pdfs))

embeddings = OpenAIEmbeddings()

vectorStore = Chroma.from_texts(textSplit, embeddings)

questionAnswer = RetrievalQA.from_chain_type(
    llm=OpenAI(),
    chain_type="stuff",
    retriever=vectorStore.as_retriever(search_kwargs={"k": 1})
)

query = """
Only using the context provided, what is the function of the cell membrane? 
If you can't answer the question only using the contexts provided, then respond with I don't know
"""

print(questionAnswer.run(query))