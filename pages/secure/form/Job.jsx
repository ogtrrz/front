import React, { useState } from "react";
import * as yup from "yup";
import { Formik, Form, Field } from "formik";
import CircularProgress from "@mui/material/CircularProgress";
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
	MenuItem,
} from "@mui/material";

const rol = [
	{
		key: "OPERATIONAL",
		value: "Operaciones",
	},
	{
		key: "SUPERVISOR",
		value: "Supervición",
	},
	{
		key: "MANAGER",
		value: "Gerencia",
	},
];

const handling = [
	{
		key: "RAMP",
		value: "Rampa",
	},
	{
		key: "CHECKIN",
		value: "Checkin",
	},
	{
		key: "MULTITASK",
		value: "Multitask",
	},
];

const Job = () => {
	const [rolState, setRolState] = useState();
	const [handlingState, setHandlingState] = useState();
	const handleChangeRol = (event) => {
		const {
			target: { value },
		} = event;
		console.log("Value Rol", value);
		setRolState(value.key);
	};
	const handleChangeHandling = (event) => {
		const {
			target: { value },
		} = event;
		console.log("Value Handling", value);
		setHandlingState(value.key);
	};
	return (
		<Formik
			initialValues={{
				job_title: "",
				job_rol: "",
				job_handling: "",
			}}
			validationSchema={yup.object({
				job_title: yup
					.string("Ingresar su Puesto de Trabajo")
					.required("Es requerido"),
				job_rol: yup.string("Seleccionar su Rol").required("Es requerido"),
				job_handling: yup
					.string("Seleccionar su Handling")
					.required("Es requerido"),
			})}
			onSubmit={(values, { setSubmitting }) => {
				setSubmitting(false);
				console.log("Values", values);
				console.log("Puesto", values.job_title);
				console.log("Rol", rolState);
				console.log("Handling", handlingState);

			}}>
			{({ submitForm, isSubmitting }) => (
				<Form>
					<Stack justifyContent='center' alignItems='center'>
						<Paper elevation={3}>
							<Stack
								spacing={{ xs: 1, sm: 2, md: 4 }}
								alignItems='left'
								justifyContent='left'
								paddingX={{ xs: 1, sm: 2, md: 4 }}
								paddingY={{ xs: 1, sm: 1, md: 2 }}>
								<Typography variant='h6' color='primary'>Mi Puesto</Typography>
								<Field
									component={TextField}
									type='text'
									label='Puesto'
									name='job_title'
								/>
								<Field
									component={Select}
									type='text'
									label='Rol'
									name='job_rol'
									multiple={false}
									value={rolState}
									onChange={handleChangeRol}>
									{rol.map((item) => (
										<MenuItem key={item} value={item}>
											{item.value}
										</MenuItem>
									))}
								</Field>

								<Field
									component={Select}
									type='text'
									label='Handling'
									name='job_handling'
									multiple={false}
									value={handlingState}
									onChange={handleChangeHandling}>
									{handling.map((item) => (
										<MenuItem key={item} value={item}>
											{item.value}
										</MenuItem>
									))}
								</Field>
								<Button
									variant='contained'
									color='primary'
									disabled={isSubmitting}
									onClick={submitForm}>
									Enviar
								</Button>
							</Stack>
						</Paper>
					</Stack>
				</Form>
			)}
		</Formik>
	);
};

export default Job;
