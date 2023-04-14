import React, { useState } from "react";
import axios from "axios";
import * as yup from "yup";
import { Formik, Form, Field } from "formik";
import CircularProgress from "@mui/material/CircularProgress";
import dayjs from "dayjs";
import format from "date-fns/format";
import moment from "moment";
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
	FormControlLabel,
} from "@mui/material";

const Todo = () => {
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
					date: date,
					description: values.todo_description,
					state: values.is_complete ? "CHECK" : "NEW",
					link: responseFile.data[0].url,
					employee: {
						id: 10,
					},
				});
				const config = {
					method: "post",
					url: "http://localhost:8080/api/to-dos",
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
	//http://localhost:1337/uploads/d3b110cd_e464_47a3_a505_544dd1efb3c7_2x_98d810f734.jpg?format=webp&height=200&q=80

	return (
		<Stack justifyContent='center' alignItems='center'>
			<Paper elevation={3}>
				<Stack
					spacing={{ xs: 1, sm: 2, md: 4 }}
					alignItems='left'
					justifyContent='left'
					paddingX={{ xs: 1, sm: 2, md: 4 }}
					paddingY={{ xs: 1, sm: 1, md: 2 }}>
					<Typography variant='h6'>Mis Notificaciones</Typography>
					<Formik
						initialValues={{
							is_complete: false,
							todo_description: "",
							todo_link: "",
						}}
						validationSchema={yup.object({
							// todo_expiration_date: yup
							// 	.date()
							// 	.required("Es requerido"),
							todo_description: yup
								.string("Ingresar la descripción")
								.required("Es requerido"),
							todo_link: yup.string("Debe tener formato de url"),
						})}
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
										<FormControlLabel
											control={
												<Field
													component={Switch}
													type='checkbox'
													name='is_complete'
												/>
											}
											label='Completada'
										/>
										<Box>
											<Field
												component={DatePicker}
												name='todo_expiration_date'
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
											label='Descripción'
											name='todo_description'
										/>
										<Field
											component={TextField}
											type='text'
											label='Link'
											name='todo_link'
										/>
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
				</Stack>
			</Paper>
		</Stack>
	);
};

export default Todo;
