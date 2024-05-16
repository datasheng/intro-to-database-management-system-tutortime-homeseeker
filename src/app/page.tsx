export default function Home() {
	return (
		<div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8 bg-white p-10 rounded-lg shadow-lg">
				<h1 className="font-bold text-2xl text-center text-blue-900">
					Welcome to <br /> TutorTime + HomeSeeker.
				</h1>
				<h3 className="mt-2 text-lg text-center text-gray-900">
					To get started, first choose between the offered services.
				</h3>
				<p className="mt-4 text-md text-center text-gray-900">
					Want to sell/rent your home? Are you interested in buying property?
					Select <span className="font-semibold text-blue-900">HomeSeeker</span>
				</p>
				<p className="text-md text-center npx biome check --apply-unsafe srctext-gray-900">
					Need a tutor? Interested in becoming one? Select{" "}
					<span className="font-semibold text-blue-900">TutorTime</span>
				</p>
			</div>
		</div>
	);
}
