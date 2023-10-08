export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className="flex justify-center items-center">{children}</body>
		</html>
	);
}
