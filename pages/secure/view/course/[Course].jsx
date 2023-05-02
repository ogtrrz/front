import React, { useState, useEffect } from "react";
// import axios from "axios";
import useLocalStorageState from "use-local-storage-state";
import { useRouter } from "next/router";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {
	Button,
	LinearProgress,
	Stack,
	Box,
	Paper,
	Typography,
	MenuItem,
	Link,
	Pagination,
	Breadcrumbs,
	FormControl,
	InputLabel,
	Select,
} from "@mui/material";
import { DataGrid, esES } from "@mui/x-data-grid";

const Course = () => {
	const router = useRouter();

	const [courseIo, setCourseIo, { isPersistent }] = useLocalStorageState(
		"course",
		{
			defaultValue: [],
		}
	);

	const columns = [
		{ field: "code", headerName: "Código", width: 200 },
		{
			field: "kind",
			headerName: "Tipo",
			width: 60,
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
			field: "expirationInMonth",
			headerName: "Expira",
			type: "number",
			width: 80,

			description:
				"Es el número de meses de duración antes de que se requiera retomar un refresh del curso.",
		},
		{ field: "description", headerName: "Descripción", minWidth: 150, flex: 1 },
	];

	const handleNewRequirement = () => {
		router.push(`/secure/form/Requirents`);
	};

	const handleRowClick = (params) => {
		console.log("row", params.row);
		router.push(
			`/secure/view/requirent/${params.row.id}?Course=${courseIo.id}`
		);
	};

	return (
		<Box sx={{ p: 3, border: "1px dashed grey" }}>
			<Stack direction='column' spacing={2}>
				<Breadcrumbs
					separator={<NavigateNextIcon fontSize='small' color='primary' />}
					aria-label='Link al Inicio'>
					<Link underline='hover' color='primary.main' href='/'>
						Inicio
					</Link>
					<Link
						underline='hover'
						color='primary.main'
						href='/secure/view/Courses'>
						Lista de Cursos
					</Link>
					<Typography color='text.primary'>{`Curso: ${courseIo?.name}`}</Typography>
				</Breadcrumbs>
				<Stack direction='row' spacing={2}>
					<Typography variant='h6' color='primary'>
						{courseIo?.name}
					</Typography>
				</Stack>
			</Stack>

			<Typography variant='body1' color='text'>
				{courseIo?.code}
			</Typography>

			<Typography variant='body1' color='text'>
				{courseIo?.typeCourse === "PRESENT"
					? "Presente"
					: courseIo?.typeCourse === "REMOTE"
					? "Remoto"
					: courseIo?.typeCourse === "ONLINE"
					? "Online"
					: courseIo?.typeCourse}
			</Typography>
			<Typography variant='body1' color='text'>
				{courseIo?.expirationInMonth}
			</Typography>
			<Typography variant='body1' color='text'>
				{courseIo?.link}
			</Typography>
			<Typography variant='body1' color='text'>
				{courseIo?.description}
			</Typography>
			<Typography variant='body1' color='text'>
				{courseIo?.durationAuthorizationInMonth}
			</Typography>
			<br />

			<Stack direction='row' spacing={2}>
				<Typography variant='h6' color='primary'>
					Requerimientos
				</Typography>

				<Button
					variant='contained'
					endIcon={<AddCircleIcon />}
					onClick={handleNewRequirement}>
					Nuevo Requerimiento
				</Button>
			</Stack>
			<br />
			<div style={{ height: 300, width: "100%" }}>
				{courseIo?.requirents ? (
					<DataGrid
						rows={courseIo.requirents}
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
		</Box>
	);
};

export default Course;
