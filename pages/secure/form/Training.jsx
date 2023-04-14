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
} from "@mui/material";

const Training = () => {
	return (
		<Formik>
			<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"es-mx"}>
				<Form>
					<Stack justifyContent='center' alignItems='center'>
						<Paper elevation={3}>
							<Stack
								spacing={{ xs: 1, sm: 2, md: 4 }}
								alignItems='left'
								justifyContent='left'
								paddingX={{ xs: 1, sm: 2, md: 4 }}
								paddingY={{ xs: 1, sm: 1, md: 2 }}>
								<Typography variant='h6' color='primary'>Mi Entrenamiento</Typography>
								<Field
									component={TextField}
									type='text'
									label='Código'
									name='requirements_code'
								/>
								<Box margin={1}>
									<Field
										component={DatePicker}
										name='birthdate'
										label='Fecha del Entrenamiento'
										ampm={true}
									/>
								</Box>
								<Box margin={1}>
									<Field
										component={DatePicker}
										name='hire_date'
										label='Fecha de Expiración'
										ampm={true}
									/>
								</Box>
							</Stack>
						</Paper>
					</Stack>
				</Form>
			</LocalizationProvider>
		</Formik>
	);
};

export default Training;
