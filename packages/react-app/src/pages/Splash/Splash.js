import React from "react";
import logolight from "../../images/logo-light.svg";

import {
	AnnotationIcon,
	GlobeAltIcon,
	LightningBoltIcon,
	ScaleIcon,
} from "@heroicons/react/outline";

export function Hero() {
	return (
		<div className="relative bg-indigo-800 py-40 bg-fixed">
			<div className="absolute inset-0">
				<img
					className="w-full h-full object-cover blur-sm filter bg-fixed"
					src="https://images.unsplash.com/photo-1572123979839-3749e9973aba?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1934&q=80"
					alt=""
				/>
				<div
					className="absolute inset-0 bg-indigo-800 "
					style={{ mixBlendMode: "multiply" }}
					aria-hidden="true"
				/>
			</div>
			<div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
				<h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
					Sweeping Up Rug Pulls
				</h1>
				<p className="mt-6 text-xl text-indigo-100 max-w-3xl">
					Got rugged? SweeperDAO is here to clean up. Burn your rug pulled
					tokens for $SWEEP.
				</p>
				<p className="mt-6 text-xl text-indigo-100 max-w-3xl">
					Give me your shitcoins, your rugs, your moonbois yearning for takeoff.
				</p>
			</div>
		</div>
	);
}

const features = [
	{
		name: "Burn Rug Pulled Tokens",
		description:
			"SweeperDAO will burn tokens that have been rugged pull and mint new $SWEEP tokens in return.",
		icon: GlobeAltIcon,
	},
	{
		name: "Airdrop",
		description:
			"Over 50% of the initial token supply will be airdropped to wallets that have been affected by a rug pull.",
		icon: ScaleIcon,
	},
	{
		name: "Deflationary",
		description:
			"SweeperDAO will mint new tokens while burning shitcoins, to avoid a ever increasing supply there is a burning mechanesim. The mechanism is designed to either mint or burn tokens depending on useage of the token. If the token is being used heavily, users will need to burn a small portion of the tokens in order to complete the transaction.",
		icon: LightningBoltIcon,
	},
	{
		name: "Vote on New Tokens",
		description:
			"By holding $SWEEP, you can vote for the next rug pull the SweeperDAO should burn.",
		icon: AnnotationIcon,
	},
	{
		name: "Owned and Goverened by the Community",
		description:
			"The token holders have complete control over the protocol and the treasury. The community can vote to decrease the burn rate, to burn a new token or to use the funds allocated to the treasury.",
		icon: GlobeAltIcon,
	},
	{
		name: "Treasury",
		description:
			"Close to 40% of the initial token supply will be sent to the treasury to be used by the community.",
		icon: GlobeAltIcon,
	},
];

export function Features() {
	return (
		<div className="py-12 bg-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="lg:text-center">
					<h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
						Sweeping
					</h2>
					<p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
						A better way to protect against scam tokens
					</p>
					<p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
						SweeperDAO is community owned and governed. $SWEEP holders vote on
						which tokens can be burned.
					</p>
				</div>

				<div className="mt-10">
					<dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
						{features.map((feature) => (
							<div key={feature.name} className="relative">
								<dt>
									<div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
										<feature.icon className="h-6 w-6" aria-hidden="true" />
									</div>
									<p className="ml-16 text-lg leading-6 font-medium text-gray-900">
										{feature.name}
									</p>
								</dt>
								<dd className="mt-2 ml-16 text-base text-gray-500">
									{feature.description}
								</dd>
							</div>
						))}
					</dl>
				</div>
			</div>
		</div>
	);
}

