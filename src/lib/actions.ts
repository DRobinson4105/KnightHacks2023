"use server";

import axios from "axios";
import prisma from "./prismaClient";
import {useRouter} from 'next/navigation'
// const reader = new FileReader();

export const sendFormData = async (data: FormData) => {
		const files = data.getAll("file");
		data.append("prevQuestions", "");

		if (!files) return;

		try {
			const form = await axios.post("http://127.0.0.1:5328/api/getQuestion", data);
			
			const result = await parse(form.data)

			await prisma.question.create({
				data: {
					question: result?.question,
					answer: result?.answer,
					correctAnswer: result?.correctAnswer,
				},
			})

			const router = useRouter()
			router.refresh()
			return result
		} catch (err) {
			console.log(err);
		}
};

export const parse = async (data: String) => {
	try{
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
		let res = {
			"question": question,
			"answer": answers, 
			"correctAnswer": correctAnswer
		}
		
		return res
	} catch (err) {
		console.log(err)
	}
	
	
}
	