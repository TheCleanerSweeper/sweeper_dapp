import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";

/* This example requires Tailwind CSS v2.0+ */
export default function Burn() {
	return (
		<div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200 justify-center text-center text-3xl">
			<div className="px-4 py-5 sm:px-6">
				{/* Content goes here */}
				{/* We use less vertical padding on card headers on desktop than on body sections */}
				🔥 Burn Tokens 🔥
			</div>
			<div className="px-4 py-5 sm:p-6 h-auto h-60">
				<Dropdown />
			</div>
		</div>
	);
}

/* This example requires Tailwind CSS v2.0+ */

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export function Dropdown() {
	return (
		<Menu as="div" className="relative inline-block text-center z-10">
			{({ open }) => (
				<>
					<div>
						<Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
							Select Token
							<ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
						</Menu.Button>
					</div>

					<Transition
						show={open}
						as={Fragment}
						enter="transition ease-out duration-100"
						enterFrom="transform opacity-0 scale-95"
						enterTo="transform opacity-100 scale-100"
						leave="transition ease-in duration-75"
						leaveFrom="transform opacity-100 scale-100"
						leaveTo="transform opacity-0 scale-95"
					>
						<Menu.Items
							static
							className="origin-top-right relative right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-20"
						>
							<div className="py-1">
								<Menu.Item>
									{({ active }) => (
										<a
											href="#"
											className={classNames(
												active ? "bg-gray-100 text-gray-900" : "text-gray-700",
												"block px-4 py-2 text-sm"
											)}
										>
											Safemoon
										</a>
									)}
								</Menu.Item>
								<Menu.Item>
									{({ active }) => (
										<a
											href="#"
											className={classNames(
												active ? "bg-gray-100 text-gray-900" : "text-gray-700",
												"block px-4 py-2 text-sm"
											)}
										>
											Cumrocket
										</a>
									)}
								</Menu.Item>
								<Menu.Item>
									{({ active }) => (
										<a
											href="#"
											className={classNames(
												active ? "bg-gray-100 text-gray-900" : "text-gray-700",
												"block px-4 py-2 text-sm"
											)}
										>
											Cosmos
										</a>
									)}
								</Menu.Item>
								<form method="POST" action="#">
									<Menu.Item>
										{({ active }) => (
											<button
												type="submit"
												className={classNames(
													active ? "bg-gray-100 text-gray-900" : "text-gray-700",
													"block w-full text-left px-4 py-2 text-sm"
												)}
											>
												Sign out
											</button>
										)}
									</Menu.Item>
								</form>
							</div>
						</Menu.Items>
					</Transition>
				</>
			)}
		</Menu>
	);
}
