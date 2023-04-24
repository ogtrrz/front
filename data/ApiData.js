import axios from "axios";

export const URL_TRAININGS = `${process.env.NEXT_PUBLIC_API_REST}trainings/`;
export const URL_TO_DOS = `${process.env.NEXT_PUBLIC_API_REST}to-dos/`;
export const URL_REQUIRENTS = `${process.env.NEXT_PUBLIC_API_REST}requirents/`;
export const URL_JOBS = `${process.env.NEXT_PUBLIC_API_REST}jobs/`;
export const URL_HISTORIC_DATA = `${process.env.NEXT_PUBLIC_API_REST}historic-data/`;
export const URL_EVIDENCES = `${process.env.NEXT_PUBLIC_API_REST}evidences/`;
export const URL_EMPLOYEES = `${process.env.NEXT_PUBLIC_API_REST}employees/`;
export const URL_COURSES = `${process.env.NEXT_PUBLIC_API_REST}courses/`;


export const gets = async (url) => {
	// console.log("entro al llamado");
	let res = {};
	const config = {
		method: "get",
		url: url,
		headers: { "Content-Type": "application/json" },
	};

	await axios(config)
		.then(function (response) {
			// console.log(response.data);
			res = response.data;
		})
		.catch(function (error) {
			// console.log(error);
			res = error;
		});
	return res;
};

export const get = async (url, entityId) => {
	// console.log("entro al llamado");
	let res = {};
	const config = {
		method: "get",
		url: `${url}${entityId}`,
		headers: { "Content-Type": "application/json" },
	};

	await axios(config)
		.then(function (response) {
			// console.log(response.data);
			res = response.data;
		})
		.catch(function (error) {
			// console.log(error);
			res = error;
		});
	return res;
};

export const post = async (url, entity) => {
	let res = {};
	const config = {
		method: "put",
		url: `${url}${entity.id}`,
		headers: { "Content-Type": "application/json" },
		data: entity,
	};
	await axios(config)
		.then(function (response) {
			// console.log(response.data);
			res = response.data;
		})
		.catch(function (error) {
			// console.log(error);
			res = error;
		});
	return res;
};

export const put = async (url, entity) => {
	let res = {};
	const config = {
		method: "put",
		url: `${url}${entity.id}`,
		headers: { "Content-Type": "application/json" },
		data: entity,
	};
	await axios(config)
		.then(function (response) {
			// console.log(response.data);
			res = response.data;
		})
		.catch(function (error) {
			// console.log(error);
			res = error;
		});
	return res;
};

export const patch = async (url, entity) => {
	let res = {};
	const config = {
		method: "patch",
		url: `${url}${entity.id}`,
		headers: { "Content-Type": "application/json" },
		data: entity,
	};
	await axios(config)
		.then(function (response) {
			// console.log(response.data);
			res = response.data;
		})
		.catch(function (error) {
			// console.log(error);
			res = error;
		});
	return res;
};

export const del = async (url, entityId) => {
	// console.log("entro al llamado");
	let res = {};
	const config = {
		method: "delete",
		url: `${url}${entityId}`,
		headers: { "Content-Type": "application/json" },
	};

	await axios(config)
		.then(function (response) {
			// console.log(response.data);
			res = response.data;
		})
		.catch(function (error) {
			// console.log(error);
			res = error;
		});
	return res;
};
