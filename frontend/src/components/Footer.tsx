export const Footer = () => {
  const year = new Date().getFullYear()
  return (
		// © 2024 Blog. All rights reserved.
		<div className="flex justify-between items-center py-8 px-7 text-sm text-gray-700">
			<div> &copy; {year} Medium. All rights reserved.</div>
			<div className="flex gap-4">
				<div>
					<a
						href="https://github.com/bmprajwal/blog"
						className=" hover:underline"
					>
						GitHub
					</a>
				</div>
				<div>
					<a
						href="https://www.linkedin.com/in/b-m-prajwal-b95b57271/"
						className=" hover:underline"
					>
						LinkedIn
					</a>
				</div>
			</div>
		</div>
  );
}