import React, { useState, useEffect } from "react";
import _ from "lodash";
import { json } from "data/ddd";
import { Typography, Box, Stack, Button } from "@mui/material";
import { amber, blueGrey } from "@mui/material/colors";
// https://www.72shemot.com/72shemot_meditaciones_resultado.php
// https://www.kabbalahmashiah.com/es/kabbalahmashiah_cursos.php?np=10&bc=Los%2072%20Nombres%20de%20Dios

const D = () => {
	const [r, setR] = useState(51);
	
	// const initalState = 0;
	// const [count, setCount] = useState(initalState);

	// useEffect(() => {
	// 	setInterval(() => {
	// 		setR((old) => old + 1);
	// 	}, 1000 * 60 * 20);
	// }, []);

	
	const handleLess = (value) => {
		// e.preventDefault();
		console.log("value", value);
		setR(value - 1);
	};

	const handleMore = (value) => {
		// e.preventDefault();
		console.log("value", value);
		setR(value + 1);
	};

	return (
		<div>
			<Box sx={{ p: 3, border: "1px dashed grey" }}>
				<Stack display='flex' justifyContent='center' alignItems='center'>
					<Typography variant='h1' color={amber["A700"]}>
						{json[r][13] +
							json[r][10] +
							json[r][14] +
							json[r][11] +
							json[r][15] +
							json[r][12] +
							json[r][16]}
					</Typography>
					<Typography variant='h1' color={amber["A700"]}>
						{json[0]["17"]}
					</Typography>
					<Typography variant='h6' color={blueGrey["A700"]}>
						{json[r][4]}
					</Typography>

					<Typography variant='body1' color={blueGrey["A700"]}>
						{json[r][6]}
					</Typography>
					<Stack direction='row' spacing={4}>
						<Button
							variant='outlined'
							size='small'
							onClick={() => handleLess(r)}>
							izq.
						</Button>
						<Typography variant='body1' color={blueGrey["A700"]}>
							{json[r][5]}
						</Typography>
						<Button
							variant='outlined'
							size='small'
							onClick={() => handleMore(r)}>
							der.
						</Button>
					</Stack>
					<Typography variant='body1' color={blueGrey["A700"]}>
						{json[r][1]}
					</Typography>
				</Stack>
			</Box>
		</div>
	);
};

export default D;
