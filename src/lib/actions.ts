"use server";

import axios from "axios";
import prisma from "./prismaClient";
import {useRouter} from 'next/navigation'

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
	try {
		const responseString = data.toString()
		if (!responseString) return;

		const response = responseString.toString().split("\n")
		if (response[5] == '')
        	response.splice(5, 1)

		let question = response[0].slice(10)
		let correctAnswer = response[5].slice(8,9).charCodeAt(0) - 'A'.charCodeAt(0).valueOf()
		let answers = []
		for (let i = 1; i < 5; i++)
			answers.push(response[i].slice(3))

		return {
			"question": question,
			"answer": answers, 
			"correctAnswer": correctAnswer
		}
	} catch (err) {
		console.log(err)
	}
}
	