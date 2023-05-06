import React, { useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import { useRouter } from "next/router";
import { patch, URL_EMPLOYEES } from "data/ApiData";
import _ from "lodash";
import * as yup from "yup";
import { Formik, Form, Field } from "formik";
import CircularProgress from "@mui/material/CircularProgress";
import dayjs from "dayjs";
import "dayjs/locale/es-mx";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { blueGrey } from '@mui/material/colors';
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
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
	Breadcrumbs,
	Link,
} from "@mui/material";

const Employee = () => {
	const router = useRouter();

	const [employeeIo, setEmployeeIo] = useLocalStorageState("employee", {
		defaultValue: [],
	});

	const update = async (values) => {
		console.log("values", values);
		let newEmployee = _.cloneDeep(employeeIo);
		newEmployee.firstName = values.first_name;
		newEmployee.lastName = values.last_name;
		newEmployee.email = values.email;
		newEmployee.hireDate = values.hire_date.$d;
		newEmployee.birthDate = values.birth_date.$d;
		newEmployee.emergencyContact = values.emergency_contact;
		newEmployee.emergencyPhone = values.emergency_telephone;
		newEmployee.blodeType = values.blode_type;
		newEmployee.allergies = values.alergies;
		newEmployee.note = values.notes;
		const res = await patch(URL_EMPLOYEES, newEmployee);
		setEmployeeIo(res);
		router.push(`/secure/view/employee/${employeeIo.id}`);
	};

	const onCancel = () => {
		router.push(`/secure/view/employee/${employeeIo.id}`);
	}

	return (
		<Box sx={{ p: 3, border: "1px dashed grey" }}>
			<Stack direction='column' spacing={2}>
				<Breadcrumbs
					separator={<NavigateNextIcon fontSize='small' color='primary' />}
					aria-label='Link al Inicio'>
					<Link underline='hover' color='primary.main' href='/'>
						Inicio
					</Link>
					<Typography color='text.primary'>{`Mis Datos`}</Typography>
				</Breadcrumbs>

				<Typography variant='h6' color='primary'>
					{`Hola, ${employeeIo?.firstName} ${employeeIo?.lastName}.`}
				</Typography>

				<Formik
					enableReinitialize
					initialValues={{
						first_name: employeeIo.firstName ? employeeIo.firstName : "",
						last_name: employeeIo.lastName ? employeeIo.lastName : "",
						email: employeeIo.email ? employeeIo.email : "",
						telephone: employeeIo.phoneNumber ? employeeIo.phoneNumber : "",
						hire_date: "",
						birth_date: "",
						emergency_contact: employeeIo.emergencyContact
							? employeeIo.emergencyContact
							: "",
						emergency_telephone: employeeIo.emergencyPhone
							? employeeIo.emergencyPhone
							: "",
						blode_type: employeeIo.blodeType ? employeeIo.blodeType : "",
						alergies: employeeIo.allergies ? employeeIo.allergies : "",
						notes: employeeIo.note ? employeeIo.note : "",
					}}
					validationSchema={yup.object({
						first_name: yup
							.string("Ingresar su Puesto de Trabajo")
							.required("Es requerido"),
						last_name: yup
							.string("Seleccionar su Rol")
							.required("Es requerido"),
						email: yup
							.string("Seleccionar su Handling")
							.required("Es requerido"),
						telephone: yup
							.string("Ingresar su Puesto de Trabajo")
							.required("Es requerido"),
						hire_date: yup
							.string("Seleccionar su Rol")
							.required("Es requerido"),
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
						update(values);
					}}>
					{({ submitForm, isSubmitting }) => (
						<LocalizationProvider
							dateAdapter={AdapterDayjs}
							adapterLocale={"es-mx"}>
							<Form>
								<Stack spacing={2}>
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
									<Box>
										<Stack direction='row' spacing={4}>
											<Button
												variant='contained'
												color='primary'
												disabled={isSubmitting}
												onClick={submitForm}
												endIcon={<SaveIcon />}>
												Guardar
											</Button>
											<Button
												variant='outlined'
												onClick={onCancel}
												endIcon={<CancelIcon />}>
												Cancelar
											</Button>
										</Stack>
									</Box>
								</Stack>
							</Form>
						</LocalizationProvider>
					)}
				</Formik>
			</Stack>
		</Box>
	);
};

export default Employee;
