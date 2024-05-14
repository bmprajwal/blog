import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import { FullBlog } from "../components/FullBlog";
import { Appbar } from "../components/Appbar";

export function Blog() {
	const { id } = useParams();
	const { loading, blog } = useBlog(id || "");
	if (loading || !blog) {
		return <BlogSkeleton />;
	}
	return (
		<div>
			<FullBlog blog={blog} />
		</div>
	);
}

function BlogSkeleton() {
	return (
		<div>
			<Appbar />
			<div className="grid grid-cols-12 p-20">
				<div className=" col-span-8">
						<header className=" py-8">
							<div className="max-w-4xl  px-4">
								<div className="animate-pulse flex items-center space-x-4">
									
									<div>
										<div className="h-10 w-[50rem] bg-gray-400 rounded"></div>
										<div className="h-4 w-16 bg-gray-400 rounded mt-2"></div>
									</div>
								</div>
							</div>
						</header>
						<div className="max-w-4xl px-4 py-8">
							<div className="animate-pulse space-y-4">
								<div className="h-4 bg-gray-300 rounded w-2/3"></div>
								<div className="h-4 bg-gray-300 rounded"></div>
								<div className="h-4 bg-gray-300 rounded"></div>
								<div className="h-4 bg-gray-300 rounded w-1/2"></div>
								<div className="h-4 bg-gray-300 rounded"></div>
								<div className="h-4 bg-gray-300 rounded"></div>
								<div className="h-4 bg-gray-300 rounded w-3/4"></div>
							</div>

							<div className="animate-pulse space-y-4 mt-12">
								<div className="h-4 bg-gray-300 rounded w-2/3"></div>
								<div className="h-4 bg-gray-300 rounded"></div>
								<div className="h-4 bg-gray-300 rounded"></div>
								<div className="h-4 bg-gray-300 rounded w-1/2"></div>
								<div className="h-4 bg-gray-300 rounded"></div>
								<div className="h-4 bg-gray-300 rounded"></div>
							</div>
						
					</div>
				</div>
				<div className=" col-span-4 ">
					<div className="py-10 bg-white">
						<div className="animate-pulse flex space-x-4">
							<div className="rounded-full bg-gray-300 h-12 w-12"></div>
							<div className="flex-1 space-y-4 py-1">
								<div className="h-4 bg-gray-300 rounded w-3/4"></div>
								<div className="space-y-2">
									<div className="h-4 bg-gray-300 rounded"></div>
									<div className="h-4 bg-gray-300 rounded w-5/6"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
