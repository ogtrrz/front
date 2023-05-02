import React, { useState, useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";
import moment from "moment";
import { useRouter } from "next/router";
import { get, URL_EMPLOYEES } from "data/ApiData";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FlagCircleIcon from "@mui/icons-material/FlagCircle";
import {
	Button,
	LinearProgress,
	Stack,
	Box,
	Paper,
	Typography,
	MenuItem,
} from "@mui/material";

const Employee = () => {
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

	//TODO errores ux color del titulo titulo color de los datos de la tabla en celular no existe el hover, call to action no es consistente
	return (
		<>
			<Typography variant='h6' color='primary'>
				{employeeState?.user}
			</Typography>
			<Typography variant='body1' color='text'>
				{employeeState?.firstName}
			</Typography>
			<Typography variant='body1' color='text'>
				{employeeState?.lastName}
			</Typography>
			<Typography variant='body1' color='text'>
				{employeeState?.email}
			</Typography>
			<Typography variant='body1' color='text'>
				{employeeState?.phoneNumber}
			</Typography>
			<Typography variant='body1' color='text'>
				{employeeState?.hireDate}
			</Typography>
			<Typography variant='body1' color='text'>
				{employeeState?.emergencyContact}
			</Typography>
			<Typography variant='body1' color='text'>
				{employeeState?.emergencyPhone}
			</Typography>
			<Typography variant='body1' color='text'>
				{employeeState?.blondeType}
			</Typography>
			<Typography variant='body1' color='text'>
				{employeeState?.allergies}
			</Typography>
			<Typography variant='body1' color='text'>
				{employeeState?.birthDate}
			</Typography>
			<Typography variant='body1' color='text'>
				{employeeState?.note}
			</Typography>

			<Accordion>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon color='primary' />}
					aria-controls='panel1a-content'
					id='panel1a-header'>
					<Typography variant='subtitle2' color='primary'>
						Entrenamientos
					</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Button
						variant='contained'
						endIcon={<AddCircleIcon />}
						onClick={handleNewTraining}>
						Nuevo Entrenamiento
					</Button>
					<TableContainer component={Paper}>
						<Table sx={{ minWidth: 650 }} aria-label='courses table'>
							<TableHead>
								<TableRow>
									<TableCell align='left'>Código</TableCell>
									<TableCell align='left'>Fecha</TableCell>
									<TableCell align='left'>Expira&nbsp;(Meses)</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{employeeState?.trainings?.map((item) => (
									<TableRow
										key={item.id}
										sx={{
											"&:last-child td, &:last-child th": { border: 0 },
											":hover": {
												bgcolor: "#A43357",
											},
										}}
										onClick={() => {
											router.push(`/secure/view/training/${item.id}`);
										}}
										style={{ cursor: "pointer" }}>
										<TableCell align='left'>{item?.code}</TableCell>
										<TableCell align='left'>
											{item ? moment(item.date).format("M/YYYY") : ""}
										</TableCell>
										<TableCell align='left' color='text'>
											{item ? moment(item.expiry).format("M/YYYY") : ""}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</AccordionDetails>
			</Accordion>
			<Accordion>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon color='primary' />}
					aria-controls='panel2a-content'
					id='panel2a-header'>
					<Typography variant='subtitle2' color='primary'>
						Tareas
					</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Button
						variant='contained'
						endIcon={<AddCircleIcon />}
						onClick={handleNewTodo}>
						Nueva Tarea
					</Button>
					<TableContainer component={Paper}>
						<Table sx={{ minWidth: 650 }} aria-label='courses table'>
							<TableHead>
								<TableRow>
									<TableCell align='left'>Estado</TableCell>
									<TableCell align='left'>Vence</TableCell>
									<TableCell align='left'>Descripción</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{employeeState?.todos?.map((item) => (
									<TableRow
										key={item.id}
										sx={{
											"&:last-child td, &:last-child th": { border: 0 },
											":hover": {
												bgcolor: "#A43357",
											},
										}}
										onClick={() => {
											router.push(`/secure/view/todo/${item.id}`);
										}}
										style={{ cursor: "pointer" }}>
										<TableCell align='left'>{item?.state}</TableCell>
										<TableCell align='left'>
											{item ? moment(item.date).format("M/YYYY") : ""}
										</TableCell>
										<TableCell align='left'>{item?.description}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</AccordionDetails>
			</Accordion>
			<Accordion>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon color='primary' />}
					aria-controls='panel2a-content'
					id='panel2a-header'>
					<Typography variant='subtitle2' color='primary'>
						Archivos
					</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Button
						variant='contained'
						endIcon={<AddCircleIcon />}
						onClick={handleNewFile}>
						Nuevo Archivo
					</Button>
					<TableContainer component={Paper}>
						<Table sx={{ minWidth: 650 }} aria-label='courses table'>
							<TableHead>
								<TableRow>
									<TableCell align='left'>Nombre</TableCell>
									<TableCell align='left'>Creado</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{employeeState?.historicData?.map((item) => (
									<TableRow
										key={item.id}
										sx={{
											"&:last-child td, &:last-child th": { border: 0 },
											":hover": {
												bgcolor: "#A43357",
											},
										}}
										onClick={() => {
											router.push(
												`${process.env.NEXT_PUBLIC_API_IMAGES}${item.link}`
											);
										}}
										style={{ cursor: "pointer" }}>
										<TableCell align='left'>{item?.name}</TableCell>
										<TableCell align='left'>
											{item ? moment(item.createdAt).format("DD/MM/YYYY") : ""}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</AccordionDetails>
			</Accordion>
		</>
	);
};

export default Employee;
