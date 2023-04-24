import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import _ from "lodash";
import useLocalStorageState from "use-local-storage-state";
import moment from "moment";
import dayjs from "dayjs";
import "dayjs/locale/es-mx";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import EvidenceAddToDo from "../../../models/EvidenceAddToDo";
import SaveIcon from "@mui/icons-material/Save";
import {
	Autocomplete,
	TextField,
	Select,
	Switch,
	ToggleButtonGroup,
} from "formik-mui";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
	Button,
	LinearProgress,
	Stack,
	Box,
	Paper,
	Typography,
	FormControl,
	FormHelperText,
} from "@mui/material";
import Courses from "../view/Courses";

const TrainingCourseSelection = () => {
	const [course, setCourse] = useState();
	const [date, setDate] = useState();
	const [expiration, setExpiration] = useState("");
	const router = useRouter();
	const { Employee } = router.query;
	const now = moment().format("yyyy-MM-DD") + "T00:00:01Z";
	useEffect(() => {
		console.log("Course", course);
		if (date) {
			setExpiration(
				moment(date).add(course?.expirationInMonth, "months").format("MM/YYYY")
			);
		}
	}, [date, course]);
	const [employeeIo, setEmployeeIo] = useLocalStorageState("employee", {
		defaultValue: [],
	});

	let evidencearray = [];

	const itemDone = () => {
		console.log("evidencearray", evidencearray);
	};

	async function postEvidences() {
		const arrayOfEvidencePromises = course.requirents.map(returnEvidences);

		for await (const item of arrayOfEvidencePromises) {
			itemDone();
		}

		postTraining();
	}

	const returnEvidences = async (element) => {
		const evidence = {
			id2Requirents: element.id,
			id2Course: course.id,
			id2Employee: employeeIo.id,
			state: "NEW",
			kind: element.kind,
			description: element.description,
			expiration:
				moment(date)
					.add(element?.expirationInMonth, "months")
					.format("yyyy-MM-DD") + "T00:00:01Z",
			created: "usuario",
			createdAt: now,
			edited: "usuario",
			editedAt: now,
			extra1: element?.expirationInMonth,
			extra2:
				moment(date)
					.add(element?.expirationInMonth, "months")
					.format("yyyy-MM-DD") + "T00:00:01Z",
		};
		const config = {
			method: "post",
			url: `${process.env.NEXT_PUBLIC_API_REST}evidences`,
			headers: {
				"Content-Type": "application/json",
			},
			data: evidence,
		};

		await axios(config)
			.then(function (response) {
				console.log("evidence", response.data);
				evidencearray.push(response.data);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	const postTraining = async () => {
		const dateTrainning = moment(date).format("yyyy-MM-DD") + "T00:00:01Z";
		const dateExpiry =
			moment(date)
				.add(course?.expirationInMonth, "months")
				.format("yyyy-MM-DD") + "T00:00:01Z";
		const traning = {
			id2Course: course.id,
			id2Employee: Employee,
			date: dateTrainning,
			expiry: dateExpiry,
			code: course.code,
			extra1: course.name,
			extra2: course.description,
			extra3: course.typeCourse,
			extra4: course.autorizationBy,
			extra5: course.link,
			created: "usuario",
			createdAt: now,
			edited: "usuario",
			editedAt: now,
			evidences: evidencearray,
		};
		const configTraining = {
			method: "post",
			url: `${process.env.NEXT_PUBLIC_API_REST}trainings`,
			headers: {
				"Content-Type": "application/json",
			},
			data: traning,
		};
		console.log("traning", traning);

		await axios(configTraining)
			.then(function (response) {
				console.log("traning response", response.data);
				let employeeNew = _.cloneDeep(employeeIo);
				console.log("employeeNew", employeeNew);
				let arraytrainings = employeeNew.trainings;
				arraytrainings = [...arraytrainings, response.data];
				employeeNew.trainings = arraytrainings;
				employeeNew.edited = "usuario";
				employeeNew.editedAt = now;
				console.log("employeeNew2", employeeNew);
				const data = employeeNew;
				const config = {
					method: "patch",
					url: `${process.env.NEXT_PUBLIC_API_REST}/employees/${employeeNew.id}`,
					headers: {
						"Content-Type": "application/json",
					},
					data: data,
				};
				axios(config)
					.then(function (response) {
						console.log("PATCH", response.data);
						setEmployeeIo(response.data);
						router.push(`/secure/view/employee/${employeeNew.id}`);
					})
					.catch(function (error) {
						console.log(error);
					});
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	return (
		<>
			<Courses training={true} setCourse={setCourse} />
			<Typography variant='h6' color='primary'>
				{`Mi Entrenamiento ${course ? course.name : ""}  ${
					course ? "( " + course.code + " )" : ""
				}`}
			</Typography>
			<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"es-mx"}>
				<DatePicker
					label='Fecha del Entrenamiento'
					value={date}
					onChange={(newDate) => setDate(newDate)}
				/>
			</LocalizationProvider>
			<Typography variant='subtitle2'>
				{expiration ? "Fecha de expiracion: " + expiration : ""}
			</Typography>
			{course?.requirents.map((item) => {
				return (
					<>
						<Typography variant='body1' color='secondary' key={item.id}>
							{item.description}
						</Typography>
						<EvidenceAddToDo course={item} />
					</>
				);
			})}
			<Button
				variant='contained'
				endIcon={<SaveIcon />}
				onClick={postEvidences}>
				Nuevo Entrenamiento
			</Button>
		</>
	);
};

export default TrainingCourseSelection;
