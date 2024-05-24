import { Blog } from "../hooks";
import { Appbar } from "./Appbar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { BlogMeta } from "./BlogMeta";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userAtom } from "../store/atoms/user";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { blogsAtom, } from "../store/atoms/blogs";

export const FullBlog = ({ blog }: { blog: Blog }) => {
	const navigate = useNavigate()
	const { title, content, publishedDate, author, id } = blog;
	const currentUser = useRecoilValue(userAtom);
	const setBlogs = useSetRecoilState(blogsAtom)
	const isBlogBelongToCurrentUser = currentUser?.name === blog.author.name;
	
	const handleDeleteBlog = async () => {
		setBlogs((prevBlogs: Blog[]) => prevBlogs.filter((blog) => blog.id != id))
		
		await axios.delete(`${BACKEND_URL}/api/v1/blog/${blog.id}`, 
		{
			headers: {
				Authorization: `Bearer ${localStorage.getItem("jwt")}`
			}
		}
	)
	navigate("/blogs")
		
	};
	return (
		<div>
			<Appbar />
			<div className=" flex justify-center items-center">
				<div className=" max-w-4xl w-full">
					<div className=" p-1 md:py-16 md:px-5 gap-2">
						<div className=" col-span-12 md:col-span-8">
							<div className=" p-3 font-extrabold text-3xl md:text-5xl text-gray-800 title">
								{title}
							</div>
							<div className="flex justify-between items-center mt-5 px-6">
								<BlogMeta
									authorName={author.name}
									content={content}
									publishedDate={publishedDate}
								/>
								{isBlogBelongToCurrentUser && (
									<div
										className=" mr-5"
										onClick={handleDeleteBlog}
									>
										<svg
											data-slot="icon"
											fill="none"
											strokeWidth="1.5"
											stroke="currentColor"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
											className=" w-6 h-6 text-gray-500 hover:text-gray-900 cursor-pointer"
											aria-hidden="true"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
											></path>
										</svg>
									</div>
								)}
							</div>
							<div className=" text-gray-700 pt-4">
								<ReactQuill
									value={content}
									readOnly={true}
									theme={"bubble"}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
