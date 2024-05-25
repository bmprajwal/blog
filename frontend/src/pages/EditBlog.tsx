import { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userAtom } from "../store/atoms/user";
import { blogsAtom, blogsAtomFamily } from "../store/atoms/blogs";
import { Blog } from "../hooks";

export const EditBlog = () => {
	const { id } = useParams();
	const { blog } = useRecoilValue(blogsAtomFamily(id || ""));

	const [title, setTitle] = useState(blog?.title || "");
	const [content, setContent] = useState(blog?.content || "");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const currentUser = useRecoilValue(userAtom);
	const setBlogs = useSetRecoilState(blogsAtom);
  const setBlogInFamily = useSetRecoilState(blogsAtomFamily(id || ""))

	useEffect(() => {
		const user = localStorage.getItem("jwt");
		if (!user) {
			navigate("/signin");
		}
	}, []);

  useEffect(() => {
		if (blog) {
			setTitle(blog.title);
			setContent(blog.content);
		}
  }, [blog]);

	const isContentValid = (content: string) => {
		const trimmedContent = content.trim();
		return (
			trimmedContent &&
			trimmedContent !== "<p><br></p>" &&
			trimmedContent.length >= 30
		);
	};

	async function updateBlog() {
		try {
      if (!title.trim() || !isContentValid(content)) return;
		setLoading(true);
		const response = await axios.put(
			`${BACKEND_URL}/api/v1/blog`,
			{ id, title, content },
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("jwt")}`,
				},
			}
		);

		const data = response.data;
		if (data) {
      console.log(data);
      
			setBlogs((oldBlogs: Blog[]) =>
				oldBlogs.map((blog) =>
					blog.id === data.id
						? { ...blog,
								title,
								content,
								id: response.data.id,
								author: {
									name: currentUser?.name,
								},
                publishedDate: data.publishedDate
						}
						: blog
				)
			);

      setBlogInFamily((oldBlog: Blog) => (
        {
          ...oldBlog,
          title,
          content,
          publishedDate: data.publishedDate
        }
      ))
      
			navigate(`/blog/${data.id}`);
		}
    } catch (error) {
      setLoading(false)
      alert("Failed to edit!")
    }
	}
	return (
		<div>
			<Appbar />
			<div className="flex justify-center pt-8">
				<div className="publish-page max-w-screen-lg w-full">
					<input
						onChange={(e) => setTitle(e.target.value)}
						type="text"
						id="large-input"
						className="block w-full p-2 text-gray-700 text-5xl font-serif focus:border-l-2 px-5 focus:outline-none "
						placeholder="Title"
						value={title}
					></input>
					<ReactQuill
						className=" p-5"
						theme="snow"
						value={content}
						onChange={setContent}
						placeholder="Tell your story..."
						defaultValue={content}
					/>
					<button
						onClick={updateBlog}
						type="button"
						className={`${
							title && isContentValid(content)
								? "bg-blue-600 hover:bg-blue-700"
								: "bg-gray-400 cursor-not-allowed"
						} m-4 text-white bg-blue-600  focus:outline-none  font-medium cursor-pointer rounded-lg  px-5 py-2 w-30 ${
							loading ? "cursor-not-allowed" : ""
						}`}
						disabled={!title || !isContentValid(content) || loading}
					>
						{loading ? (
							<div role="status">
								<svg
									aria-hidden="true"
									className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-500 fill-white mx-auto"
									viewBox="0 0 100 101"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
										fill="currentColor"
									/>
									<path
										d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
										fill="currentFill"
									/>
								</svg>
							</div>
						) : (
							"Finish edit"
						)}
					</button>
				</div>
			</div>
		</div>
	);
};
