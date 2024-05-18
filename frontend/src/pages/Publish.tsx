import { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export const Publish = () => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(()=>{
    const user = localStorage.getItem("jwt")
    if(!user){
      navigate("/signin")
    }
  },[])

  async function publishBlog() {
    setLoading(true)
    const response = await axios.post(
		`${BACKEND_URL}/api/v1/blog`,
		{
			title,
			content,
		},
		{
			headers: {
				Authorization: `Bearer ${localStorage.getItem("jwt")}`,
			},
		}
	);

    const data = response.data
    if(data){
      navigate(`/blog/${data.id}`)
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
					></input>
					<ReactQuill
            className=" p-5"
						theme="snow"
						value={content}
						onChange={setContent}
            placeholder="Tell your story..."
					/>
					<button
						onClick={publishBlog}
						type="button"
						className=" m-4 text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg  px-5 py-2"
					>
						{loading? "Publishing...": "Publish"}
					</button>
				</div>
			</div>
		</div>
  );
}