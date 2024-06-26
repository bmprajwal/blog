import { Link } from "react-router-dom";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.bubble.css";
import { getPlainTextFromHTML } from "../utils/string";
import { BlogMeta } from "./BlogMeta";
import { MouseEventHandler } from "react";

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
	const quillContent =
		getPlainTextFromHTML(content).split(" ").slice(0, 25).join(" ") + "...";
		

	return (
		<Link to={`/blog/${id}`} className="blog-card">
			<div className=" px-4 py-2 md:py-8 border my-2 mx-3 md:my-5 rounded-lg border-gray-200 ">
				<div>
					<BlogMeta
						type="card"
						authorName={authorName}
						publishedDate={publishedDate}
						content={content}
					/>
					<div className="text-xl md:text-2xl font-bold pt-2 title">
						{title}
					</div>
					<div className="pt-2 text-slate-700">
						<ReactQuill
							value={quillContent}
							readOnly={true}
							theme={"bubble"}
						/>
					</div>
				</div>
			</div>
		</Link>
	);
};

export function Avatar({
	name,
  onClick,
	size,
}: {
	name: string;
  onClick?: MouseEventHandler<HTMLDivElement>
	size?: "small" | "big";
}) {
	return (
		<div
			className={`relative inline-flex items-center justify-center ${
				size === "big" ? "w-8 h-8" : "w-6 h-6"
			} overflow-hidden bg-gray-500 rounded-full `}
      onClick={onClick}
		>
			<span className="font-light text-sm text-slate-100 ">
				{name[0]}
			</span>
		</div>
	);
}
