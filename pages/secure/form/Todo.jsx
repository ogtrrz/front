import React, { useState, useEffect } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import _ from "lodash";
import useLocalStorageState from "use-local-storage-state";
import { post, patch, URL_EMPLOYEES, URL_TO_DOS } from "data/ApiData";
import moment from "moment";
// import dayjs from "dayjs";
// import format from "date-fns/format";
// import "dayjs/locale/es-mx";
import { updateArray } from "utils/arrays";
import { blueGrey } from "@mui/material/colors";
import HeaderDeleteEdit from "models/HeaderDeleteEdit";
import HeaderNew from "models/HeaderNew";
import DialogDelete from "models/DialogDelete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { DataGrid, esES } from "@mui/x-data-grid";
import FlagCircleIcon from "@mui/icons-material/FlagCircle";
import {
	Button,
	LinearProgress,
	Stack,
	Box,
	Paper,
	Typography,
	MenuItem,
	Breadcrumbs,
	TextField,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "dayjs/locale/es-mx";

const Todo = () => {
	const router = useRouter();

	const { Todo } = router.query;

	const [selectedFile, setSelectedFile] = useState(null);

	const [dateField, setDateField] = useState("");

	const [notaField, setNotaField] = useState("");

	const [employeeIo, setEmployeeIo] = useLocalStorageState("employee", {
		defaultValue: [],
	});

	const [todoIo, setTodoIo] = useLocalStorageState("todo", {
		defaultValue: [],
	});

	// useEffect(() => {
	//   if(Todo) {

	//   }

	// }, [Todo])

	const onCancel = () => {
		console.log("On Cancel");
		router.push(`/secure/view/employee/${employeeIo.id}`);
	};

	async function postForm() {
		console.log("notaField", notaField);
		console.log("dateField", dateField);
		// console.log("",);
		// const date = fechaExpiracion.format("YYYY-MM-DD") + "T00:00:00.001Z";
		let formData = new FormData();
		formData.append("files", selectedFile);
		const responseFile = await axios({
			method: "post",
			url: `${process.env.NEXT_PUBLIC_API_IMAGES}api/upload`,
			data: formData,
		});
		console.log("Sumited-1", responseFile);

		let postValues = {
			date: moment(dateField.$d).format("YYYY-MM-DD") + "T00:00:00.001Z",
			description: notaField,
			state: "NEW",
			link: responseFile.data[0].url,
			extra1: responseFile.data[0].name,
			id2Employee: employeeIo.id,
		};

		console.log("postValues", postValues);

		let employeeNew = _.cloneDeep(employeeIo);
		console.log("employeeNew", employeeNew);
		let arraytodos = employeeNew.todos;
		if (Todo) {
			postValues.id = Todo;
			const responseTodo = await patch(URL_TO_DOS, postValues);
			console.log("Response DATOS patch", responseTodo);
			updateArray(arraytodos, responseTodo);
		} else {
			const responseTodo = await post(URL_TO_DOS, postValues);
			console.log("Response DATOS post", responseTodo);
			arraytodos = [...arraytodos, responseTodo];
		}
		console.log("arraytodos", arraytodos);
		employeeNew.todos = arraytodos;
		console.log("employeeNew2", employeeNew);
		const emp = await patch(URL_EMPLOYEES, employeeNew);
		console.log("employeeNew3", emp);
		setEmployeeIo(emp);
		router.push(`/secure/view/employee/${employeeIo.id}`);
	}
	//http://localhost:1337/uploads/d3b110cd_e464_47a3_a505_544dd1efb3c7_2x_98d810f734.jpg?format=webp&height=200&q=80

	return (
		<Box sx={{ p: 3, border: "1px dashed grey" }}>
			<Stack spacing={2}>
				<Breadcrumbs
					separator={<NavigateNextIcon fontSize='small' color='primary' />}
					aria-label='Link al Inicio'>
					<NextLink href={`/`} passHref>
						<Typography
							sx={{
								"&:hover": {
									textDecoration: "underline",
								},
							}}
							color='primary.main'>
							Inicio
						</Typography>
					</NextLink>
					<NextLink href={`/secure/view/employee/${employeeIo.id}`} passHref>
						<Typography
							sx={{
								"&:hover": {
									textDecoration: "underline",
								},
							}}
							color='primary.main'>
							Mis Datos
						</Typography>
					</NextLink>

					<Typography color='text.primary'>{`Nueva Tarea`}</Typography>
				</Breadcrumbs>

				<Typography variant='h6' color={"primary"}>
					{`Nueva Tarea`}
				</Typography>
				<Typography variant='body1' color={blueGrey["A700"]}>
					{`Estatus: NEW`}
				</Typography>

				<LocalizationProvider
					dateAdapter={AdapterDayjs}
					adapterLocale={"es-mx"}>
					<DatePicker
						label='Fecha de la Evidencia'
						value={dateField}
						onChange={(newDate) => setDateField(newDate)}
					/>
				</LocalizationProvider>
				<TextField
					id='notes'
					label='Notas'
					variant='outlined'
					helperText='Agregar Notas de existir'
					value={notaField}
					onChange={(event) => {
						setNotaField(event.target.value);
					}}
				/>

				<Typography variant='body1' color={blueGrey["A700"]}>
					{selectedFile ? "Nombre del archivo: " + selectedFile.name : ""}
				</Typography>
				<Box>
					<Button
						variant='outlined'
						component='label'
						endIcon={<UploadFileIcon />}>
						Agregar Imagen
						<input
							hidden
							accept='image/*'
							multiple
							type='file'
							// value={selectedFile}
							onChange={(e) => setSelectedFile(e.target.files[0])}
						/>
					</Button>
				</Box>
				<br />
				<Stack direction={"row"} spacing={4}>
					<Button variant='contained' onClick={postForm} endIcon={<SaveIcon />}>
						Guardar
					</Button>
					<Button
						variant='outlined'
						onClick={onCancel}
						endIcon={<CancelIcon />}>
						Cancelar
					</Button>
				</Stack>
			</Stack>
		</Box>
	);
};

export default Todo;
