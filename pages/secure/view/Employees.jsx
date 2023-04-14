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

const Employees = () => {
	const router = useRouter();
	async function getEmployees() {
		const config = {
			method: "get",
			url: "http://localhost:8080/api/employees",
			headers: {},
		};

		await axios(config)
			.then(function (response) {
				console.log(response.data);
				setEmployees(response.data);
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	const [employees, setEmployees] = useState();
	useEffect(() => {
		getEmployees();
	}, []);
	return (
		<>
			<Typography variant='h6' color='primary'>
				Usuarios
			</Typography>

			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label='courses table'>
					<TableHead>
						<TableRow>
							<TableCell align='left'>Usuario</TableCell>
							<TableCell align='center'>Nombre</TableCell>
							<TableCell align='left'>Apellido</TableCell>
							<TableCell align='left'>Teléfono</TableCell>
							<TableCell align='left'>Contratación</TableCell>
							
						</TableRow>
					</TableHead>
					<TableBody>
						{employees?.map((employee) => (
							<TableRow
								key={employee.user}
								sx={{
									"&:last-child td, &:last-child th": { border: 0 },
									":hover": {
										bgcolor: "#A43357",
									},
								}}
								style={{ cursor: "pointer" }}
								onClick={() => {
									router.push(`employee/${employee.id}`);
								}}>
								<TableCell align='left'>{employee.user}</TableCell>

								<TableCell align='left' color='text'>
									{employee.firstName}
								</TableCell>
								<TableCell align='left'>{employee.lastName}</TableCell>
								<TableCell align='left'>{employee.phoneNumber}</TableCell>
								<TableCell align='left'>{employee.hireDate}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};

export default Employees;
