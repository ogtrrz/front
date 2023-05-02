import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import _ from "lodash";
import useLocalStorageState from "use-local-storage-state";
import { post, patch, URL_EMPLOYEES, URL_TO_DOS } from "data/ApiData";
import moment from "moment";
import dayjs from "dayjs";
import format from "date-fns/format";
import "dayjs/locale/es-mx";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import CircularProgress from "@mui/material/CircularProgress";
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
	const router = useRouter();
	const { Todo } = router.query;
	const [selectedFile, setSelectedFile] = useState(null);

	const [fechaExpiracion, setFechaExpiracion] = useState();
	const [employeeIo, setEmployeeIo] = useLocalStorageState("employee", {
		defaultValue: [],
	});

	const handlerChangueExpirationDate = (fecha) => {
		setFechaExpiracion(fecha);
	};
	// let todoIo = null; 
	// useEffect(() => {
	// 	if (Todo) {
	// 		console.log("Todo", Todo);
	// 		todoIo = employeeIo.todos.find((obj) => {
	// 			return obj.id == Todo;
	// 		});
	// 		console.log("todoIo", todoIo);
	// 	}
	// }, [Todo]);

	const [todoIo, setTodoIo] = useLocalStorageState("todo", {
		defaultValue: [],
	});

	async function postForm(values) {
		console.log("Values post-0", values);
		const date = fechaExpiracion.format("YYYY-MM-DD") + "T00:00:00.001Z";
		let formData = new FormData();
		formData.append("files", selectedFile);
		const responseFile = await axios({
			method: "post",
			url: `${process.env.NEXT_PUBLIC_API_IMAGES}api/upload`,
			data: formData,
		});
		console.log("Sumited-1", responseFile);
		const postValues = JSON.stringify({
			date: date,
			description: values.todo_description,
			state: values.is_complete ? "CHECK" : "NEW",
			link: responseFile.data[0].url,
			id2Employee: employeeIo.id,
		});

		const responseTodo = await post(URL_TO_DOS, postValues);
		console.log("Response DATOS 2", responseTodo);

		let employeeNew = _.cloneDeep(employeeIo);
		console.log("employeeNew", employeeNew);
		let arraytodos = employeeNew.todos;
		arraytodos = [...arraytodos, responseTodo];
		employeeNew.todos = arraytodos;
		console.log("employeeNew2", employeeNew);
		const emp = await patch(URL_EMPLOYEES, employeeNew);
		console.log(emp);
		setEmployeeIo(emp);
		router.push(`/secure/view/employee/${employeeNew.id}`);
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
						enableReinitialize
						initialValues={{
							is_complete: todoIo?.state == "CHECK" ? true : false ,
							todo_description: todoIo ? todoIo.description : "",
							
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
