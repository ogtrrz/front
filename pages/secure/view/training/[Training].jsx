import React, { useState, useEffect } from "react";
import NextLink from "next/link";
import useLocalStorageState from "use-local-storage-state";
import moment from "moment";
import { useRouter } from "next/router";
import { patch, del, URL_EMPLOYEES, URL_TRAININGS } from "data/ApiData";
import { blueGrey } from "@mui/material/colors";
import { DataGrid, esES } from "@mui/x-data-grid";
import HeaderDeleteEdit from "models/HeaderDeleteEdit";
import HeaderNew from "models/HeaderNew";
import DialogDelete from "models/DialogDelete";
import ReqTrainEvidence from "models/ReqTrainEvidence";
import FlagCircleIcon from "@mui/icons-material/FlagCircle";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {
	Button,
	LinearProgress,
	Stack,
	Box,
	Paper,
	Typography,
	MenuItem,
	Pagination,
	Breadcrumbs,
	FormControl,
	InputLabel,
	Select,
} from "@mui/material";

const Training = () => {
	const columns = [
		{
			field: "state",
			headerName: "Estado",
			width: 100,
			renderCell: (params) => {
				return params.state; //TODO no quiere tomar el valor === "NEW" ? 'Nuevo' : "Completado";
			},
		},
		{
			field: "kind",
			headerName: "Tipo",
			width: 100,
			renderCell: (params) => {
				return params.value === "CERTIFICATE"
					? "Certificación"
					: params.value === "ONTHEJOB"
					? "En el Trabajo"
					: params.value === "COURSE"
					? "Curso"
					: params.value;
			},
		},
		{
			field: "expiration",
			headerName: "Expira",
			width: 80,
			renderCell: (params) => {
				return moment(params.expiration).format("M/YYYY");
			},
			description:
				"Es el número de meses de duración antes de que se requiera retomar un refresh del curso.",
		},
		{ field: "description", headerName: "Descripción", minWidth: 150, flex: 1 },
	];

	const [open, setOpen] = useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	const router = useRouter();

	const { Training } = router.query;

	const [traningState, setTraningState] = useState();

	useEffect(() => {
		if (Training) {
			const dataio = employeeIo.trainings.find((obj) => {
				return obj.id == Training;
			});
			setTraningState(dataio);

			console.log("dataio", dataio);
			console.log("Employee", employeeIo);
		}
	}, [Training]);

	const [employeeIo, setEmployeeIo] = useLocalStorageState("employee", {
		defaultValue: [],
	});

	const [traningIo, setTraningIo] = useLocalStorageState("traning", {
		defaultValue: [],
	});

	const [evidenceIo, setEvidenceIo] = useLocalStorageState("evidence", {
		defaultValue: [],
	});

	const handleEdit = () => {
		console.log("handleEdit");
		setTraningIo(traningState);
		router.push(`/secure/form/TrainingEdit?Employee=${employeeIo.id}`);
	};

	const handleDelete1 = () => {
		console.log("handleDelete1");
		setOpen(true);
	};

	const handleDelete2 = async () => {
		console.log("handleDelete2");
		setOpen(false);
		//TODO Borra training

		const newEmployee = _.cloneDeep(employeeIo);
		const trainings = newEmployee.trainings;

		_.remove(trainings, (o) => o.id == traningState.id);
		// console.log("removed", removed);
		const returnEmployee = await patch(URL_EMPLOYEES, newEmployee);
		console.log("patch", returnEmployee);
		await del(URL_TRAININGS, traningState.id);
		setEmployeeIo(returnEmployee);

		router.push(`/secure/view/employee/${returnEmployee.id}`);
	};

	const handleNewEvidence = () => {
		console.log("handleNewEvidence");
		// router.push(`/secure/form/Requirents`);
	};

	const handleRowClick = (params) => {
		console.log("row", params.row);
		setEvidenceIo(params.row);
		setTraningIo(traningState)
		router.push(
			`/secure/view/evidence/${params.row.id}?Employee=${employeeIo.id}&Traning=${traningIo.id}`
		);
	};

	//TODO valor de expira en la tabla
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
					<Typography color='text.primary'>{`Entrenamiento: ${traningState?.code}`}</Typography>
				</Breadcrumbs>
				<HeaderDeleteEdit
					title={`${traningState?.code}`}
					onDelete={handleDelete1}
					onEdit={handleEdit}
				/>
			</Stack>

			<Typography variant='body1' color={blueGrey["A700"]}>
				{`Nombre: ${traningState?.extra1}`}
			</Typography>
			<Typography variant='body1' color={blueGrey["A700"]}>
				{`Descripción: ${traningState?.extra2}`}
			</Typography>
			<Typography variant='body1' color={blueGrey["A700"]}>
				{`Tipo: ${traningState?.extra3}`}
			</Typography>
			<Typography variant='body1' color={blueGrey["A700"]}>
				{`Autorizado por: ${traningState?.extra4}`}
			</Typography>
			<Typography variant='body1' color={blueGrey["A700"]}>
				{`Link ${traningState?.extra5}`}
			</Typography>

			<Typography variant='body1' color={blueGrey["A700"]}>
				{`Tomado el: ${moment(traningState?.date).format("M/yyyy")}`}
			</Typography>
			<Typography variant='body1' color={blueGrey["A700"]}>
				{`Expira el ${moment(traningState?.expiry).format("M/yyyy")}`}
			</Typography>
			<Typography variant='body1' color={blueGrey["A700"]}>
				{traningState?.course?.code}
			</Typography>
			<br />
			<HeaderNew title='Evidencias' onNew={handleNewEvidence} />
			<p>
				Yo creo que aqui no van nuevos requerimientos el boton no va, preguntar?
			</p>
			<br />
			<div style={{ height: 300, width: "100%" }}>
				{traningState?.evidences ? (
					<DataGrid
						rows={traningState.evidences}
						columns={columns}
						onRowClick={handleRowClick}
						localeText={esES.components.MuiDataGrid.defaultProps.localeText}
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

			<DialogDelete
				onOpen={open}
				on_Close={handleClose}
				onCancel={handleClose}
				onOk={handleDelete2}
			/>
		</Box>
	);
};

export default Training;
