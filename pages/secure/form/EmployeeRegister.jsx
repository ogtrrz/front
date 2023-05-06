import React, { useState } from "react";
import * as yup from "yup";
import { Formik, Form, Field } from "formik";
import CircularProgress from "@mui/material/CircularProgress";
import dayjs from "dayjs";
import "dayjs/locale/es-mx";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { blueGrey } from '@mui/material/colors';
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
} from "@mui/material";

const Employee = () => {
	return (
		<Formik
			initialValues={{
				first_name: "",
				last_name: "",
				email: "",
				telephone: "",
				hire_date: "",
				birth_date: "",
				emergency_contact: "",
				emergency_telephone: "",
				blode_type: "",
				alergies: "",
				notes: "",
			}}
			validationSchema={yup.object({
				first_name: yup
					.string("Ingresar su Puesto de Trabajo")
					.required("Es requerido"),
				last_name: yup.string("Seleccionar su Rol").required("Es requerido"),
				email: yup.string("Seleccionar su Handling").required("Es requerido"),
				telephone: yup
					.string("Ingresar su Puesto de Trabajo")
					.required("Es requerido"),
				hire_date: yup.string("Seleccionar su Rol").required("Es requerido"),
				birth_date: yup
					.string("Indicar su fecha de nacimiento")
					.required("Es requerido"),
				emergency_contact: yup
					.string("Indicar su contacto de emergencia")
					.required("Es requerido"),
				emergency_telephone: yup
					.string("Indicar el teléfono de emergencia")
					.required("Es requerido"),
				blode_type: yup.string("Ingresar su ripo sanguineo"),
			})}
			onSubmit={(values, { setSubmitting }) => {
				setSubmitting(false);
				console.log("Values", values);
			}}>
			{({ submitForm, isSubmitting }) => (
				<LocalizationProvider
					dateAdapter={AdapterDayjs}
					adapterLocale={"es-mx"}>
					<Form>
						<Stack justifyContent='center' alignItems='center'>
							<Paper elevation={3}>
								<Stack
									spacing={{ xs: 1, sm: 2, md: 4 }}
									alignItems='left'
									justifyContent='left'
									paddingX={{ xs: 1, sm: 2, md: 4 }}
									paddingY={{ xs: 1, sm: 1, md: 2 }}>
									<Typography variant='h6' color='primary'>Mis Datos</Typography>
									<Field
										component={TextField}
										type='text'
										label='Nombre'
										name='first_name'
									/>
									<Field
										component={TextField}
										type='text'
										label='Apellido'
										name='last_name'
									/>
									<Field
										component={TextField}
										type='text'
										label='Correo Electrónico'
										name='email'
									/>
									<Field
										component={TextField}
										type='text'
										label='Teléfono'
										name='telephone'
									/>
									<Box>
										<Field
											component={DatePicker}
											name='hire_date'
											label='Fecha Contatación'
											ampm={true}
										/>
										<Typography variant='body2' color='primary'>
											Fecha contratación
										</Typography>
									</Box>
									<Box>
										<Field
											component={DatePicker}
											name='birth_date'
											label='Fecha de Nacimiento'
											ampm={true}
										/>
										<Typography variant='body2' color='primary'>
											Fecha nacimiento
										</Typography>
									</Box>
									<Field
										component={TextField}
										type='text'
										label='Contacto de Emergencia'
										name='emergency_contact'
									/>
									<Field
										component={TextField}
										type='text'
										label='Teléfono de Emergencia'
										name='emergency_telephone'
									/>
									<Field
										component={TextField}
										type='text'
										label='Tipo de Sangre'
										name='blode_type'
									/>
									<Field
										component={TextField}
										type='text'
										label='Alergias'
										name='alergies'
									/>
									<Field
										component={TextField}
										type='text'
										label='Notas'
										name='notes'
									/>
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
				</LocalizationProvider>
			)}
		</Formik>
	);
};

export default Employee;
