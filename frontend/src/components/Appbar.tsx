import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"

export const Appbar = () => {
  return (
		<div className="border-b flex justify-between items-center px-4 md:px-10 py-3">
			<Link to={"/blogs"}>
				<div className="font-bold  tracking-wide text-xl cursor-pointer">
					<img src="/medium-wordmark-dark-100px.png" alt="Medium" className=" h-12"/>
				</div>
			</Link>
			<div>
				<Link to={"/publish"}>
					<button
						type="button"
						className="  text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2"
					>
						New
					</button>
				</Link>
				<Avatar size="big" name="Prajwal" />
			</div>
		</div>
  );
}