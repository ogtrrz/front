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
	Link,
} from "@mui/material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const Trainings = () => {
	const router = useRouter();
	async function getTrainings() {
		const config = {
			method: "get",
			url: "http://localhost:8080/api/trainings",
			headers: {},
		};

		await axios(config)
			.then(function (response) {
				console.log(response.data);
				setTrainings(response.data);
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	const [trainings, setTrainings] = useState();
	useEffect(() => {
		getTrainings();
	}, []);
	return (
		<>
			<Typography variant='h6' color='primary'>
				Entrenamiento
			</Typography>

			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label='courses table'>
					<TableHead>
						<TableRow>
							<TableCell align='center'>Curso</TableCell>
							<TableCell align='left'>Relizado</TableCell>
							<TableCell align='left'>Expiración</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{trainings?.map((training) => (
							<TableRow
								key={training.id}
								sx={{
									"&:last-child td, &:last-child th": { border: 0 },
									":hover": {
										bgcolor: "#A43357",
									},
								}}
								style={{ cursor: "pointer" }}
								onClick={() => {
									router.push(`training/${training.id}`);
								}}>
								<TableCell align='left'>{training.code}</TableCell>
								<TableCell align='left'>{training.date}</TableCell>
								<TableCell align='left'>{training.expiry}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};

export default Trainings;
