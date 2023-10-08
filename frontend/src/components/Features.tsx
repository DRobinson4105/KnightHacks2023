import React from "react";
import { AiFillFileText } from "react-icons/ai";
import { LiaAtomSolid } from "react-icons/lia";
import { MdTouchApp } from "react-icons/md";

const Features = () => {
	return (
		<section className="py-20 bg-white tails-selected-element">
			<div className="container max-w-6xl mx-auto">
				<h2 className="text-4xl font-bold tracking-tight text-center">
					Features
				</h2>
				<p className="mt-2 text-lg text-center text-gray-600">
					Check out our list of awesome features below.
				</p>
				<div className="grid grid-cols-4 gap-8 mt-10 sm:grid-cols-8 lg:grid-cols-12 sm:px-8 xl:px-0">
					<div
						className="relative flex flex-col items-center justify-between col-span-4 px-8 py-12 space-y-4 overflow-hidden bg-gray-100 sm:rounded-xl"
						data-rounded="rounded-xl"
						data-rounded-max="rounded-full"
					>
						<div
							className="p-3 text-white bg-blue-500 rounded-full"
							data-primary="blue-500"
							data-rounded="rounded-full"
						>
							<AiFillFileText size={30} />
						</div>
						<h4 className="text-xl font-medium text-gray-700">PDFS</h4>
						<p className="text-base text-center text-gray-500">
							Upload PDFS of your notes and we&#39;ll handle the
							question-making.&nbsp;
						</p>
					</div>
					<div
						className="flex flex-col items-center justify-between col-span-4 px-8 py-12 space-y-4 bg-gray-100 sm:rounded-xl"
						data-rounded="rounded-xl"
						data-rounded-max="rounded-full"
					>
						<div
							className="p-3 text-white bg-blue-500 rounded-full"
							data-primary="blue-500"
							data-rounded="rounded-full"
						>
							<LiaAtomSolid size={30} />
						</div>
						<h4 className="text-xl font-medium text-gray-700">
							Artificial Intelligence
						</h4>
						<p className="text-base text-center text-gray-500">
							Have Chat OpenAI build custom questions tailored to your notes.
						</p>
					</div>
					<div
						className="flex flex-col items-center justify-between col-span-4 px-8 py-12 space-y-4 bg-gray-100 sm:rounded-xl"
						data-rounded="rounded-xl"
						data-rounded-max="rounded-full"
					>
						<div
							className="p-3 text-white bg-blue-500 rounded-full"
							data-primary="blue-500"
							data-rounded="rounded-full"
						>
							<MdTouchApp size={30} />
						</div>
						<h4 className="text-xl font-medium text-gray-700">Interactive</h4>
						<p className="text-base text-center text-gray-500">
							Interact with the questions live&nbsp; and get responsive
							feedback.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Features;
