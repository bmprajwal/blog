import { Avatar } from "./BlogCard";

interface BlogMetaProps {
	authorName: string;
	content: string;
	publishedDate: string;
  type?: "card"
}
export const BlogMeta = ({authorName, publishedDate, content, type}:BlogMetaProps) => {
  return (
		<div className={`flex ${type === "card"? "justify-between": "justify-start"} items-center gap-3`}>
			<div className="flex items-center">
				<div>
					<Avatar name={authorName} size="big" />
				</div>
				<div>
					<div className="text-gray-900 font-semibold px-2 text-sm">
						{authorName}
					</div>
					<div className="pl-2  text-gray-500 text-xs">
						{publishedDate}
					</div>
				</div>
			</div>
			<div className="text-sm text-slate-500 ">
				{`${Math.ceil(content.length / 600)} min read`}
			</div>
		</div>
  );
}