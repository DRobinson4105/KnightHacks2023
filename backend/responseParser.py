def parse(response):
    response = response.split("\n")
    return {
        "question": response[1][10:],
        "answers": [response[i][3:] for i in range(2, 6)],
        "correctAnswer": ord(response[6][8:9]) - ord('A')
    }