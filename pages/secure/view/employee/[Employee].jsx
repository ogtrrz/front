import React, { useState, useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";
import moment from "moment";
import _ from "lodash";
import { useRouter } from "next/router";
import { get, URL_EMPLOYEES } from "data/ApiData";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HeaderDeleteEdit from "models/HeaderDeleteEdit";
import HeaderNew from "models/HeaderNew";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { DataGrid, esES } from "@mui/x-data-grid";
import FlagCircleIcon from "@mui/icons-material/FlagCircle";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import {
	Button,
	LinearProgress,
	Stack,
	Box,
	Paper,
	Typography,
	MenuItem,
	Breadcrumbs,
	Link,
} from "@mui/material";

const Employee = () => {
	const columnTraining = [
		{
			field: "code",
			headerName: "Código",
			minWidth: 150,
			flex: 1,
			description: "Código del curso tomado.",
		},
		{
			field: "date",
			headerName: "Fecha",
			width: 80,
			renderCell: (params) => {
				return moment(params.date).format("DD/MM/YYYY");
			},
			description: "Fecha en la que se tomo el curso, con formato dd/mm/yyyy.",
		},
		{
			field: "expiry",
			headerName: "Expira",
			width: 80,
			renderCell: (params) => {
				return moment(params.expiry).format("M/YYYY");
			},
			description:
				"Es el mes en el que se requiera retomar un refresh del curso, con formato m/yyyy",
		},
	];

	const columnTodos = [
		{
			field: "state",
			headerName: "Estado",
			width: 80,
			renderCell: (params) => {
				return params.state; //TODO === "NEW" ? "Nuevo" : "Completado";
			},
			description: "Estatus de la tarea.",
		},
		{
			field: "date",
			headerName: "Vence",
			width: 80,
			renderCell: (params) => {
				return moment(params.date).format("M/YYYY");
			},
			description: "Mes en el que vence, con formato m/yyyy.",
		},
		{
			field: "extra1",
			headerName: "Archivo",
			width: 170,
			description: "Nombre del archivo.",
		},
		{
			field: "description",
			headerName: "Descripción",
			minWidth: 150,
			flex: 1,
			description: "Es la descripción de la tarea.",
		},
	];

	const columnHistoricData = [
		{
			field: "name",
			headerName: "Nombre",
			width: 200,
			description: "Código del curso tomado.",
		},
		{
			field: "extra1",
			headerName: "Notas",
			minWidth: 150,
			flex: 1,
			description: "Código del curso tomado.",
		},
		{
			field: "date",
			headerName: "Creado",
			width: 80,
			renderCell: (params) => {
				return moment(params.createdAt).format("DD/MM/YYYY");
			},
			description: "Fecha en la que se tomo el curso, con formato dd/mm/yyyy.",
		},
	];

	const router = useRouter();
	const { Employee } = router.query;
	const [employeeIo, setEmployeeIo] = useLocalStorageState("employee", {
		defaultValue: [],
	});

	const getEmployees = async () => {
		const res = await get(URL_EMPLOYEES, Employee);
		console.log("employee", res);
		setEmployeeState(res);
		setEmployeeIo(res);
	};
	const [employeeState, setEmployeeState] = useState();
	useEffect(() => {
		if (Employee) {
			getEmployees();
		}
	}, [Employee]);

	const handleNewTraining = () => {
		console.log("New Training");
		router.push(
			`/secure/form/TrainingCourseSelection?Employee=${employeeState.id}`
		);
	};

	const handleNewTodo = () => {
		console.log("New ToDo");
		router.push(`/secure/form/Todo?Employee=${employeeState.id}`);
	};

	const handleNewFile = () => {
		console.log("New File");
		router.push(`/secure/form/HistoricData?Employee=${employeeState.id}`);
	};

	const handleRowTrainingClick = (params) => {
		console.log("click en Row line 96");
		router.push(
			`/secure/view/training/${params.row.id}?Employee=${employeeState.id}`
		);
	};
	const handleRowTodosClick = (params) => {
		console.log("handleRowTodosClick");
		router.push(
			`/secure/view/todo/${params.row.id}?Employee=${employeeState.id}`
		);
	};
	const handleRowHistoricDataClick = (params) => {
		console.log("HistoricData Click", params.row.link);
		// router.push({ pathname: `${process.env.NEXT_PUBLIC_API_IMAGES}${params.row.link}`}, undefined, { shallow: true });
		router.push(`${process.env.NEXT_PUBLIC_API_IMAGES}${params.row.link}`);
	};

	const handleEdit = () => {
		console.log('handle Edit Mis Datos');
		router.push(
			`/secure/form/Employee`
		);
	}

	//TODO errores ux color del titulo titulo color de los datos de la tabla en celular no existe el hover, call to action no es consistente
	return (
		<Box sx={{ p: 3, border: "1px dashed grey" }}>
			<Stack direction='column' spacing={2}>
				<Breadcrumbs
					separator={<NavigateNextIcon fontSize='small' color='primary' />}
					aria-label='Link al Inicio'>
					<Link underline='hover' color='primary.main' href='/'>
						Inicio
					</Link>
					<Typography color='text.primary'>{`Mis Datos`}</Typography>
				</Breadcrumbs>
				<Stack direction='row' spacing={2}>
					<Typography variant='h6' color='primary'>
						{`Hola, ${employeeState?.firstName} ${employeeState?.lastName}.`}
					</Typography>
					<Button
						variant='outlined'
						endIcon={<ModeEditIcon />}
						onClick={(handleEdit)}>
						editar Mis Datos
					</Button>
				</Stack>

				<Typography variant='body1' color='text'>
					{`Usuario: ${employeeState?.user}`}
				</Typography>
				<Typography variant='body1' color='text'>
					{`Mi correo: ${employeeState?.email}`}
				</Typography>
				<Typography variant='body1' color='text'>
					{`Mi teléfono: ${employeeState?.phoneNumber}`}
				</Typography>
				<Typography variant='body1' color='text'>
					{`Fecha de contratación: ${moment(employeeState?.hireDate).format(
						"DD/MM/yyyy"
					)}`}
				</Typography>
				<Typography variant='body1' color='text'>
					{`Contacto de emergencia: ${employeeState?.emergencyContact}`}
				</Typography>
				<Typography variant='body1' color='text'>
					{`Teléfono de emergencia: ${employeeState?.emergencyPhone}`}
				</Typography>
				<Typography variant='body1' color='text'>
					{`Tipo sanguineo: ${employeeState?.blodeType}`}
				</Typography>
				<Typography variant='body1' color='text'>
					{`Alergias: ${employeeState?.allergies}`}
				</Typography>
				<Typography variant='body1' color='text'>
					{`Fecha de nacimiento: ${moment(employeeState?.birthDate).format(
						"DD/MM/yyyy"
					)}`}
				</Typography>
				<Typography variant='body1' color='text'>
					{`Notas: ${employeeState?.note}`}
				</Typography>
				<br />
				<Accordion>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon color='primary' />}
						aria-controls='panel1a-content'
						id='panel1a-header'>
						<Stack direction='row' spacing={2}>
							<Typography variant='subtitle2' color='secondary'>
								Entrenamientos
							</Typography>
							<Button
								variant='contained'
								endIcon={<AddCircleIcon />}
								onClick={handleNewTraining}>
								Nuevo Entrenamiento
							</Button>
						</Stack>
					</AccordionSummary>
					<AccordionDetails>
						<div style={{ height: 300, width: "100%" }}>
							{employeeState?.trainings ? (
								<DataGrid
									rows={employeeState.trainings}
									columns={columnTraining}
									onRowClick={handleRowTrainingClick}
									localeText={
										esES.components.MuiDataGrid.defaultProps.localeText
									}
									sx={{
										"& .MuiDataGrid-columnHeaders": {
											// backgroundColor: "white",
											color: "primary.main",
											//fontWeight: "bold" no sirve
											// fontSize: 14,
										},
										".MuiDataGrid-cell:focus": {
											outline: "none",
										},
										"& .MuiDataGrid-row:hover": {
											cursor: "pointer",
										},
									}}
								/>
							) : (
								""
							)}
						</div>
					</AccordionDetails>
				</Accordion>
				<Accordion>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon color='primary' />}
						aria-controls='panel2a-content'
						id='panel2a-header'>
						<Stack direction='row' spacing={2}>
							<Typography variant='subtitle2' color='secondary'>
								Tareas
							</Typography>
							<Button
								variant='contained'
								endIcon={<AddCircleIcon />}
								onClick={handleNewTodo}>
								Nueva Tarea
							</Button>
						</Stack>
					</AccordionSummary>
					<AccordionDetails>
						<div style={{ height: 300, width: "100%" }}>
							{employeeState?.todos ? (
								<DataGrid
									rows={employeeState.todos}
									columns={columnTodos}
									onRowClick={handleRowTodosClick}
									localeText={
										esES.components.MuiDataGrid.defaultProps.localeText
									}
									sx={{
										"& .MuiDataGrid-columnHeaders": {
											// backgroundColor: "white",
											color: "primary.main",
											//fontWeight: "bold" no sirve
											// fontSize: 14,
										},
										".MuiDataGrid-cell:focus": {
											outline: "none",
										},
										"& .MuiDataGrid-row:hover": {
											cursor: "pointer",
										},
									}}
								/>
							) : (
								""
							)}
						</div>
					</AccordionDetails>
				</Accordion>
				<Accordion>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon color='primary' />}
						aria-controls='panel2a-content'
						id='panel2a-header'>
						<Stack direction='row' spacing={2}>
							<Typography variant='subtitle2' color='secondary'>
								Archivos
							</Typography>
							<Button
								variant='contained'
								endIcon={<AddCircleIcon />}
								onClick={handleNewFile}>
								Nuevo Archivo
							</Button>
						</Stack>
					</AccordionSummary>
					<AccordionDetails>
						<div style={{ height: 300, width: "100%" }}>
							{employeeState?.historicData ? (
								<DataGrid
									rows={employeeState.historicData}
									columns={columnHistoricData}
									onRowClick={handleRowHistoricDataClick}
									localeText={
										esES.components.MuiDataGrid.defaultProps.localeText
									}
									sx={{
										"& .MuiDataGrid-columnHeaders": {
											// backgroundColor: "white",
											color: "primary.main",
											//fontWeight: "bold" no sirve
											// fontSize: 14,
										},
										".MuiDataGrid-cell:focus": {
											outline: "none",
										},
										"& .MuiDataGrid-row:hover": {
											cursor: "pointer",
										},
									}}
								/>
							) : (
								""
							)}
						</div>
					</AccordionDetails>
				</Accordion>
			</Stack>
		</Box>
	);
};

export default Employee;
