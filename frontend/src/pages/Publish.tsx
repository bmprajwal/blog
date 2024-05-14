import { useState } from "react";
import { Appbar } from "../components/Appbar"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const navigate = useNavigate()
  async function publishBlog() {
    const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
      title, content
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`
      }
    })

    const data = response.data
    if(data){
      navigate(`/blog/${data.id}`)
    }
  }
  return (
		<div>
			<Appbar />
			<div className="flex justify-center pt-12">
				<div className="max-w-screen-lg w-full">
					<input
						onChange={(e) => setTitle(e.target.value)}
						type="text"
						id="large-input"
						className="block w-full p-2 text-gray-700 text-5xl font-serif focus:border-l-2 px-5 focus:outline-none "
						placeholder="Title"
					></input>
					<textarea
						onChange={(e) => setContent(e.target.value)}
						id="message"
						rows={10}
						className="block mt-3 py-5 px-5 w-full text-gray-600 focus:outline-none focus:border-l-2 text-xl resize-none font-serif whitespace-pre-line
            "
						placeholder="Tell your story..."
					></textarea>
					<button
            onClick={publishBlog}
						type="button"
						className=" mt-8 ml-5 text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg  px-5 py-2"
					>
						Publish
					</button>
				</div>
			</div>
		</div>
  );
}