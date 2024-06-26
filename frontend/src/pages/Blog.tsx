import { useNavigate, useParams } from "react-router-dom";
import { FullBlog } from "../components/FullBlog";
import { Appbar } from "../components/Appbar";
import { useEffect } from "react";
import { useRecoilValueLoadable } from "recoil";
import { blogsAtomFamily } from "../store/atoms/blogs";

export function Blog() {
	const { id } = useParams();
	const blogLoadable = useRecoilValueLoadable(blogsAtomFamily(id || ""));
	const navigate = useNavigate();

	useEffect(() => {
		const user = localStorage.getItem("jwt");
		if (!user) {
			navigate("/signin");
		}
	}, []);

	if (blogLoadable.state === "loading") {
		return <BlogSkeleton />;
	} else if (blogLoadable.state === "hasValue") {
		
		return (
			<div>
				<FullBlog blog={blogLoadable.contents.blog} />
			</div>
		);
	}
}



function BlogSkeleton() {
	return (
		<div>
			<Appbar />
			<div className="flex justify-center items-center p-8 md:p-15">
				<div className=" max-w-4xl w-full flex items-center justify-center">
					<div className=" w-full">
						<header className=" md:p-2 md:py-8">
							<div className="max-w-4xl ">
								<div className="animate-pulse flex items-center space-x-4">
									<div className="  max-w-4xl w-full">
										<div className="h-8 w-full bg-gray-400 rounded"></div>
										<div className="h-4 w-16 bg-gray-400 rounded mt-2"></div>
									</div>
								</div>
							</div>
							<div className="animate-pulse max-w-2xl flex space-x-4">
								<div className="flex-1 space-y-4 py-1">
									<div className="space-y-2 mt-4">
										<div className="h-4 bg-gray-300 rounded w-5/6"></div>
										<div className="h-4 bg-gray-300 rounded w-2/6"></div>
									</div>
								</div>
							</div>
						</header>
						<div className="max-w-4xl md:px-4 py-8">
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
				</div>
			</div>
		</div>
	);
}
