import React, { useState, useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";
import Link from "next/link";
import { useRouter } from "next/router";
import moment from "moment";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
	Button,
	LinearProgress,
	Stack,
	Box,
	Paper,
	Typography,
	MenuItem,
} from "@mui/material";

const ReqTrainEvidence = ({ evidences, training }) => {
	const router = useRouter();
	const [employeeIo, setEmployeeIo] = useLocalStorageState("employee", {
		defaultValue: [],
	});
	useEffect(() => {
		console.log("evidences", evidences);
	}, []);

	return (
		<>
			<Typography variant='subtitle2' color='primary'>
				Evidencias
			</Typography>

			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label='courses table'>
					<TableHead>
						<TableRow>
							<TableCell align='left'>Estado</TableCell>
							<TableCell align='left'>Tipo</TableCell>
							<TableCell align='left'>Expira</TableCell>
							<TableCell align='left'>Descripción</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{evidences?.map((item) => (
							<TableRow
								key={item.id}
								sx={{
									"&:last-child td, &:last-child th": { border: 0 },
									":hover": {
										bgcolor: "#A43357",
									},
								}}
								onClick={() => {
									router.push(`${process.env.NEXT_PUBLIC_URL}secure/form/Evidence?Evidence=${item.id}&Training=${training}`);
								}}
								style={{ cursor: "pointer" }}>
								<TableCell align='left'>
									{item?.state === "NEW" ? "Nuevo" : "Completado"}
								</TableCell>
								<TableCell align='left'>
									{item?.kind == "CERTIFICATE"
										? "Certificado"
										: item?.kind == "ONTHEJOB"
										? "En el trabajo"
										: "Curso"}
								</TableCell>
								<TableCell align='left'>
									{item?.state != "NEW" ? moment(item.expiration).format("M/YYYY") : ""}
								</TableCell>
								<TableCell align='left'>{item?.description}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};

export default ReqTrainEvidence;
