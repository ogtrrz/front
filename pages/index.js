import styles from "../styles/Home.module.css";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import { useGetCourseQuery, useGetCoursesQuery } from "app/api/apiCourse";
import { useGetRequirentsQuery } from "app/api/apiRequirents";

const label = { inputProps: { "aria-label": "Switch demo" } };

// "path": "/api/courses/0",
// http://localhost:8080/api/courses/2

export default function Home() {
	const {
		data: course = [],
		isLoading,
		isFetching,
		isError,
		error,
	} = useGetCourseQuery(2);
	const { data: courses } = useGetCoursesQuery();
	const { data: requirents } = useGetRequirentsQuery();
	if (isLoading || isFetching) {
		return <div>loading...</div>;
	}

	if (isError) {
		console.log({ error });
		return <div>{error.status}</div>;
	}
	return (
		<div className={styles.container}>
			<div>
				<span>With default Theme:</span>
			</div>
			<p>{course?.id}</p>
			<p>{course?.code}</p>
			<Button variant='text'>Text</Button>
			<Button variant='contained'>Contained</Button>
			<Button variant='outlined'>Outlined</Button>
			<Button color='secondary'>Secondary</Button>
			<Button variant='contained' color='success'>
				Success
			</Button>
			<Button variant='outlined' color='error'>
				Error
			</Button>
			<Switch {...label} defaultChecked />
			<Switch {...label} />
			<Switch {...label} disabled defaultChecked />
		</div>
	);
}
