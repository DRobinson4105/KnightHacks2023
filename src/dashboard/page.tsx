"use client";

import React from "react";
import { AiFillFileText } from "react-icons/ai";
import axios from "axios";
import { UserButton } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const parse = (data: String) => {
	try {
		const responseString = data.toString()
		// const responseString = "Question: What is the main purpose of the lipid bilayer in the cell membrane?\nA. To provide a barrier between the components of the cell and the outside environment\nB. To act as a threshold for molecules to enter and exit the cell\nC. To define the cell and keep its components separate from outside cells or organisms\nD. To provide a structural component for the cell membrane to be composed of\nAnswer: C. To define the cell and keep its components separate from outside cells or organisms"
		if(!responseString) return;

		const response = responseString.toString().split("\n")
		if(response[5] == '')
        	response.splice(5, 1)

		var question = response[0].slice(10)
		var correctAnswer = response[5].slice(8,9).charCodeAt(0) - 'A'.charCodeAt(0).valueOf()
		var answers = []
		for(var i=1; i<5; i++){
			answers.push(response[i].slice(3))
		}
		
		return {
			"question": question,
			"answers": answers, 
			"correctAnswer": correctAnswer
		}
	} catch (err) {
		console.log(err)
		return {
			"question": "",
			"answers": [], 
			"correctAnswer": 0
		}
	}
}
	
const Page = () => {
	const [question, setQuestion] = useState("");
	const [answers, setAnswers] = useState<String[]>();
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
		event.preventDefault();

		let formData = new FormData();
		formData.append("file", file as Blob);

		formData.append("topic", topic);
		formData.append('prevQuestions', prevQuestions);
		const file2 = formData.get("file");
		const topic2 = formData.get("topic");

		try {
			console.log("??")
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
			setCorrectAnswer(question["correctAnswer"])
		} catch (err) {
			console.log(err);
		}
	};

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

			<h1>{question}</h1>
			{answers && answers.map(
				(answer, index) => <h1 key={index}>{answer}</h1>
			)}
		</div>
	);
};

export default Page;