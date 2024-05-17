import { Link } from "react-router-dom";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.bubble.css";
import { getPlainTextFromHTML } from "../utils/string";

export interface BlogCardProps {
	authorName: string;
	title: string;
	content: string;
	publishedDate: string;
	id: string;
}

export const BlogCard = ({
	id,
	authorName,
	title,
	content,
	publishedDate,
}: BlogCardProps) => {

  const quillContent = getPlainTextFromHTML(content).split(" ").slice(0, 40).join(" ") + "...";

	return (
		<Link to={`/blog/${id}`} className="blog-card">
			<div className=" px-4 py-8 border-b border-gray-200">
				<div> 
					<div className="flex ">
						<div>
							<Avatar name={authorName} />
						</div>
						<div className="text-gray-900 font-semibold px-2">
							{authorName}
						</div>
						<div className="flex justify-center items-center">
							<div className="w-0.5 h-0.5 bg-gray-500 rounded-full"></div>
						</div>
						<div className="pl-2  text-gray-500 font-semibold">
							{publishedDate}
						</div>
					</div>
					<div className="text-2xl font-bold pt-2">{title}</div>
					<div className="pt-2 text-slate-700">
						<ReactQuill
							value={quillContent}
							readOnly={true}
							theme={"bubble"}
						/>
					</div>
					<div className="text-sm text-slate-500 pt-5">
						{`${Math.ceil(content.length / 600)} min read`}
					</div>
				</div>
			</div>
		</Link>
	);
};

export function Avatar({
	name,
	size,
}: {
	name: string;
	size?: "small" | "big";
}) {
	return (
		<div
			className={`relative inline-flex items-center justify-center ${
				size === "big" ? "w-8 h-8" : "w-6 h-6"
			} overflow-hidden bg-slate-600 rounded-full `}
		>
			<span className="font-light text-sm text-slate-100 ">
				{name[0]}
			</span>
		</div>
	);
}
