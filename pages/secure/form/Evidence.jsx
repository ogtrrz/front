import React, { useState, useEffect } from "react";
import axios from "axios";
import useLocalStorageState from "use-local-storage-state";
import moment from "moment";
import { useRouter } from "next/router";
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
	const [employeeIo, setEmployeeIo] = useLocalStorageState("employee", {
		defaultValue: [],
	});
	const router = useRouter();
	const { Evidence, Training } = router.query;
	const [selectedFile, setSelectedFile] = useState(null);

	const [evidenceState, setEvidenceState] = useState();

	const [fechaExpiracion, setFechaExpiracion] = useState();
	const handlerChangueDate = (fecha) => {
		setFechaExpiracion(fecha);
	};

	useEffect(() => {
		if (Evidence) {
			console.log("employeeIo", employeeIo);
			console.log("Evidence", Evidence);
			console.log("Traning", Training);
			const TrainingIo = employeeIo?.trainings.find((obj) => {
				return obj.id == Training;
			});
			const EvidenceIo = TrainingIo?.evidences.find((obj) => {
				return obj.id == Evidence;
			});
			setEvidenceState(EvidenceIo);

			console.log("TrainingIo", TrainingIo);
			console.log("EvidenceIo", EvidenceIo);
		}
	}, [Evidence, Training]);

	async function postForm(values) {
		console.log("Values post-0", values);
		const date = fechaExpiracion.format("YYYY-MM-DD") + "T00:00:00.01Z";
		let formData = new FormData();
		formData.append("files", selectedFile);
		await axios({
			method: "post",
			url: `${process.env.NEXT_PUBLIC_API_IMAGES}api/upload`,
			data: formData,
		})
			.then((responseFile) => {
				console.log("Upload Response", responseFile.data);
				const postValues = {
					id: Evidence,
					note: values.evidence_description,
					extra3: date,
					link: responseFile.data[0].url,
					id2Trining: Training,
					state: "CHECK",
				};
				console.log("postValues", postValues);
				const config = {
					method: "patch",
					url: `${process.env.NEXT_PUBLIC_API_REST}evidences/${Evidence}`, //"http://localhost:8080/api/evidences",
					headers: {
						"Content-Type": "application/json",
					},
					data: postValues,
				};

				axios(config)
					.then(function (response) {
						console.log("Response DATOS 2", response.data);
						const config = {
							method: "get",
							url: `${process.env.NEXT_PUBLIC_API_REST}employees/${employeeIo.id}`,
							headers: {},
						};

						axios(config)
							.then(function (response) {
								console.log(response.data);
								setEmployeeIo(response.data);
								router.push(`/secure/view/training/${Training}`);
							})
							.catch(function (error) {
								console.log(error);
							});
					})
					.catch(function (error) {
						console.log("Error-2", error);
					});
			})
			.catch(function (error) {
				console.log("Error-1", error);
			});
	}
	//TODO debemos actualizar el cache
	return (
		<Paper elevation={3}>
			<Typography variant='h6' color='primary'>
				{`Mis Evidencias ${evidenceState?.description}`}
			</Typography>
			<Typography variant='body2'>{`${evidenceState?.state}`}</Typography>
			<Typography variant='body2'>
				{`Expira dentro de ${evidenceState?.extra1} meses, de tipo ${evidenceState?.kind}`}
			</Typography>
			<Formik
				initialValues={{
					is_complete: false,
					evidence_description: "",
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
										label='Notas'
										name='evidence_description'
									/>
									<Box>
										<Field
											component={DatePicker}
											name='evidence_date'
											label='Fecha'
											value={fechaExpiracion}
											onChange={handlerChangueDate}
											ampm={true}
										/>
										<Typography variant='body2' color='primary'>
											Fecha de la Evidencia
										</Typography>
									</Box>
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
