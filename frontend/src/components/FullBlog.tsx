import { Blog } from "../hooks";
import { Appbar } from "./Appbar";
import { Avatar,} from "./BlogCard";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

export const FullBlog = ({blog}: {blog: Blog}) => {
	return (
		<div>
			<Appbar />
			<div className="grid grid-cols-12 p-5 md:p-20 gap-2">
				<div className=" col-span-12 md:col-span-8">
					<div className=" font-extrabold text-3xl md:text-5xl text-gray-800">
						{blog.title}
					</div>
					<div className="block md:hidden mt-4">
						<div className="flex items-center gap-5 py-2">
							<div>
								<Avatar name={blog.author.name} size="big" />
							</div>
							<div>
								<div className=" text-xl font-bold text-gray-800">
									{blog.author.name || "Anonymous"}
								</div>
								<div className=" text-md font-medium text-gray-500">
									{blog.author.email}
								</div>
							</div>
						</div>
					</div>
					<div className="text-xl  text-gray-400 pt-3">
						Posted on Apr 14, 2024
					</div>
          <div className=" text-gray-700 pt-6">

						<ReactQuill
							value={blog.content}
							readOnly={true}
							theme={"bubble"}
						/>
          </div>
				</div>
				<div className="col-span-4 hidden md:block">
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
