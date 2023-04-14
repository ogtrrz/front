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

const Jobs = () => {
	const router = useRouter();
	async function getJobs() {
		const config = {
			method: "get",
			url: "http://localhost:8080/api/jobs",
			headers: {},
		};

		await axios(config)
			.then(function (response) {
				console.log(response.data);
				setJobs(response.data);
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	const [jobs, setJobs] = useState();
	useEffect(() => {
		getJobs();
	}, []);
	return (
		<>
			<Typography variant='h6' color='primary'>
				Puestos
			</Typography>

			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label='courses table'>
					<TableHead>
						<TableRow>
							<TableCell align='left'>Puesto</TableCell>
							<TableCell align='left'>Rol</TableCell>
							<TableCell align='left'>Handling</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{jobs?.map((job) => (
							<TableRow
								key={job.id}
								sx={{
									"&:last-child td, &:last-child th": { border: 0 },
									":hover": {
										bgcolor: "#A43357",
									},
								}}
								style={{ cursor: "pointer" }}
								onClick={() => {
									router.push(`job/${job.id}`);
								}}>
								<TableCell align='left'>{job.jobTitle}</TableCell>
								<TableCell align='left'>{job.rol}</TableCell>
								<TableCell align='left'>{job.handling}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};

export default Jobs;
