import React, { useState, useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";
import Link from "next/link";
import moment from "moment";
import {
	Button,
	LinearProgress,
	Stack,
	Box,
	Paper,
	Typography,
	MenuItem,
} from "@mui/material";

const ReqTrainEvidence = ({ evidences }) => {
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
			{evidences?.map((item) => (
				<Link href={`/upload/${encodeURIComponent(item?.link)}`} key={item?.id}>
					<Typography variant='body1' color='primary'>
						{`${item?.description}, vence el mes ${moment(item?.expiration).format('M [del] yyyy')}`}
					</Typography>
				</Link>
			))}
		</>
	);
};

export default ReqTrainEvidence;
