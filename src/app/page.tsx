import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Footer from "@/components/Footer";

export default function Home() {
	return (
		<main className="min-w-screen min-h-screen bg-white">
			<Navbar />
			<Hero />
			<Features />
			<Footer />
		</main>
	);
}
