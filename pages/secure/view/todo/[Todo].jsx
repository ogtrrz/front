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

const Todo = () => {
	const router = useRouter();
	const { Todo } = router.query;
	async function getTodo() {
		const config = {
			method: "get",
			url: "http://localhost:8080/api/to-dos/" + Todo,
			headers: {},
		};

		await axios(config)
			.then(function (response) {
				console.log(response.data);
				setTodoState(response.data);
			})
			.catch(function (error) {
				console.log(error);
			});
	}
	const [todoState, setTodoState] = useState();
	useEffect(() => {
		if (Todo) {
			getTodo();
		}
	}, [Todo]);
	return (
		<>
			<Typography variant='h6' color='primary'>
				{todoState?.description}
			</Typography>
			<Typography variant='body1' color='text'>
				{todoState?.state}
			</Typography>
			<Typography variant='body1' color='text'>
				{todoState?.date}
			</Typography>
			<Typography variant='body1' color='text'>
				{todoState?.link}
			</Typography>			
		</>
	);
};

export default Todo;
