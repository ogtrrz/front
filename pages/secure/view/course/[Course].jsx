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

const Course = () => {
	const router = useRouter();
	const { Course } = router.query;
	async function getCourses() {
		const config = {
			method: "get",
			url: "http://localhost:8080/api/courses/" + Course,
			headers: {},
		};

		await axios(config)
			.then(function (response) {
				console.log(response.data);
				setCourseState(response.data);
			})
			.catch(function (error) {
				console.log(error);
			});
	}
	const [courseState, setCourseState] = useState();
	useEffect(() => {
		if (Course) {
			getCourses();
		}
	}, [Course]);
	return (
		<>
			<Typography variant='h6' color='primary'>
				{courseState?.name}
			</Typography>
			<Typography variant='body1' color='text'>
				{courseState?.code}
			</Typography>
			<Typography variant='body1' color='text'>
				{courseState?.typeCourse}
			</Typography>
			<Typography variant='body1' color='text'>
				{courseState?.expirationInMonth}
			</Typography>
			<Typography variant='body1' color='text'>
				{courseState?.link}
			</Typography>
			<Typography variant='body1' color='text'>
				{courseState?.description}
			</Typography>
			<Typography variant='body1' color='text'>
				{courseState?.durationAuthorizationInMonth}
			</Typography>
		</>
	);
};

export default Course;
