export const getFormattedDate = () => {
	const date = new Date();
	const options: Intl.DateTimeFormatOptions = {
		day: "numeric",
		month: "long",
		year: "numeric",
	};

	const formattedDate = date.toLocaleDateString("en-US", options);
	return formattedDate;
};
