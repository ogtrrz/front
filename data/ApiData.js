import axios from "axios";

export const URL_TRAININGS = `${process.env.NEXT_PUBLIC_API_REST}trainings/`;
export const URL_TO_DOS = `${process.env.NEXT_PUBLIC_API_REST}to-dos/`;
export const URL_REQUIRENTS = `${process.env.NEXT_PUBLIC_API_REST}requirents/`;
export const URL_JOBS = `${process.env.NEXT_PUBLIC_API_REST}jobs/`;
export const URL_HISTORIC_DATA = `${process.env.NEXT_PUBLIC_API_REST}historic-data/`;
export const URL_EVIDENCES = `${process.env.NEXT_PUBLIC_API_REST}evidences/`;
export const URL_EMPLOYEES = `${process.env.NEXT_PUBLIC_API_REST}employees/`;
export const URL_COURSES = `${process.env.NEXT_PUBLIC_API_REST}courses/`;

export const URL_EMPLOYEES_SECURE = `${process.env.NEXT_PUBLIC_API_REST}employees/secure/`;

//TODO queries http://localhost:8080/api/evidences?page=1&size=50&state.equals=NEW
// http://localhost:8080/api/evidences?page=1&size=50&sort=state
//https://www.jhipster.tech/entities-filtering/
// http://localhost:8080/api/courses?page=0&size=5&sort=id&desc

export const gets = async (url, page = 0, size = 10, sort = "id") => {
	// console.log("entro al get", `${url}?page=${page}&size=${size}&sort=${sort}`);
	let res = {};
	const config = {
		method: "get",
		url: `${url}?page=${page}&size=${size}&sort=${sort}`,
		headers: { "Content-Type": "application/json" },
	};

	await axios(config)
		.then(function (response) {
			// console.log("response", response.data);
			res = response;
		})
		.catch(function (error) {
			// console.log(error);
			res = error;
		});
	return res;
};

export const get = async (url, entityId, authorization = "") => {
	// console.log("entro al llamado");

	let headers = { "Content-Type": "application/json" };
	if (authorization != "") {
		headers.Authorization = "Bearer " + authorization;
	}

	console.log("headers", headers);

	let res = {};
	const config = {
		method: "get",
		url: `${url}${entityId}`,
		headers,
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
		method: "post",
		url: `${url}`,
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
	console.log("response post", res);
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

export const getSecure = async (url, authorization = "") => {
	// console.log("entro al llamado");

	let headers = { "Content-Type": "application/json" };
	if (authorization != "") {
		headers.Authorization = "Bearer " + authorization;
	}

	console.log("headers", headers);

	let res = {};
	const config = {
		method: "get",
		url: `${url}`,
		headers,
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

export const patchSecure = async (url, entity, authorization = "") => {
	let headers = { "Content-Type": "application/json" };
	if (authorization != "") {
		headers.Authorization = "Bearer " + authorization;
	}

	let res = {};
	const config = {
		method: "patch",
		url: `${url}${entity.id}`,
		headers,
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
