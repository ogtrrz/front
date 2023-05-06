import React, { useState, useEffect } from "react";
// import axios from "axios";
import _ from "lodash";
import useLocalStorageState from "use-local-storage-state";
import { useRouter } from "next/router";
import { del, URL_COURSES } from "data/ApiData";
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
import HeaderDeleteEdit from "models/HeaderDeleteEdit";
import HeaderNew from "models/HeaderNew";
import DialogDelete from "models/DialogDelete";

const Course = () => {
	const [open, setOpen] = useState(false);
	const handleClose = () => {
		setOpen(false);
	};
	const router = useRouter();

	const [coursesIo, setCoursesIo, { isPersistent }] = useLocalStorageState(
		"courses",
		{
			defaultValue: [],
		}
	);
	const [courseIo, setCourseIo] = useLocalStorageState("course", {
		defaultValue: [],
	});

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

	const handleEdit = () => {
		console.log("handleEdit");
		router.push(`/secure/form/Course?Course=${courseIo.id}`);
	};

	const handleDelete1 = () => {
		console.log("handleDelete1");
		setOpen(true);
	};

	const handleDelete2 = async () => {
		console.log("handleDelete2");
		setOpen(false);

		let newCourses = _.cloneDeep(coursesIo);
		await del(URL_COURSES, courseIo.id);
		_.remove(newCourses, (item) => item.id == courseIo.id);

		setCoursesIo(newCourses);
		setCourseIo("");
		router.push(`/secure/view/Courses`);
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
				<HeaderDeleteEdit
					title={courseIo?.code}
					onDelete={handleDelete1}
					onEdit={handleEdit}
				/>
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

			<HeaderNew title='Requerimientos' onNew={handleNewRequirement} />
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
			<DialogDelete
				onOpen={open}
				on_Close={handleClose}
				onCancel={handleClose}
				onOk={handleDelete2}
			/>
		</Box>
	);
};

export default Course;
