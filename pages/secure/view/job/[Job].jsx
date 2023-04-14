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


const Job = () => {
  const router = useRouter();
	const { Job } = router.query;
	async function getJobs() {
		const config = {
			method: "get",
			url: "http://localhost:8080/api/jobs/" + Job,
			headers: {},
		};

		await axios(config)
			.then(function (response) {
				console.log(response.data);
				setJobsState(response.data);
			})
			.catch(function (error) {
				console.log(error);
			});
	}
	const [jobsState, setJobsState] = useState();
	useEffect(() => {
		if (Job) {
			getJobs();
		}
	}, [Job]);
	return (
		<>
			<Typography variant='h6' color='primary'>
				{jobsState?.jobTitle}
			</Typography>
			<Typography variant='body1' color='text'>
				{jobsState?.rol}
			</Typography>
			<Typography variant='body1' color='text'>
				{jobsState?.handling}
			</Typography>
		</>
	);
}

export default Job