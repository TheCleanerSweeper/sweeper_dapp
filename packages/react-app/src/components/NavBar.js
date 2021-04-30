import { Fragment } from "react";
import { Popover } from "@headlessui/react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../images/logo.svg";

const SweepButton = styled.button`
	color: white;
	background-color: blue;
  //   border: 1px solid rgba(230, 0, 122, 0.3);
    border-radius: 2rem;
  //   color: #e6007a;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
  //   background-color: transparent;
    padding: 0.4375rem 1.5rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.3125rem;

  //   box-shadow: 0 0 7px 1px rgba(230, 0, 122, 0.3) inset,
  //   2px 2px 12px 0 rgba(230, 0, 122, 0.25),
  //   -8px -8px 12px 0 rgba(0, 0, 0, 0.7);

    transition: all 0.2s ease-in-out;
    &: hover {
        // transform: scale(1.01);
        // position:relative;
        transform: translate(10px)
        box-shadow: 0.5px 0.5px 15px #e6007a;
        background-color: rgba(230, 0, 122, 0.6);
        color: black;
    }
`;

const NavBar = () => {
	return (
		<nav>
			<Popover className="relative bg-white">
				<>
					<div className="max-w-7xl mx-auto px-4 sm:px-6">
						<div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
							<div className="flex justify-start lg:w-0 lg:flex-1">
								<a href="/" className="flex">
									<span className="sr-only">Workflow</span>
									<img className="h-16 w-auto sm:h-16" src={logo} alt="" />
									<div className="w-auto flex items-center justify-center pl-4 text-3xl">
										SweeperDAO
									</div>
								</a>
							</div>
							<div className=" md:flex items-center justify-end md:flex-1 lg:w-0">
								<Link to={"/Sweep"}>
									<SweepButton className="bg-red">Sweep</SweepButton>
								</Link>
							</div>
						</div>
					</div>
				</>
			</Popover>
		</nav>
	);
};

export default NavBar;
