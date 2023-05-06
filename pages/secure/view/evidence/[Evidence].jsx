import React, { useState, useEffect } from "react";
import NextLink from "next/link";
import axios from "axios";
import useLocalStorageState from "use-local-storage-state";
import moment from "moment";
import _ from "lodash";
import { useRouter } from "next/router";
import { patch, get, URL_EMPLOYEES, URL_EVIDENCES } from "data/ApiData";
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

const Evidence = () => {
	const router = useRouter();

	const { Employee, Traning } = router.query;

	const [employeeIo, setEmployeeIo] = useLocalStorageState("employee", {
		defaultValue: [],
	});

	const [traningIo, setTraningIo] = useLocalStorageState("traning", {
		defaultValue: [],
	});

	const [evidenceIo, setEvidenceIo] = useLocalStorageState("evidence", {
		defaultValue: [],
	});

	const [selectedFile, setSelectedFile] = useState(null);

	const [isEdit, setIsEdit] = useState(false);

	const [notaField, setNotaField] = useState("");

	const [dateField, setDateField] = useState("");

	useEffect(() => {
		if (evidenceIo.state === "NEW") {
			console.log("Nuevo");
			setIsEdit(true);
		} else {
			console.log("Distinto a Nuevo");
		}
	}, []);

	const handleCheck = async () => {
		console.log("handleCheck", notaField);
		//const date = fechaExpiracion.format("YYYY-MM-DD") + "T00:00:00.01Z";
		// extra2 fechade la evidencia YYYY-MM-DDT00:00:00.01Z
		// extra1 duracion de la evidencia meses
		// extra3 fechal vencimiento de la evidencia YYYY-MM-DDT00:00:00.01Z
		let formData = new FormData();
		formData.append("files", selectedFile);
		const responseFile = await axios({
			method: "post",
			url: `${process.env.NEXT_PUBLIC_API_IMAGES}api/upload`,
			data: formData,
		});
		console.log("Upload Response", responseFile.data);
		const newEvidence = _.cloneDeep(evidenceIo);
		newEvidence.link = responseFile ? responseFile.data[0].url : "";
		newEvidence.extra2 =
			moment(dateField.$d).format("YYYY-MM-DD") + "T00:00:00.01Z";
		newEvidence.expiration =
			moment(dateField.$d).add(evidenceIo.extra1, "M").format("YYYY-MM-DD") +
			"T00:00:00.01Z";
		newEvidence.extra4 = responseFile ? responseFile.data[0].name : "";
		newEvidence.state = "CHECK";
		newEvidence.note = notaField;
		const res = await patch(URL_EVIDENCES, newEvidence);
		setEvidenceIo(res);
		console.log("newEvidence", res);

		let newTraining = _.cloneDeep(traningIo);
		console.log("newTraining1", newTraining);
		updateArray(newTraining.evidences, res);
		setTraningIo(newTraining);
		console.log("newTraining2", newTraining);

		let newEmployee = _.cloneDeep(employeeIo);
		console.log("newEmployee1", newEmployee);
		updateArray(newEmployee.trainings, newTraining);
		setEmployeeIo(newEmployee);
		console.log("newEmployee2", newEmployee);
		//TODO refrescar todos los cache traning employee
		router.push(`/secure/view/training/${traningIo.id}`);
	};

	const handleModify = () => {
		console.log("handle edit");
		setIsEdit(true);
	};

	return (
		<Box sx={{ p: 3, border: "1px dashed grey" }}>
			<Stack direction='column' spacing={2}>
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
					<NextLink href={`/secure/view/training/${traningIo.id}`} passHref>
						<Typography
							sx={{
								"&:hover": {
									textDecoration: "underline",
								},
							}}
							color='primary.main'>
							{`${traningIo.code}`}
						</Typography>
					</NextLink>
					<Typography color='text.primary'>{`Evidencia: ${evidenceIo?.description}`}</Typography>
				</Breadcrumbs>

				<Typography variant='h6' color={"primary"}>
					{`${evidenceIo?.description}`}
				</Typography>
				<Typography variant='body1' color={blueGrey["A700"]}>
					{`Estatus: ${evidenceIo?.state}`}
				</Typography>
				<Typography variant='body1' color={blueGrey["A700"]}>
					{`Tipo: ${evidenceIo?.kind}`}
				</Typography>

				{isEdit ? (
					<LocalizationProvider
						dateAdapter={AdapterDayjs}
						adapterLocale={"es-mx"}>
						<DatePicker
							label='Fecha de la Evidencia'
							value={dateField}
							onChange={(newDate) => setDateField(newDate)}
						/>
					</LocalizationProvider>
				) : (
					<Typography variant='body1' color={blueGrey["A700"]}>
						{`Fecha de la Evidencia: ${moment(evidenceIo?.extra2).format(
							"M/YYYY"
						)}`}
					</Typography>
				)}

				{isEdit ? (
					<Typography variant='body1' color={blueGrey["A700"]}>
						{`Duración de la Evidencia: ${evidenceIo?.extra1} meses.`}
					</Typography>
				) : (
					<Typography variant='body1' color={blueGrey["A700"]}>
						{`Expiración de la Evidencia: ${moment(
							evidenceIo?.expiration
						).format("M/YYYY")}`}
					</Typography>
				)}

				{isEdit ? (
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
				) : (
					<Typography variant='body1' color={blueGrey["A700"]}>
						{`Notas: ${evidenceIo?.note}`}
					</Typography>
				)}

				{isEdit ? (
					<Stack spacing={2}>
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
					</Stack>
				) : (
					<NextLink
						href={`/files${evidenceIo?.link}?format=webp&height=800&q=80`}
						passHref
						target='_'>
						<Typography
							color='secondary.main'
							sx={{
								"&:hover": {
									textDecoration: "underline",
								},
							}}>
							{`Ver evidencia: ${evidenceIo?.extra4}`}
						</Typography>
					</NextLink>
				)}
				<br />
				<Box>
					{isEdit ? (
						<Stack direction={"row"} spacing={4}>
							<Button
								variant='contained'
								onClick={handleCheck}
								endIcon={<SaveIcon />}>
								Marcar como cumplido
							</Button>
							<Button
								variant='outlined'
								onClick={() => setIsEdit(false)}
								endIcon={<CancelIcon />}>
								Cancelar
							</Button>
						</Stack>
					) : (
						<Button
							variant='contained'
							onClick={handleModify}
							endIcon={<EditIcon />}>
							Modificar evidencia
						</Button>
					)}
				</Box>
			</Stack>
		</Box>
	);
};

export default Evidence;
