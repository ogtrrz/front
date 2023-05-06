import React, { useState, useEffect } from "react";
import NextLink from "next/link";
import _ from "lodash";
import useLocalStorageState from "use-local-storage-state";
import { useRouter } from "next/router";
import { patch, URL_TRAININGS } from "data/ApiData";
import { updateArray } from "utils/arrays";
import CircularProgress from "@mui/material/CircularProgress";
import moment from "moment";
import dayjs from "dayjs";
import "dayjs/locale/es-mx";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
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
	Breadcrumbs,
	Link,
} from "@mui/material";

//Es Solo Editable
const TrainingEdit = () => {
	const router = useRouter();
	const [employeeIo, setEmployeeIo] = useLocalStorageState("employee", {
		defaultValue: [],
	});
	const [traningIo, setTraningIo] = useLocalStorageState("traning", {
		defaultValue: [],
	});
	const [date, setDate] = useState("");

	const onCancel = () => {
		console.log("entro Cancel");
		router.push(
			`/secure/view/training/${traningIo.id}?Employee=${employeeIo.id}`
		);
	};

	const onSubmit = async () => {
		let newTraining = _.cloneDeep(traningIo);
		let newEmployee = _.cloneDeep(employeeIo);

		newTraining.date = moment(date.$d).format("yyyy-MM-DD") + "T00:00:01Z";
		newTraining.expiry =
			moment(date.$d).add(newTraining.extra6, "months").format("yyyy-MM-DD") +
			"T00:00:01Z";

		const res = await patch(URL_TRAININGS, newTraining);
		setTraningIo(res);

		console.log("res", res);
		updateArray(newEmployee.trainings, res);
		setEmployeeIo(newEmployee);

		router.push(
			`/secure/view/training/${traningIo.id}?Employee=${employeeIo.id}`
		);
	};

	//TODO no se puede editar si contiene evidencias
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
					<Typography variant='body1' color='text'>
						{`Entrenamiento: ${traningIo?.code}`}
					</Typography>
				</Breadcrumbs>

				<Typography variant='h6' color='primary'>
					{`Editando: ${traningIo?.code}`}
				</Typography>

				<Typography variant='body1' color='text'>
					{`El Entrenamiento esta programado para el: ${moment(
						traningIo?.date
					).format("DD/MM/YYYY")}`}
				</Typography>
				<LocalizationProvider
					dateAdapter={AdapterDayjs}
					adapterLocale={"es-mx"}>
					<DatePicker
						label='Nueva Fecha para el Entrenamiento'
						value={date}
						onChange={(newDate) => setDate(newDate)}
					/>
				</LocalizationProvider>

				<Stack direction='row' spacing={4}>
					<Button
						variant='contained'
						endIcon={<CancelIcon />}
						onClick={onCancel}>
						Cancelar
					</Button>
					<Button variant='contained' endIcon={<SaveIcon />} onClick={onSubmit}>
						Guardar
					</Button>
				</Stack>
			</Stack>
		</Box>
	);
};

export default TrainingEdit;