export function CTA() {
	return (
		<div className="relative py-16">
			<div
				className="hidden absolute top-0 inset-x-0 h-1/2 bg-gray-50 lg:block"
				aria-hidden="true"
			/>
			<div className="max-w-7xl mx-auto bg-indigo-600 lg:bg-transparent lg:px-8">
				<div className="lg:grid lg:grid-cols-12">
					<div className="relative z-10 lg:col-start-1 lg:row-start-1 lg:col-span-4 lg:py-16 lg:bg-transparent">
						<div
							className="absolute inset-x-0 h-1/2 bg-gray-50 lg:hidden"
							aria-hidden="true"
						/>
						<div className="max-w-md mx-auto px-4 sm:max-w-3xl sm:px-6 lg:max-w-none lg:p-0">
							<div className="aspect-w-10 aspect-h-6 sm:aspect-w-2 sm:aspect-h-1 lg:aspect-w-1">
								{/* <img
                  className="object-cover object-center rounded-3xl shadow-2xl"
                  src="https://images.unsplash.com/photo-1507207611509-ec012433ff52?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=934&q=80"
                  alt=""
                /> */}
							</div>
						</div>
					</div>

					<div className="relative bg-indigo-600 lg:col-start-3 lg:row-start-1 lg:col-span-10 lg:rounded-3xl lg:grid lg:grid-cols-10 lg:items-center">
						<div
							className="hidden absolute inset-0 overflow-hidden rounded-3xl lg:block"
							aria-hidden="true"
						>
							<svg
								className="absolute bottom-full left-full transform translate-y-1/3 -translate-x-2/3 xl:bottom-auto xl:top-0 xl:translate-y-0"
								width={404}
								height={384}
								fill="none"
								viewBox="0 0 404 384"
								aria-hidden="true"
							>
								<defs>
									<pattern
										id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d"
										x={0}
										y={0}
										width={20}
										height={20}
										patternUnits="userSpaceOnUse"
									>
										<rect
											x={0}
											y={0}
											width={4}
											height={4}
											className="text-indigo-500"
											fill="currentColor"
										/>
									</pattern>
								</defs>
								<rect
									width={404}
									height={384}
									fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)"
								/>
							</svg>
							<svg
								className="absolute top-full transform -translate-y-1/3 -translate-x-1/3 xl:-translate-y-1/2"
								width={404}
								height={384}
								fill="none"
								viewBox="0 0 404 384"
								aria-hidden="true"
							>
								<defs>
									<pattern
										id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d"
										x={0}
										y={0}
										width={20}
										height={20}
										patternUnits="userSpaceOnUse"
									>
										<rect
											x={0}
											y={0}
											width={4}
											height={4}
											className="text-indigo-500"
											fill="currentColor"
										/>
									</pattern>
								</defs>
								<rect
									width={404}
									height={384}
									fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)"
								/>
							</svg>
						</div>
						<div className="relative max-w-md mx-auto py-12 px-4 space-y-6 sm:max-w-3xl sm:py-16 sm:px-6 lg:max-w-none lg:p-0 lg:col-start-4 lg:col-span-6">
							<h2
								className="text-3xl font-extrabold text-white"
								id="join-heading"
							>
								Join the Sweeper DAO
							</h2>
							<p className="text-lg text-white">
								Varius facilisi mauris sed sit. Non sed et duis dui leo,
								vulputate id malesuada non. Cras aliquet purus dui laoreet diam
								sed lacus, fames.
							</p>
							<a
								className="block w-full py-3 px-5 text-center bg-white border border-transparent rounded-md shadow-md text-base font-medium text-indigo-700 hover:bg-gray-50 sm:inline-block sm:w-auto"
								href="/"
							>
								Explore opportunities
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export function Quote() {
	return (
		<div className="bg-white pt-16 lg:py-24">
			<div className="pb-16 bg-indigo-600 lg:pb-0 lg:z-10 lg:relative">
				<div className="lg:mx-auto lg:max-w-8xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-8">
					<div className="relative lg:-my-8">
						<div
							aria-hidden="true"
							className="absolute inset-x-0 top-0 h-1/2 bg-white lg:hidden"
						/>
						{/* <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:p-0 lg:h-full"> */}
						{/* <div className="aspect-w-10 aspect-h-6 rounded-xl  overflow-hidden sm:aspect-w-16 sm:aspect-h-7 lg:aspect-none lg:h-full"> */}
						<img
							className="object-cover lg:h-full lg:w-full"
							src={logolight}
							alt=""
						/>
						{/* </div> */}
						{/* </div> */}
					</div>
					<div className="mt-12 lg:m-0 lg:col-span-2 lg:pl-8">
						<div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:px-0 lg:py-20 lg:max-w-none">
							<blockquote>
								<div>
									<svg
										className="h-12 w-12 text-white opacity-25"
										fill="currentColor"
										viewBox="0 0 32 32"
										aria-hidden="true"
									>
										<path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
									</svg>
									<p className="mt-6 text-2xl font-medium text-white">
										Blockchain are riddled with shitcoins and rug pulls. Many
										people who first enter the blockchain space want to make a
										quick return and end up entering into tokens, that they may
										believe to be good because of the marketing. Many of these
										tokens are scams and the creators end up withdrawing all
										liquidity from the market leaving the newcomers holding the
										bag. SweeperDAO is meant to help bring value to these tokens
										by burning them in return for $SWEEP tokens. SweeperDAO will
										end up cleaning the blockchains it is present on.
									</p>
								</div>
								<footer className="mt-6">
									<p className="text-base font-medium text-white">
										The Cleaner Sweeper
									</p>
									<p className="text-base font-medium text-indigo-100">
										Chief Cleansing Officer
									</p>
								</footer>
							</blockquote>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default function Splash(props) {
	return (
		<div className="">
			<Hero />

			<Features />

			<Quote />

			<CTA />
		</div>
	);
}
