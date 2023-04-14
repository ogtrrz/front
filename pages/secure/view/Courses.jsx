import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import FlagCircleIcon from "@mui/icons-material/FlagCircle";
import {
	Button,
	LinearProgress,
	Stack,
	Box,
	Paper,
	Typography,
	MenuItem,
	Link
} from "@mui/material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const Courses = () => {
	const router = useRouter();
	async function getCourses() {
		const config = {
			method: "get",
			url: "http://localhost:8080/api/courses",
			headers: {},
		};

		await axios(config)
			.then(function (response) {
				console.log(response.data);
				setCourses(response.data);
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	const [courses, setCourses] = useState();
	useEffect(() => {
		getCourses();
	}, []);

	return (
		<>
			<Typography variant='h6' color='primary'>
				Cursos
			</Typography>

			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label='courses table'>
					<TableHead>
						<TableRow>
							<TableCell align='left'>Código</TableCell>
							<TableCell align='center'>Vo.Bo.</TableCell>
							<TableCell align='left'>Tipo</TableCell>
							<TableCell align='left'>Nombre</TableCell>
							<TableCell align='left'>Expira&nbsp;(Meses)</TableCell>
							<TableCell align='left'>Descripción</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{courses?.map((course) => (
							<TableRow
								key={course.code}
								sx={{ "&:last-child td, &:last-child th": { border: 0 }, 
								":hover": {
									bgcolor: "#A43357"
								  }}}
								style={{ cursor: 'pointer' }}
								onClick={() => { router.push(`course/${course.id}`) }}
								>
								<TableCell align='left'>{course.code}</TableCell>
								<TableCell align='center'>
									{course.autorizationBy ? (
										<FlagCircleIcon color='secondary' />
									) : (
										""
									)}
								</TableCell>
								<TableCell align='left'>
									{course.typeCourse === "PRESENT"
										? "Presente"
										: course.typeCourse === "REMOTE"
										? "Remoto"
										: course.typeCourse === "ONLINE"
										? "Online"
										: course.typeCourse}
								</TableCell>
								<TableCell align='left' color='text'>
									{course.name}
								</TableCell>
								<TableCell align='left'>{course.expirationInMonth}</TableCell>
								<TableCell align='left'>{course.description}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};

export default Courses;
