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

const HistoricData = () => {
	const [selectedFile, setSelectedFile] = useState(null);

	async function postForm(values) {
		console.log("Values post-0", values);
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
					name: values.historic_data_description,
					link: responseFile.data[0].url,
					employee: {
						id: 10,
					},
				});
				const config = {
					method: "post",
					url: "http://localhost:8080/api/historic-data",
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
		<Stack justifyContent='center' alignItems='center'>
			<Paper elevation={3}>
				<Stack
					spacing={{ xs: 1, sm: 2, md: 4 }}
					alignItems='left'
					justifyContent='left'
					paddingX={{ xs: 1, sm: 2, md: 4 }}
					paddingY={{ xs: 1, sm: 1, md: 2 }}>
					<Typography variant='h6' color='primary'>
						Mis Archivos
					</Typography>
					<Formik
						initialValues={{
							historic_data_description: "",
						}}
						validationSchema={yup.object({
							historic_data_description: yup
								.string("Ingresar la descripción")
								.required("Es requerido"),
						})}
						onSubmit={(values, { setSubmitting }) => {
							setSubmitting(false);
							console.log("Values", values);
							postForm(values);
						}}>
						{({ submitForm, isSubmitting }) => (
							<>
								<Form>
									<Field
										component={TextField}
										type='text'
										label='Descripción'
										name='historic_data_description'
									/>
									<Field
										component={TextField}
										type='text'
										label='Link'
										name='historic_data_link'
									/>
								</Form>
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

export default HistoricData;
