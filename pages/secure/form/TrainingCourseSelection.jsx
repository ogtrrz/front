import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { Formik, Form, Field } from "formik";
import CircularProgress from "@mui/material/CircularProgress";
import moment from "moment";
import dayjs from "dayjs";
import "dayjs/locale/es-mx";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
	Autocomplete,
	TextField,
	Select,
	Switch,
	ToggleButtonGroup,
} from "formik-mui";
import {
	TimePicker,
	DatePicker,
	DateTimePicker,
} from "formik-mui-x-date-pickers";
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
import { useStaticPicker } from "@mui/x-date-pickers/internals";

const TrainingCourseSelection = () => {
	const [course, setCourse] = useState();
	const [date, setDate] = useState();
	const [expiration, setExpiration] = useState("");
	useEffect(() => {
		if (date) {
			setExpiration(
				moment(date).add(course?.expirationInMonth, "months").format("MM/YYYY")
			);
		}
	}, [date, course]);

	const handlerChangueDate = (selectedDate) => {
		setDate(selectedDate);
		console.log("setDate");
	};

	return (
		<>
			<Courses training={true} setCourse={setCourse} />
			<Typography variant='h6' color='primary'>
				{`Mi Entrenamiento ${course ? course.name : ""}  ${
					course ? "( " + course.code + " )" : ""
				}`}
			</Typography>
			<Formik>
				<LocalizationProvider
					dateAdapter={AdapterDayjs}
					adapterLocale={"es-mx"}>
					<Form>
						<FormControl fullWidth>
							<Field
								component={DatePicker}
								name='date'
								label='Fecha del Entrenamiento'
								ampm={true}
								value={date}
								onChange={handlerChangueDate}
							/>
							<FormHelperText id='my-helper-text'>
								Fecha del Entrenamiento
							</FormHelperText>
						</FormControl>
					</Form>
				</LocalizationProvider>
			</Formik>
			<Typography variant='subtitle2'>
				{expiration ? "Fecha de expiracion: " + expiration : ""}
			</Typography>
		</>
	);
};

export default TrainingCourseSelection;
