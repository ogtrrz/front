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

const CoursesSelection = ({ handleRowClick }) => {

	const [coursesIo, setCoursesIo] = useLocalStorageState(
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

	useEffect(() => {
		if (Date.now() - coursesIoTime > 1000 * 60 * 60 * 24 * 7) {
			getCourses();
			setCoursesIoTime(Date.now());
		}
	}, []);

	const getCourses = async () => {
		const coursesData = await gets(URL_COURSES, 0, 10, "id,asc");
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

	return (
		<div style={{ height: 300, width: "100%" }}>
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
	);
};

export default CoursesSelection;
