import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { sendHi, sendHiName, sendFormData } from "@/lib/actions";
import Link from "next/link";

export default function Home() {
	return (
		<main className="">
			<div className="flex">
				<Link href="/sign-up">
					<Button>Register</Button>
				</Link>
				<Link href="/sign-in">
					<Button>Sign in</Button>
				</Link>
			</div>

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
				<form action={sendFormData}>
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
