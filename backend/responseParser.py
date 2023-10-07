def parse(response):
    response = response.split("\n")
    
    if response[5] == '':
        response.pop(5)
        
    return {
        "question": response[0][10:],
        "answers": [response[i][3:] for i in range(1, 5)],
        "correctAnswer": ord(response[5][8:9]) - ord('A')
    }