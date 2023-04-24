import React, { useState, useEffect } from "react";
import axios from "axios";
import useLocalStorageState from "use-local-storage-state";
import moment from "moment";
import { useRouter } from "next/router";
import { blueGrey } from '@mui/material/colors';
import FlagCircleIcon from "@mui/icons-material/FlagCircle";
import ReqTrainEvidence from "../../../../models/ReqTrainEvidence";
import {
	Button,
	LinearProgress,
	Stack,
	Box,
	Paper,
	Typography,
	MenuItem,
} from "@mui/material";

const Training = () => {
	const router = useRouter();
	const { Training } = router.query;
	/*
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
	*/
	/*
	async function getCourses(idCourse) {
		console.log("idCourse", idCourse);
		const config = {
			method: "get",
			url: `${process.env.NEXT_PUBLIC_API_REST}courses/${idCourse}`,
			headers: {},
		};

		await axios(config)
			.then(function (response) {
				console.log("curso", response.data);
				setCourseState(response.data);
			})
			.catch(function (error) {
				console.log(error);
			});
	}
	*/
	const [traningState, setTraningState] = useState();
	useEffect(() => {
		if (Training) {
			const dataio = employeeIo.trainings.find((obj) => {
				return obj.id == Training;
			});
			setTraningState(dataio);
			console.log("dataio", dataio);
			console.log("Employee", employeeIo);
		}
	}, [Training]);

	const [employeeIo, setEmployeeIo] = useLocalStorageState(
		"employee",
		{
			defaultValue: [],
		}
	);

	//TODO valor de expira en la tabla
	return (
		<>
			<Typography variant='h6' color='primary'>
				{`Curso ${traningState?.code}`}
			</Typography>
			<Typography variant='body1' color={blueGrey['A700']}>
				{`Nombre: ${traningState?.extra1}`}
			</Typography>
			<Typography variant='body1' color={blueGrey['A700']}>
				{`Descripción: ${traningState?.extra2}`}
			</Typography>
			<Typography variant='body1' color={blueGrey['A700']}>
				{`Tipo: ${traningState?.extra3}`}
			</Typography>
			<Typography variant='body1' color={blueGrey['A700']}>
				{`Autorizado por: ${traningState?.extra4}`}
			</Typography>
			<Typography variant='body1' color={blueGrey['A700']}>
				{`Link ${traningState?.extra5}`}
			</Typography>

			<Typography variant='body1' color={blueGrey['A700']}>
				{`Tomado el: ${moment(traningState?.date).format("M/yyyy")}`}
			</Typography>
			<Typography variant='body1' color={blueGrey['A700']}>
				{`Expira el ${moment(traningState?.expiry).format("M/yyyy")}`}
			</Typography>
			<Typography variant='body1' color={blueGrey['A700']}>
				{traningState?.course?.code}
			</Typography>
			<ReqTrainEvidence
				evidences={traningState?.evidences}
				training={traningState?.id}
			/>
		</>
	);
};

export default Training;
