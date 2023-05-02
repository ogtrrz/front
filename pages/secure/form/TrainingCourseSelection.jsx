import React, { useState, useEffect } from "react";
// import axios from "axios";
import { useRouter } from "next/router";
import _ from "lodash";
import useLocalStorageState from "use-local-storage-state";
import moment from "moment";
import dayjs from "dayjs";
import "dayjs/locale/es-mx";
import {
	patch,
	post,
	URL_EVIDENCES,
	URL_TRAININGS,
	URL_EMPLOYEES,
} from "data/ApiData";
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
	const NOW = moment().format("yyyy-MM-DD") + "T00:00:01Z";
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

	const postEvidences = async () =>  {
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
			createdAt: NOW,
			edited: "usuario",
			editedAt: NOW,
			extra1: element?.expirationInMonth,
			extra2:
				moment(date)
					.add(element?.expirationInMonth, "months")
					.format("yyyy-MM-DD") + "T00:00:01Z",
		};

		const res = await post(URL_EVIDENCES, evidence);
		console.log('res 99', res);
		evidencearray.push(res);
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
			createdAt: NOW,
			edited: "usuario",
			editedAt: NOW,
			evidences: evidencearray,
		};
		const res = await post(URL_TRAININGS, traning);
		console.log("traning", traning);
		console.log("traning response", res);
		let employeeNew = _.cloneDeep(employeeIo);
		console.log("employeeNew", employeeNew);
		let arraytrainings = employeeNew.trainings;
		arraytrainings = [...arraytrainings, res];
		employeeNew.trainings = arraytrainings;
		employeeNew.edited = "usuario";
		employeeNew.editedAt = NOW;
		console.log("employeeNew2", employeeNew);
		const emp = await patch(URL_EMPLOYEES, employeeNew);
		setEmployeeIo(emp)
		router.push(`/secure/view/employee/${emp.id}`);
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
