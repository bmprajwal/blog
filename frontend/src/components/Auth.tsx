import { SignupInput } from "@bmprajwal/medium-common";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const [loading, setLoading] = useState(false)
	const [postInput, setPostInput] = useState<SignupInput>({
		name: "",
		email: "",
		password: "",
	});

  const navigate = useNavigate()
  async function sendRequest(){
    try {
      setLoading(true)
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup"? "signup": "signin"}`, postInput)
      const jwt = response.data;
      localStorage.setItem("jwt", jwt.token)
      navigate('/blogs')
    } catch (error) {
      // alert user
    }
  }
	return (
		<div className="h-screen flex justify-center flex-col">
			<div className="flex justify-center">
				<div>
					<div className="px-14">
						<div className="text-4xl font-bold ">
							{type === "signup"
								? "Create an account"
								: "Login to account"}
						</div>
						<div className="text-slate-400 text-lg mt-2 text-center">
							{type === "signup"
								? "Already have an account?"
								: "Don't have an account?"}
							<Link className="pl-2 underline" to={type === "signup"? "/signin" : "/signup"}>
								{type === "signup" ? "Login" : "Sign Up"}
							</Link>
						</div>
					</div>

					<div className="pt-5">
						{type === "signup" ? (
							<LabelledInput
								label="Name"
								placeholder="B M Prajwal"
								onChange={(e) => {
									setPostInput((c) => ({
										...c,
										name: e.target.value,
									}));
								}}
							/>
						) : null}
						<LabelledInput
							label="Email"
							placeholder="prajwal@gmail.com"
							onChange={(e) => {
								setPostInput((c) => ({
									...c,
									email: e.target.value,
								}));
							}}
						/>
						<LabelledInput
							label="Password"
							type="password"
							placeholder=""
							onChange={(e) => {
								setPostInput((c) => ({
									...c,
									password: e.target.value,
								}));
							}}
						/>

						<button
							type="button"
							onClick={sendRequest}
							className={` w-full mt-4 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ${
								loading
									? "bg-gray-400 cursor-not-allowed"
									: "bg-gray-800 hover:bg-gray-900 focus:ring-gray-300"
							}`}
						>
							{loading
								? "Loading..."
								: type === "signup"
								? "Sign Up"
								: "Sign In"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

interface LabelledInputType {
	label: string;
	placeholder: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	type?: string;
}
function LabelledInput({
	label,
	placeholder,
	onChange,
	type,
}: LabelledInputType) {
	return (
		<div>
			<label className="block mb-2  pt-3 font-semibold text-gray-900">
				{label}
			</label>
			<input
				type={type || "text"}
				id="first_name"
				onChange={onChange}
				className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
				placeholder={placeholder}
				required
			/>
		</div>
	);
}
