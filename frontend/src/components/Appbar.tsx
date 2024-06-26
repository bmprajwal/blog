import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "./BlogCard";
import { FeatherIcon } from "./FeatherIcon";
import { MouseEventHandler, forwardRef, useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { userAtom, isUserLoggedInSelector } from "../store/atoms/user";

export const Appbar = () => {
	const isUserLoggedIn = useRecoilValue(isUserLoggedInSelector);
	const setUser = useSetRecoilState(userAtom);
	useEffect(() => {
		const userDetailsString = localStorage.getItem("user");
		if (userDetailsString) {
			const userDetails = JSON.parse(userDetailsString);
			setUser(userDetails);
		}
	}, [setUser]);

	return (
		<div className="border-b flex justify-between items-center px-4 md:px-10 py-3">
			<Link to={"/blogs"}>
				<div className="flex gap-2 items-center">
					<FeatherIcon />
					<div className="  tracking-wide text-xl cursor-pointer">
						Medium
					</div>
				</div>
			</Link>
			{isUserLoggedIn ? (
				<div className="flex items-center">
					<Link to={"/publish"} className=" flex items-center">
						<button
							type="button"
							className="  focus:outline-none  font-normal rounded-full text-sm text-gray-500 px-5 py-2 me-2 hover:text-gray-700"
						>
							<svg
								data-slot="icon"
								fill="none"
								strokeWidth="1.5"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
								aria-hidden="true"
								className=" inline-block w-6 h-6 me-1"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
								></path>
							</svg>
							Create
						</button>
					</Link>

					<ProfileBox />
				</div>
			) : (
				<Link
					to={"/signin"}
					className=" font-semibold text-gray-700 hover:text-gray-900 py-2"
				>
					Sign In
				</Link>
			)}
		</div>
	);
};

const ProfileBox = () => {
	const [user, setUser] = useRecoilState(userAtom);
	const navigate = useNavigate();
	const [show, setShow] = useState(false);
	const avatarRef = useRef<HTMLDivElement>(null);
	const profileitemRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (
				avatarRef.current &&
				!avatarRef.current.contains(e.target as Node) &&
				profileitemRef.current &&
				!profileitemRef.current.contains(e.target as Node)
			) {
				setShow(false);
			}
		};

		window.addEventListener("click", handleClickOutside);
		return () => {
			window.removeEventListener("click", handleClickOutside);
		};
	}, []);

	const logout = () => {
		localStorage.removeItem("jwt");
		localStorage.removeItem("user");
		setUser(null);
		navigate("/blogs");
	};

	return (
		<div className=" cursor-pointer">
			<div ref={avatarRef}>
				<Avatar
					size="big"
					name={user?.name || "Anonymous"}
					onClick={() => setShow(!show)}
				/>
			</div>
			{show && (
				<div className="absolute right-4 top-14 border rounded-sm bg-white shadow-md py-1 px-2  w-52">
					<ProfileBoxItem
						ref={profileitemRef}
						itemName={"Logout"}
						onClick={logout}
					/>
				</div>
			)}
		</div>
	);
};
interface ProfileBoxItemProps {
  itemName: string;
  onClick:MouseEventHandler<HTMLDivElement>
}
const ProfileBoxItem = forwardRef<HTMLDivElement, ProfileBoxItemProps>(({ itemName, onClick }, ref) => {
	return (
		<div
			ref={ref}
			className=" mx-4 text-base text-gray-500 hover:text-gray-800"
			onClick={onClick}
		>
			{itemName}
		</div>
	);
})
