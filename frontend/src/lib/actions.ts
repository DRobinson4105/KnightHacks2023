"use server";

import axios from "axios";

export const parsePDF = async () => {};

export const sendHi = async () => {
	try {
		const res = await axios.get("http://127.0.0.1:5328/api/hello");
		console.log(res.data);
	} catch (err) {
		console.log("bad");
	}
};

export const sendHiName = async () => {
	try {
		const name = "David"; // Replace with the actual name
		const res = await axios.post("http://127.0.0.1:5328/api/name", { name });
		console.log(res.data);
	} catch (err) {
		console.log(err);
	}
};

export const sendFormData = async (data: FormData) => {
	const file = data.get("file");
	if (!file) return;

	try {
		const res = await axios.post("http://127.0.0.1:5328/api/action", data);
		console.log(res.data);
	} catch (err) {
		console.log(err);
	}
};

export const parse = async (data: FormData) => {
	try{
		const responseString = data.get('name');
		// const responseString = "Question: What is the main purpose of the lipid bilayer in the cell membrane?\nA. To provide a barrier between the components of the cell and the outside environment\nB. To act as a threshold for molecules to enter and exit the cell\nC. To define the cell and keep its components separate from outside cells or organisms\nD. To provide a structural component for the cell membrane to be composed of\nAnswer: C. To define the cell and keep its components separate from outside cells or organisms"
		if(!responseString) return;

		const response = responseString.toString().split("\\n")
		
		if(response[5] == ''){
        response.splice(5, 1)
		}
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
