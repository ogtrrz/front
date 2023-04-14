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

const ToDos = () => {
	const router = useRouter();
	async function getToDos() {
		const config = {
			method: "get",
			url: "http://localhost:8080/api/to-dos",
			headers: {},
		};

		await axios(config)
			.then(function (response) {
				console.log(response.data);
				setTodos(response.data);
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	const [todos, setTodos] = useState();
	useEffect(() => {
		getToDos();
	}, []);
	return (
		<>
			<Typography variant='h6' color='primary'>
				To Do
			</Typography>

			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label='courses table'>
					<TableHead>
						<TableRow>
							<TableCell align='center'>Fecha</TableCell>
							<TableCell align='left'>Estatus</TableCell>
							<TableCell align='left'>Descripción</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{todos?.map((todo) => (
							<TableRow
								key={todo.id}
								sx={{
									"&:last-child td, &:last-child th": { border: 0 },
									":hover": {
										bgcolor: "#A43357",
									},
								}}
								style={{ cursor: "pointer" }}
								onClick={() => {
									router.push(`todo/${todo.id}`);
								}}>
								<TableCell align='left'>{todo.date}</TableCell>

								<TableCell align='left'>{todo.state}</TableCell>
								<TableCell align='left'>{todo.description}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};

export default ToDos;
