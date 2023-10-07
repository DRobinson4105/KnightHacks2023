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
