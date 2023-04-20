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
	FormControl,
	FormHelperText,
} from "@mui/material";

const Training = () => {
	return (
		<Formik>
			<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"es-mx"}>
				<Form>
					<Typography variant='h6' color='primary'>
						Mi Entrenamiento
					</Typography>
					<FormControl fullWidth>
						<Field
							component={TextField}
							name='requirements_code'
							label='Código'
							type='text'
						/>
						<FormHelperText id='help-code'>
							Ingrese el Código
						</FormHelperText>
					</FormControl>
					<FormControl fullWidth>
						<Field
							component={DatePicker}
							name='date'
							label='Fecha del Entrenamiento'
							ampm={true}
						/>
						<FormHelperText id='my-helper-text'>
							Fecha del Entrenamiento
						</FormHelperText>
					</FormControl>
					<FormControl fullWidth>
						<Field
							component={DatePicker}
							name='expiry'
							label='Fecha de Expiración'
							ampm={true}
						/>
						<FormHelperText id='my-helper-text'>
							Fecha de Expiración
						</FormHelperText>
					</FormControl>
				</Form>
			</LocalizationProvider>
		</Formik>
	);
};

export default Training;
