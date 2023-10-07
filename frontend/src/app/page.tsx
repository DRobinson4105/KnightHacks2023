import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ThemeToggle";
import axios from "axios";

export default function Home() {
	const sendHi = async () => {
		"use server";
		try {
			const res = await axios.get("http://127.0.0.1:5328/api/hello");
			console.log(res.data);
		} catch (err) {
			console.log("bad");
		}
	};

	const sendHiName = async () => {
		"use server";
		try {
			const name = "David"; // Replace with the actual name
			const res = await axios.post("http://127.0.0.1:5328/api/name", { name });
			console.log(res.data);
		} catch (err) {
			console.log(err);
		}
	};

	const sendFormData = async (data: FormData) => {
		"use server";
		// console.log(data.has("name"));
		// const name = data.get("name");
		const file = data.get("file");
		console.log(file);
		try {
			const res = await axios.post("http://127.0.0.1:5328/api/action", file, {
				headers: {
					"Content-Type": "application/pdf",
				},
			});
			console.log(res.data);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<main className="">
			<ModeToggle />
			<div className="grid w-full max-w-sm items-center gap-1.5">
				<form action={sendHi}>
					<h1>Hello World! Form</h1>
					<Label htmlFor="picture">Picture</Label>
					<Input id="picture" type="file" />
					<Button type="submit">Send</Button>
				</form>
				<form action={sendHiName}>
					<h1>Hello Name! Form</h1>
					<Label htmlFor="picture">Picture</Label>
					<Input id="picture" type="file" />
					<Button type="submit">Send</Button>
				</form>
				<form action={sendFormData} encType="multipart/form-data">
					<h1>Get PDF Form THINGY</h1>
					<Input name="name" type="text" required />
					<Label htmlFor="class">Class</Label>
					<Input name="file" type="file" multiple />
					<Button type="submit">Send</Button>
				</form>
			</div>
		</main>
	);
}
