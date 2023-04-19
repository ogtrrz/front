import React, { useState, useEffect } from "react";
import axios from "axios";
import useLocalStorageState from "use-local-storage-state";
import { useRouter } from "next/router";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
	Button,
	LinearProgress,
	Stack,
	Box,
	Paper,
	Typography,
	MenuItem,
	ButtonGroup,
} from "@mui/material";

const Course = () => {
	const router = useRouter();
	const { Course } = router.query;
	async function getCourses() {
		const config = {
			method: "get",
			url: `${process.env.NEXT_PUBLIC_API_REST}courses/${Course}`,
			headers: {},
		};

		await axios(config)
			.then(function (response) {
				console.log(response.data);
				setCourseState(response.data);
				setCourseIo(response.data);
			})
			.catch(function (error) {
				console.log(error);
			});
	}
	const [courseState, setCourseState] = useState();
	useEffect(() => {
		if (Course) {
			getCourses();
		}
	}, [Course]);

	const [courseIo, setCourseIo, { isPersistent }] = useLocalStorageState(
		"course",
		{
			defaultValue: [],
		}
	);

	const handleNewRequirement = () => {
		router.push(`/secure/form/Requirents`);
	};
	return (
		<>
			<Typography variant='h6' color='primary'>
				{courseState?.name}
			</Typography>
			<Typography variant='body1' color='text'>
				{courseState?.code}
			</Typography>
			<Typography variant='body1' color='text'>
				{courseState?.typeCourse === "PRESENT"
					? "Presente"
					: courseState?.typeCourse === "REMOTE"
					? "Remoto"
					: courseState?.typeCourse === "ONLINE"
					? "Online"
					: courseState?.typeCourse}
			</Typography>
			<Typography variant='body1' color='text'>
				{courseState?.expirationInMonth}
			</Typography>
			<Typography variant='body1' color='text'>
				{courseState?.link}
			</Typography>
			<Typography variant='body1' color='text'>
				{courseState?.description}
			</Typography>
			<Typography variant='body1' color='text'>
				{courseState?.durationAuthorizationInMonth}
			</Typography>
			<Typography variant='h6' color='primary'>
				Requerimientos
			</Typography>
			<Button
				variant='outlined'
				endIcon={<AddCircleIcon />}
				onClick={handleNewRequirement}>
				Nuevo Requerimiento
			</Button>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label='courses table'>
					<TableHead>
						<TableRow>
							<TableCell align='left'><b>Código</b></TableCell>
							<TableCell align='left'><b>Tipo</b></TableCell>
							<TableCell align='left'><b>Descripción</b></TableCell>
							<TableCell align='left'><b>Expira&nbsp;(Meses)</b></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{courseState?.requirents?.map((requirent) => (
							<TableRow
								key={requirent.id}
								sx={{
									"&:last-child td, &:last-child th": { border: 0 },
									":hover": {
										bgcolor: "#A43357",
									},
								}}
								style={{ cursor: "pointer" }}
								onClick={() => {
									router.push(`/secure/view/requirent/${requirent.id}?Course=${courseIo.id}`);
								}}>
								<TableCell align='left'>{requirent?.code}</TableCell>
								<TableCell align='left'>
									{requirent?.kind === "CERTIFICATE"
										? "Certificado"
										: requirent.kind === "ONTHEJOB"
										? "On the job"
										: requirent.kind === "COURSE"
										? "Curso"
										: requirent.kind}
								</TableCell>
								<TableCell align='left'>{requirent?.description}</TableCell>
								<TableCell align='left' color='text'>
									{requirent?.expirationInMonth}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};

export default Course;
