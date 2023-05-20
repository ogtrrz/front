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
import CancelIcon from "@mui/icons-material/Cancel";
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
	List,
	ListItem,
	Breadcrumbs,
	Link,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import CoursesSelection from "models/CoursesSelection";

const TrainingCourseSelection = () => {
	const [course, setCourse] = useState();
	const [date, setDate] = useState("");
	const [expiration, setExpiration] = useState("");

	const router = useRouter();
	const { Employee } = router.query;
	const NOW = moment().format("yyyy-MM-DD") + "T00:00:01Z";
	useEffect(() => {
		console.log("Course", course);
		if (date) {
			setExpiration(
				moment(date.$d)
					.add(course?.expirationInMonth, "months")
					.format("MM/YYYY")
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

	const postEvidences = async () => {
		const arrayOfEvidencePromises = course.requirents.map(returnEvidences);

		for await (const item of arrayOfEvidencePromises) {
			itemDone();
		}

		postTraining();
	};

	const returnEvidences = async (element) => {
		const evidence = {
			id2Requirents: element.id,
			id2Course: course.id,
			id2Employee: employeeIo.id,
			state: "NEW",
			kind: element.kind,
			description: element.description,
			expiration:
				moment(date.$d)
					.add(element?.expirationInMonth, "months")
					.format("yyyy-MM-DD") + "T00:00:01Z",
			created: "usuario",
			createdAt: NOW,
			edited: "usuario",
			editedAt: NOW,
			extra1: element?.expirationInMonth,
			extra2:
				moment(date.$d)
					.add(element?.expirationInMonth, "months")
					.format("yyyy-MM-DD") + "T00:00:01Z",
		};

		const res = await post(URL_EVIDENCES, evidence);
		console.log("res 99", res);
		evidencearray.push(res);
	};

	const postTraining = async () => {
		const dateTrainning = moment(date.$d).format("yyyy-MM-DD") + "T00:00:01Z";
		const dateExpiry =
			moment(date.$d)
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
			extra6: course.expirationInMonth,
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
		setEmployeeIo(emp);
		router.push(`/secure/view/employee/${emp.id}`);
	};

	const handleOnSelect = (params) => {
		console.log("row", params.row);
		setCourse(params.row);
	};

	const onCancel = () => {
		console.log("Cancelar");
		router.push(`/secure/view/employee/${employeeIo.id}`);
	};

	return (
		<Box sx={{ p: 3, border: "1px dashed grey" }}>
			<Stack direction='column' spacing={2}>
				<Breadcrumbs
					separator={<NavigateNextIcon fontSize='small' color='primary' />}
					aria-label='Link al Inicio'>
					<Link underline='hover' color='primary.main' href='/'>
						Inicio
					</Link>
					<Link
						underline='hover'
						color='primary.main'
						href={`/secure/view/employee/${employeeIo.id}`}>
						Mis Datos
					</Link>

					<Typography color='text.primary'>{`Nuevo Entrenamiento`}</Typography>
				</Breadcrumbs>

				<Typography variant='h6' color='primary'>
					{`Nuevo Entrenamiento`}
				</Typography>
				<Typography variant='body1' color='text'>
					{`Seleccionar curso`}
				</Typography>
				<CoursesSelection training={true} handleRowClick={handleOnSelect} />

				<Typography variant='body1' color='secondary'>
					{course
						? `Requerimientos (${course?.requirents.length})`
						: `Seleccionar Curso para ver Requerimientos`}
				</Typography>
				<List>
					{course?.requirents.map((item) => {
						return (
							<ListItem key={item.id}>
								<Typography variant='body1' color='text'>
									{item.description}
								</Typography>
							</ListItem>
						);
					})}
				</List>

				<LocalizationProvider
					dateAdapter={AdapterDayjs}
					adapterLocale={"es-mx"}>
					<DatePicker
						label='Fecha del Entrenamiento'
						value={date}
						onChange={(newDate) => setDate(newDate)}
					/>
				</LocalizationProvider>

				<Stack direction='row' spacing={4}>
					<Button
						variant='contained'
						endIcon={<SaveIcon />}
						onClick={postEvidences}>
						Guardar
					</Button>
					<Button
						variant='outlined'
						endIcon={<CancelIcon />}
						onClick={onCancel}>
						Cancelar
					</Button>
				</Stack>
			</Stack>
		</Box>
	);
};

export default TrainingCourseSelection;
