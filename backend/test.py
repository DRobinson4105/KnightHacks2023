from flask import Flask, request, jsonify
import PyPDF2

app = Flask(__name__)


# This is a test route


@app.route("/api/hello", methods=["GET"])
def hello_world():
    return "Hello World!"


# write a new route that takes in a name and returns "Hello <name>!"
@app.route("/api/name", methods=["POST"])
def hello_name():
    name = request.json["name"]
    return f"Hello {name}!"


@app.route("/api/action", methods=["POST"])
def pdf():
    try:
        file = request.files["file"]
        # Check if the file is a PDF
        if file.content_type != "application/pdf":
            return (
                jsonify({"error": "Invalid file format. Please upload a PDF file."}),
                400,
            )

        pdf_reader = PyPDF2.PdfReader(file)

        # Extract text from PDF
        text = ""
        for page_num in range(len(pdf_reader.pages)):
            page = pdf_reader.pages[page_num]
            text += page.extract_text()

        return jsonify({"text": text}), 200
    except Exception as e:
        print(str(e))
        return jsonify({"error": "Error parsing PDF"}), 500


if __name__ == "__main__":
    app.run(port=5328)
