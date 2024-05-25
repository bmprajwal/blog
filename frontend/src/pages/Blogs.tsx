import { useRecoilValueLoadable } from "recoil";
import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { Blog } from "../hooks";
import { blogsAtom } from "../store/atoms/blogs";

export const Blogs = () => {
	const blogs = useRecoilValueLoadable(blogsAtom);
	
	if (blogs.state === "loading") {
		return <BlogsSkeleton />;
	} else if (blogs.state === "hasValue") {
		return (
			<div>
				<Appbar />
				<div className="flex justify-center">
					<div className="max-w-3xl">
						{blogs.contents.map((blog: Blog) => (
							
							<BlogCard
								key={blog.id}
								id={blog.id}
								authorName={blog.author.name || "Anonymous"}
								title={blog.title}
								content={blog.content}
								publishedDate={blog.publishedDate}
							/>
						))}
					</div>
				</div>
			</div>
		);
	}
};

function BlogsSkeleton() {
	return (
		<div>
			<Appbar />
			<div className="flex justify-center">
				<div className=" w-full max-w-2xl">
					<div className="py-4 w-full animate-pulse border-b">
						<div className="flex p-4 space-x-4 sm:px-8">
							<div className="flex-shrink-0 w-16 h-16 rounded-full bg-gray-300"></div>
							<div className="flex-1 py-2 space-y-4">
								<div className="w-full h-3 rounded bg-gray-300"></div>
								<div className="w-5/6 h-3 rounded bg-gray-300"></div>
							</div>
						</div>
						<div className="p-4 space-y-4 sm:px-8">
							<div className="w-full h-4 rounded bg-gray-300"></div>
							<div className="w-full h-4 rounded bg-gray-300"></div>
							<div className="w-3/4 h-4 rounded bg-gray-300"></div>
						</div>
					</div>
					<div className="py-4 w-full animate-pulse border-b">
						<div className="flex p-4 space-x-4 sm:px-8">
							<div className="flex-shrink-0 w-16 h-16 rounded-full bg-gray-300"></div>
							<div className="flex-1 py-2 space-y-4">
								<div className="w-full h-3 rounded bg-gray-300"></div>
								<div className="w-5/6 h-3 rounded bg-gray-300"></div>
							</div>
						</div>
						<div className="p-4 space-y-4 sm:px-8">
							<div className="w-full h-4 rounded bg-gray-300"></div>
							<div className="w-full h-4 rounded bg-gray-300"></div>
							<div className="w-3/4 h-4 rounded bg-gray-300"></div>
						</div>
					</div>
					<div className="py-4 w-full animate-pulse border-b">
						<div className="flex p-4 space-x-4 sm:px-8">
							<div className="flex-shrink-0 w-16 h-16 rounded-full bg-gray-300"></div>
							<div className="flex-1 py-2 space-y-4">
								<div className="w-full h-3 rounded bg-gray-300"></div>
								<div className="w-5/6 h-3 rounded bg-gray-300"></div>
							</div>
						</div>
						<div className="p-4 space-y-4 sm:px-8">
							<div className="w-full h-4 rounded bg-gray-300"></div>
							<div className="w-full h-4 rounded bg-gray-300"></div>
							<div className="w-3/4 h-4 rounded bg-gray-300"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
