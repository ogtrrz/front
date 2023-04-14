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

const Training = () => {
  const router = useRouter();
	const { Training } = router.query;
	async function getTraning() {
		const config = {
			method: "get",
			url: "http://localhost:8080/api/trainings/" + Training,
			headers: {},
		};

		await axios(config)
			.then(function (response) {
				console.log(response.data);
				setTraningState(response.data);
			})
			.catch(function (error) {
				console.log(error);
			});
	}
	const [traningState, setTraningState] = useState();
	useEffect(() => {
		if (Training) {
			getTraning();
		}
	}, [Training]);
	return (
		<>
			<Typography variant='h6' color='primary'>
				{traningState?.code}
			</Typography>
			<Typography variant='body1' color='text'>
				{traningState?.date}
			</Typography>
			<Typography variant='body1' color='text'>
				{traningState?.expiry}
			</Typography>
		</>
	);
}

export default Training