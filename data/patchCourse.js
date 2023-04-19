import axios from "axios";

const patchCourse = async (data) => {
	const config = {
		method: "patch",
		url: `${process.env.NEXT_PUBLIC_API_REST}courses/${data.id}`,
		headers: {
			"Content-Type": "application/json",
		},
		data: data,
	};

	const response = await axios(config)
		.then(function (response) {
			console.log(JSON.stringify(response.data));
			return response.data;
		})
		.catch(function (error) {
			console.log(error);
		});
	return response;
};

export default patchCourse;
