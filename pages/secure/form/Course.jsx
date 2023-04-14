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

const typeCourse = [
	{
		key: "PRESENT",
		value: "Presente",
	},
	{
		key: "REMOTE",
		value: "Remoto",
	},
	{
		key: "ONLINE",
		value: "Online",
	},
	{
		key: "WBT",
		value: "WBT",
	},
];

const Course = () => {
	const [type, setType] = useState();
    const handleChange = (event) => {
		const {
			target: { value },
		} = event;
		console.log("Value Type", value);
		setType(value.key);
	};
	return (
		<Formik
			initialValues={{
				course_code: "",
				course_name: "",
				expiration_in_months: "",
				course_type: "",
				authorization_email: "",
				duration_autorization_months: "",
				description: "",
				course_link: "",
			}}
			validationSchema={yup.object({
				course_code: yup
					.string("Ingresar código del curso")
					.required("Es requerido"),
				course_name: yup
					.string("Ingresat nombre del curso")
					.required("Es requerido"),
				expiration_in_months: yup
					.string("Ingresar los meses de vigencia")
					.required("Es requerido"),
				course_type: yup
					.string("Ingresar el Tipo de Curso")
					.required("Es requerido"),
				authorization_email: yup.string(
					"Ingresar el correo de quien debe autorizarlo"
				),
				duration_autorization_months: yup.string("Vigencia de la autorización"),
				description: yup
					.string("Ingresar la descripción")
					.required("Es requerido"),
				course_link: yup.string("Ingresar el link del curso"),
			})}
			onSubmit={(values, { setSubmitting }) => {
				setSubmitting(false);
				console.log("Values", values);
                console.log("Type", type);
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
								<Typography variant='h6' color='primary'>
									Cursos
								</Typography>
								<Field
									component={TextField}
									type='text'
									label='Código'
									name='course_code'
								/>
								<Field
									component={TextField}
									type='text'
									label='Nombre'
									name='course_name'
								/>
								<Field
									component={TextField}
									type='number'
									label='Duración (en meses)'
									name='expiration_in_months'
								/>
								<Field
									component={Select}
									type='text'
									label='Tipo de Curso'
									name='course_type'
									multiple={false}
                                    value={type}
									onChange={handleChange}>
									{typeCourse.map((item) => (
										<MenuItem key={item} value={item}>
											{item.value}
										</MenuItem>
									))}
								</Field>
								<Field
									component={TextField}
									type='text'
									label='Correo Autorizador'
									name='authorization_email'
								/>
								<Field
									component={TextField}
									type='number'
									label='Duración de la Autorización'
									name='duration_autorization_months'
								/>
								<Field
									component={TextField}
									type='text'
									label='Descripción'
									name='description'
								/>
								<Field
									component={TextField}
									type='text'
									label='Link'
									name='course_link'
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
			)}
		</Formik>
	);
};

export default Course;
