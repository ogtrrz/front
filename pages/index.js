import styles from "../styles/Home.module.css";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";

const label = { inputProps: { "aria-label": "Switch demo" } };

export default function Home() {
	return (
		<div className={styles.container}>
			<div>
				<span>With default Theme:</span>
			</div>
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
