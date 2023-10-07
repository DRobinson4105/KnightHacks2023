"use client";

import React from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";

const Page = () => {
	const { isLoaded, user, isSignedIn } = useUser();
	if (!isLoaded) {
		return <div>Loading...</div>;
	}
	if (!isSignedIn) {
		return <div>Access denied</div>;
	}

	return (
		<div className="flex flex-col">
			<UserButton afterSignOutUrl="/" />
			<div>This is the dashboard for {user.firstName}</div>
		</div>
	);
};

export default Page;
