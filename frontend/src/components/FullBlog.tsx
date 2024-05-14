import { Blog } from "../hooks";
import { Appbar } from "./Appbar";
import { Avatar,} from "./BlogCard";

export const FullBlog = ({blog}: {blog: Blog}) => {
	return (
		<div>
			<Appbar />
			<div className="grid grid-cols-12 p-20 gap-2">
				<div className="col-span-8 ">
					<div className=" font-extrabold text-5xl">
						{blog.title}
					</div>
					<div className="text-xl  text-gray-400 pt-3">
						Posted on Apr 14, 2024
					</div>
					<div className="text-xl whitespace-pre-wrap text-gray-700 pt-6">
						{blog.content}
					</div>
				</div>
				<div className="col-span-4">
					<div className="font-medium text-gray-800 text-xl">
						Author
					</div>
					<div className="flex items-center gap-5 py-5">
						<div>
							<Avatar name={blog.author.name} size="big" />
						</div>
						<div>
							<div className=" text-3xl font-bold text-gray-800">
								{blog.author.name || "Anonymous"}
							</div>
							<div className=" text-xl font-medium text-gray-500 pt-2">
								{blog.author.email}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
