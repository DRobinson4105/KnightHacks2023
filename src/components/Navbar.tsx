import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Navbar = () => {
	return (
		<div className="container flex flex-col flex-wrap items-center justify-between py-5 mx-auto md:flex-row max-w-7xl tails-selected-element">
			<div className="relative flex flex-col md:flex-row">
				<Link
					href="/"
					className="flex items-center mb-5 font-medium text-gray-900 lg:w-auto lg:items-center lg:justify-center md:mb-0"
				>
					<span className="mx-auto text-xl font-black leading-none text-gray-900 select-none">
						TestifAI
						<span className="text-indigo-600" data-primary="indigo-600">
							.
						</span>
					</span>
				</Link>
				<nav className="flex flex-wrap items-center mb-5 text-base md:mb-0 md:pl-8 md:ml-8 md:border-l md:border-gray-200">
					<a
						href="#features"
						className="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900"
					>
						Features
					</a>
					<a
						href="#pricing"
						className="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900"
					>
						Pricing
					</a>
				</nav>
			</div>
			<div className="inline-flex items-center ml-5 space-x-6 lg:justify-end">
				<Link
					href="/sign-in"
					className="text-base font-medium leading-6 text-gray-600 whitespace-no-wrap transition duration-150 ease-in-out hover:text-gray-900"
				>
					Sign In
				</Link>
				<Link
					href="/sign-up"
					className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
					data-rounded="rounded-md"
					data-primary="indigo-600"
				>
					Sign Up
				</Link>
			</div>
		</div>
	);
};

export default Navbar;
