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

const HistoricData = () => {
	const router = useRouter();
	async function getHistoricDatas() {
		const config = {
			method: "get",
			url: "http://localhost:8080/api/historic-data",
			headers: {},
		};

		await axios(config)
			.then(function (response) {
				console.log(response.data);
				setHistoricDatas(response.data);
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	const [historicDatas, setHistoricDatas] = useState();
	useEffect(() => {
		getHistoricDatas();
	}, []);
	return (
		<>
			<Typography variant='h6' color='primary'>
				Sus Archivos
			</Typography>

			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label='courses table'>
					<TableHead>
						<TableRow>
							<TableCell align='left'>Nombre</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{historicDatas?.map((historicData) => (
							<TableRow
								key={historicData.id}
								sx={{
									"&:last-child td, &:last-child th": { border: 0 },
									":hover": {
										bgcolor: "#A43357",
									},
								}}
								style={{ cursor: "pointer" }}
								onClick={() => {
									router.push(`http://localhost:1337/${historicData.link}?format=webp&height=600&q=80`);
								}}>
								<TableCell align='left'>{historicData.name}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};

export default HistoricData;
