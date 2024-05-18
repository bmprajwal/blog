import { Link,} from "react-router-dom";


export const Hero = () => {
  return (
		<div className="h-[90vh] bg-gray-200 flex items-center justify-center">
			<div className=" flex flex-col items-center text-center">
				<h1 className="m-3 title font-semibold text-gray-900 text-4xl md:text-5xl">
					Unlock the Power of Storytelling
				</h1>
				<p className=" m-2 px-2 mb-12">
					Discover captivating narratives that inspire and engage our
					community.
				</p>
				<Link
					to={"/blogs"}
					className="font-semibold text-gray-800 hover:text-gray-900 "
				>
					Start Reading
				</Link>
			</div>
		</div>
  );
}