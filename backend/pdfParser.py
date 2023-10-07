from langchain.document_loaders import PyPDFLoader

def parse(pdfFilePaths):
    loaders = [PyPDFLoader(filePath) for filePath in pdfFilePaths]
    documents = [loader.load_and_split() for loader in loaders]

    return ' '.join([' '.join([page.page_content for page in document]) for document in documents])