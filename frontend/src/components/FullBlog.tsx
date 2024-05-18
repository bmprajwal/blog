import { Blog } from "../hooks";
import { Appbar } from "./Appbar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { BlogMeta } from "./BlogMeta";

export const FullBlog = ({blog}: {blog: Blog}) => {
	return (
		<div>
			<Appbar />
			<div className="grid grid-cols-12 p-5 md:p-20 gap-2">
				<div className=" col-span-12 md:col-span-8">
					<div className=" font-extrabold text-3xl md:text-5xl text-gray-800 title">
						{blog.title}
					</div>
          <div className=" mt-5 px-6">

					<BlogMeta authorName={blog.author.name} content={blog.content} publishedDate="18 May, 2024" />
          </div>
          <div className=" text-gray-700 pt-4">

						<ReactQuill
							value={blog.content}
							readOnly={true}
							theme={"bubble"}
						/>
          </div>
				</div>
				
			</div>
		</div>
	);
};
