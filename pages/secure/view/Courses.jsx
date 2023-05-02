import React, { useState, useEffect } from "react";
// import axios from "axios";
import useLocalStorageState from "use-local-storage-state";
import { useRouter } from "next/router";
import { gets, URL_COURSES } from "data/ApiData";
import FlagCircleIcon from "@mui/icons-material/FlagCircle";
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

// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
import { DataGrid, esES } from "@mui/x-data-grid";
import RefreshIcon from "@mui/icons-material/Refresh";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import AddCircleIcon from "@mui/icons-material/AddCircle";
// import { useDemoData } from '@mui/x-data-grid-generator';

const Courses = ({ training, setCourse }) => {
	const router = useRouter();

	// const [courses, setCourses] = useState();

	// const [totalCount, setTotalCount] = useState();

	const [coursesIo, setCoursesIo, { isPersistent }] = useLocalStorageState(
		"courses",
		{
			defaultValue: [],
		}
	);

	const [coursesIoTime, setCoursesIoTime] = useLocalStorageState(
		"coursesTime",
		{
			defaultValue: [],
		}
	);

	const [courseIo, setCourseIo] = useLocalStorageState("course", {
		defaultValue: [],
	});

	useEffect(() => {
		if (Date.now() - coursesIoTime > 1000 * 60 * 60 * 24 * 7) {
			getCourses();
			setCoursesIoTime(Date.now());
		}
	}, []);

	//-----------------------------
	const getCourses = async () => {
		const coursesData = await gets(URL_COURSES, 0, 10, "id,asc");
		// console.log("response", coursesData.data);
		// console.log("===========================================");
		//setTotalCount(coursesData.headers["x-total-count"]);
		// setCourses(coursesData.data);
		setCoursesIo(coursesData.data);
	};

	const columns = [
		{ field: "code", headerName: "Código", width: 150 },
		{
			field: "autorizationBy",
			headerName: "Vo.Bo.",
			width: 40,
			sortable: false,

			description: "Notifica si es necesaria la Autorización.",
			renderCell: (params) => {
				return params.value ? <FlagCircleIcon color='secondary' /> : "";
			},
		},
		{
			field: "typeCourse",
			headerName: "Tipo",
			width: 60,
			renderCell: (params) => {
				return params.value === "PRESENT"
					? "Presente"
					: params.value === "REMOTE"
					? "Remoto"
					: params.value === "ONLINE"
					? "Online"
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
		{ field: "name", headerName: "Nombre", width: 150 },
		{ field: "description", headerName: "Descripcion", minWidth: 150, flex: 1 },
	];

	const handleRowClick = (params) => {
		console.log("row", params.row);
		setCourseIo(params.row);
		router.push(`course/${params.row.id}`);
	};

	const handleRefresh = () => {
		// console.log("refresh");
		getCourses();
		setCoursesIoTime(Date.now());
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
					<Typography color='text.primary'>Lista de Cursos</Typography>
				</Breadcrumbs>
				<Stack direction='row' spacing={2}>
					<Typography variant='h6' color='primary'>
						Cursos
					</Typography>
					<Button
						variant='outlined'
						color='primary'
						//disabled={isSubmitting}
						endIcon={<RefreshIcon />}
						onClick={handleRefresh}>
						Actualizar
					</Button>
					<Button
						variant='contained'
						color='primary'
						//disabled={isSubmitting}
						endIcon={<AddCircleIcon />}
						onClick={handleRefresh}>
						Nuevo
					</Button>
				</Stack>
			</Stack>
			<br />
			<div style={{ height: 600, width: "100%" }}>
				{coursesIo ? (
					<DataGrid
						rows={coursesIo}
						columns={columns}
						onRowClick={handleRowClick}
						localeText={esES.components.MuiDataGrid.defaultProps.localeText}
						sx={{
							"& .MuiDataGrid-columnHeaders": {
								// backgroundColor: "white",
								color: "primary.main",
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

export default Courses;
