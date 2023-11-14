"use client";

import React from "react";
import { AiFillFileText } from "react-icons/ai";
import axios from "axios";
import { UserButton } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Int32 } from "mongodb";

const parse = (data: String) => {
	try {
		const responseString = data.toString()
		if (!responseString) return;

		const response = responseString.toString().split("\n")
		if (response[5] == '')
        	response.splice(5, 1)

		let question = response[0].slice(10)
		let correctAnswer = response[5].slice(8,9).charCodeAt(0) - 'A'.charCodeAt(0)
		let answers = []
		let explanations = []
		for (let i = 1; i < 9; i += 2) {
			while (response[i] === "") i++;
			answers.push(response[i].slice(3))
			explanations.push(response[i + 1])
		}

		return {
			"question": question,
			"answers": answers, 
			"explanations": explanations,
			"correctAnswer": correctAnswer
		}
	} catch (err) {
		// need error handling here
		console.log(err)
	}
}
	
const Page = () => {
	const [questionsLoaded, setQuestionsLoaded] = useState(false)
	const [answered, setAnswered] = useState(false)
	const [correct, setCorrect] = useState(false)
	const [isloading, setIsLoading] = useState(false)
	const [question, setQuestion] = useState("");
	const [answers, setAnswers] = useState<String[]>();
	const [explanations, setExplanations] = useState<String[]>();
	const [currentExplanation, setCurrentExplanation] = useState("");
	const [answerChoice, setAnswerChoice] = useState(0);
	const [correctAnswer, setCorrectAnswer] = useState(0);
	const [prevQuestions, setPrevQuestions] = useState("");
	const [topic, setTopic] = useState("");
	const [file, setFile] = useState<File>();

	const onChange = (event: React.FormEvent) => {
		const files = (event.target as HTMLInputElement).files;

		if (files && files.length > 0) {
			setFile(files[0]);
		}
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		setIsLoading(true)
		setCorrect(false)
		setCurrentExplanation("")
		event.preventDefault();

		let formData = new FormData();
		formData.append("file", file as Blob);

		formData.append("topic", topic);
		formData.append('prevQuestions', prevQuestions);
		const file2 = formData.get("file");
		const topic2 = formData.get("topic");

		try {
			const response = await axios.post(
				"http://127.0.0.1:5328/api/getQuestion",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);

			const question = parse(response.data)
			if (question == undefined) {
				throw new Error('Result is undefined')
			}
				
			setQuestion(question["question"]);
			setPrevQuestions(prevQuestions + "\n" + question["question"])
			setAnswers(question["answers"])
			setExplanations(question["explanations"])
			setCorrectAnswer(question["correctAnswer"])
			setQuestionsLoaded(true)
			setIsLoading(false)

		} catch (err) {
			// need error handling here
			console.log(err);
		}
	};
	const answerEval = () => {
		try {
			setAnswered(true)
			setCurrentExplanation(explanations?.at(answerChoice) as string)
			if(answerChoice === correctAnswer){
				setCorrect(true)
			}
		} catch(err){
			console.log("That is not a valid answer choice.")
		}
	}

	return (
		<div>
			<div className="flex justify-end">
				<h1>Dashboard</h1>
				<UserButton afterSignOutUrl="/" />
			</div>
			<div className="flex justify-center">
				<form onSubmit={handleSubmit}>
					<div className="flex flex-col w-96">
						<div className="flex flex-col mx-auto">
							<div className="border border-green-500 rounded-full w-28 h-28 ml-10 p-5">
								<AiFillFileText size={70} />
							</div>
							<h1>Enter your notes info here!</h1>
						</div>
						<Input
							type="text"
							name="topic"
							placeholder="Topic"
							value={topic}
							onChange={(e) => {
								setTopic(e.target.value);
							}}
						/>
						<Input
							type="file"
							name="file"
							placeholder="File"
							onChange={(e) => onChange(e)}
						/>
						<Button type="submit">Submit</Button>
						
					</div>
				</form>
			</div>
			{isloading && <div>Loading...</div>}
			{!isloading &&(
			<div className="Question flex flex-col justify-center">
			{question}
			<form>
				{answers && answers.map(
				(answer, index) => 
					<div className="Answer_Choices">
					<input 
					key={index} 
					type="radio"
					checked={answerChoice === index}
					onChange={() => setAnswerChoice(index)}
					/>{answer}
					</div>
				)}
				</form>
				<div className="flex">
				<Button onClick={answerEval}>Submit</Button>{answered && currentExplanation
						}
				</div>
				{questionsLoaded &&(
				<form onSubmit={handleSubmit}>
					<div className="flex flex-row space-between">
					
						
						<Button 
						type='submit'
						>
						Next
						</Button>
					</div>
					</form>
					
					)}
					
			</div>)
			}
			</div>
	);
};

export default Page;