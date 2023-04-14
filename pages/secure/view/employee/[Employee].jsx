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
} from "@mui/material";

const Employee = () => {
  const router = useRouter();
	const { Employee } = router.query;
	async function getEmployees() {
		const config = {
			method: "get",
			url: "http://localhost:8080/api/employees/" + Employee,
			headers: {},
		};

		await axios(config)
			.then(function (response) {
				console.log(response.data);
				setEmployeeState(response.data);
			})
			.catch(function (error) {
				console.log(error);
			});
	}
	const [employeeState, setEmployeeState] = useState();
	useEffect(() => {
		if (Employee) {
			getEmployees();
		}
	}, [Employee]);
	return (
		<>
			<Typography variant='h6' color='primary'>
				{employeeState?.user}
			</Typography>
			<Typography variant='body1' color='text'>
				{employeeState?.firstName}
			</Typography>
			<Typography variant='body1' color='text'>
				{employeeState?.lastName}
			</Typography>
			<Typography variant='body1' color='text'>
				{employeeState?.email}
			</Typography>
			<Typography variant='body1' color='text'>
				{employeeState?.phoneNumber}
			</Typography>
			<Typography variant='body1' color='text'>
				{employeeState?.hireDate}
			</Typography>
			<Typography variant='body1' color='text'>
				{employeeState?.emergencyContact}
			</Typography>
      <Typography variant='body1' color='text'>
				{employeeState?.emergencyPhone}
			</Typography>
			<Typography variant='body1' color='text'>
				{employeeState?.blondeType}
			</Typography>
			<Typography variant='body1' color='text'>
				{employeeState?.allergies}
			</Typography>
			<Typography variant='body1' color='text'>
				{employeeState?.birthDate}
			</Typography>
			<Typography variant='body1' color='text'>
				{employeeState?.note}
			</Typography>
		</>
	);
}

export default Employee