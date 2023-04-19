import React, { useState, useEffect } from "react";
import axios from "axios";
import useLocalStorageState from "use-local-storage-state";
import { useRouter } from "next/router";
import FlagCircleIcon from "@mui/icons-material/FlagCircle";
import {
	Button,
	LinearProgress,
	Stack,
	Box,
	Paper,
	Typography,
	MenuItem,
} from "@mui/material";
import { set } from "date-fns";

const Training = () => {
	const router = useRouter();
	const { Training } = router.query;
	async function getTraning() {
		const config = {
			method: "get",
			url: "http://localhost:8080/api/trainings/" + Training,
			headers: {},
		};

		await axios(config)
			.then(function (response) {
				console.log(response.data);
				setTraningState(response.data);
			})
			.catch(function (error) {
				console.log(error);
			});
	}
	async function getCourses(idCourse) {
		console.log("idCourse", idCourse);
		const config = {
			method: "get",
			url: `${process.env.NEXT_PUBLIC_API_REST}courses/${idCourse}`,
			headers: {},
		};

		await axios(config)
			.then(function (response) {
				console.log('curso',response.data);
				setCourseState(response.data);
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	const [traningState, setTraningState] = useState();
	const [courseState, setCourseState] = useState();
	//TODO fetch employee siempre
	useEffect(() => {
		if (Training) {
			const dataio = employeeIo.trainings.find((obj) => {
				return obj.id == Training;
			});
			if (dataio == null) {
				getTraning();
			} else {
				setTraningState(dataio);
			}
			console.log('dataio',dataio);
			getCourses(dataio.id)
			console.log("Curso", courseState);
		}
	}, [Training]);

	const [employeeIo, setEmployeeIo, { isPersistent }] = useLocalStorageState(
		"employee",
		{
			defaultValue: [],
		}
	);

	return (
		<>
			<Typography variant='h6' color='primary'>
				{traningState?.code}
			</Typography>
			<Typography variant='body1' color='text'>
				{traningState?.date}
			</Typography>
			<Typography variant='body1' color='text'>
				{traningState?.expiry}
			</Typography>
			<Typography variant='body1' color='text'>
				{traningState?.course?.code}
			</Typography>
		</>
	);
};

export default Training;
