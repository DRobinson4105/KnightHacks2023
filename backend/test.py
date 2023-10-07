from flask import Flask, request

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
    file = request.json["file"]
    print(file)
    return file


if __name__ == "__main__":
    app.run(port=5328)
