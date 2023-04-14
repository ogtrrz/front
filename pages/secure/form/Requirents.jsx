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

const kind = [
	{
		key: "CERTIFICATE",
		value: "Certificado",
	},
	{
		key: "ONTHEJOB",
		value: "En el Trabajo",
	},
	{
		key: "COURSE",
		value: "Curso",
	},
];

const Requirents = () => {
	const [kindState, setKindState] = useState();
	const handleChange = (event) => {
		const {
			target: { value },
		} = event;
		console.log("Value", value);
		setKindState(value.key);
	};
	return (
		<Formik
			initialValues={{
				requirements_code: "",
				kind: "",
				requirements_expiration: "",
				requirements_description: "",
			}}
			validationSchema={yup.object({
				requirements_code: yup
					.string("Ingresar el Código")
					.required("Es requerido"),
				kind: yup
					.string("Seleccionar el Tipo de requerimiento")
					.required("Es requerido"),
			})}
			onSubmit={(values, { setSubmitting }) => {
				setSubmitting(false);
				console.log("Values", values);
				console.log("Rol", kindState);
			}}>
			{({ submitForm, isSubmitting }) => (
				<LocalizationProvider
					dateAdapter={AdapterDayjs}
					adapterLocale={"es-mx"}>
					<Form>
						<Stack justifyContent='center' alignItems='center'>
							<Paper elevation={3}>
								<Stack
									alignItems='left'
									justifyContent='left'
									paddingX={{ xs: 1, sm: 2, md: 4 }}
									paddingY={{ xs: 1, sm: 1, md: 2 }}>
									<Typography variant='h6' color='primary'>
										Requerimientos
									</Typography>
									<Field
										component={TextField}
										type='text'
										label='Código'
										name='requirements_code'
									/>
									<Field
										component={Select}
										type='text'
										label='Tipo'
										name='kind'
										multiple={false}
										value={kindState}
										onChange={handleChange}>
										{kind.map((item) => (
											<MenuItem key={item} value={item}>
												{item.value}
											</MenuItem>
										))}
									</Field>
									<Field
										component={TextField}
										type='number'
										label='Expiración en meses'
										name='requirements_expiration'
									/>
									<Field
										component={TextField}
										type='text'
										label='Descripción'
										name='requirements_description'
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

export default Requirents;
