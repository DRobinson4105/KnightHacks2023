import React from "react";
import { UserButton } from "@clerk/nextjs";

const page = () => {
	return (
		<div>
			<UserButton afterSignOutUrl="/" />
			<h1>Page</h1>
		</div>
	);
};

export default page;
