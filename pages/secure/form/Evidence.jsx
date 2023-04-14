import React, { useState } from "react";
import axios from "axios";
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
	const [selectedFile, setSelectedFile] = useState(null);

	const [fechaExpiracion, setFechaExpiracion] = useState();
	const handlerChangueExpirationDate = (fecha) => {
		setFechaExpiracion(fecha);
	};

	async function postForm(values) {
		console.log("Values post-0", values);
		const date = fechaExpiracion.format("YYYY-MM-DD") + "T00:00:00.000Z";
		let formData = new FormData();
		formData.append("files", selectedFile);
		await axios({
			method: "post",
			url: "http://localhost:1337/api/upload",
			data: formData,
		})
			.then((responseFile) => {
				console.log("Sumited-1", responseFile);
				const postValues = JSON.stringify({
					description: values.evidence_description,
					expiration: date,
					link: responseFile.data[0].url,
					training: {
						id: 10,
					},
					employee: {
						id: 10,
					},
				});
				const config = {
					method: "post",
					url: "http://localhost:8080/api/evidences",
					headers: {
						"Content-Type": "application/json",
					},
					data: postValues,
				};

				axios(config)
					.then(function (response) {
						console.log("Response DATOS 2", response);
					})
					.catch(function (error) {
						console.log("Error-2", error);
					});
			})
			.catch(function (error) {
				console.log("Error-1", error);
			});
	}

	return (
		<Paper elevation={3}>
			<Typography variant='h6' color='primary'>
				Mis Evidencias
			</Typography>
			<Formik
				initialValues={{
					is_complete: false,
					todo_description: "",
					todo_link: "",
				}}
				onSubmit={(values, { setSubmitting }) => {
					setSubmitting(false);
					console.log("Values", values);
					postForm(values);
				}}>
				{({ submitForm, isSubmitting }) => (
					<>
						<LocalizationProvider
							dateAdapter={AdapterDayjs}
							adapterLocale={"es-mx"}>
							<Form>
								<Stack
									direction={"column"}
									spacing={{ xs: 4, sm: 4, md: 8 }}
									alignItems='left'
									justifyContent='left'
									paddingX={{ xs: 2, sm: 4, md: 8 }}
									paddingY={{ xs: 2, sm: 4, md: 8 }}>
									<Field
										component={TextField}
										type='text'
										label='Descripción'
										name='evidence_description'
									/>
									<Box>
										<Field
											component={DatePicker}
											name='evidence_expiration_date'
											label='Fecha de Expiración'
											value={fechaExpiracion}
											onChange={handlerChangueExpirationDate}
											ampm={true}
										/>
										<Typography variant='body2' color='primary'>
											Fecha de expiración
										</Typography>
									</Box>
									<Field
										component={TextField}
										type='text'
										label='Link'
										name='evidence_link'
									/>
								</Stack>
							</Form>
						</LocalizationProvider>
						<Button
							variant='contained'
							color='primary'
							disabled={isSubmitting}
							onClick={submitForm}>
							Enviar
						</Button>
					</>
				)}
			</Formik>
			<Typography variant='body1'>
				{selectedFile ? "Nombre del archivo: " + selectedFile.name : ""}
			</Typography>
			<Button variant='contained' component='label'>
				Subir Archivo
				<input
					hidden
					accept='image/*'
					multiple
					type='file'
					// value={selectedFile}
					onChange={(e) => setSelectedFile(e.target.files[0])}
				/>
			</Button>
		</Paper>
	);
};

export default Training;
