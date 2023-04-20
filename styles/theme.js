import { createTheme } from "@mui/material/styles";
import { Poppins } from "next/font/google";
import { purple, red, blueGrey } from '@mui/material/colors';

const poppins = Poppins({
	weight: ["300", "400"],
	style: ["normal", "italic"],
	subsets: ["latin"],
	preload: ["true"],
});

export const theme = createTheme({
	palette: {
		type: "light",
		primary: {
			main: "#8E002D",
		},
		secondary: {
			main: "#4277FF",
		},
		text: {
			main: blueGrey,
		},
		error: { main: "#6E353A" },
		warning: { main: "#F5EE9E" },
		info: { main: "#568BFF" },
		success: { main: "#00B389" },
		background: { default: "#FDFFFC" },
	},
	breakpoints: {
		values: { xs: 600, sm: 800, md: 1000, lg: 1200, xl: 1536 },
	},
	typography: {
		fontFamily: poppins.style.fontFamily,
		h1: { fontSize: 69 },
		h2: { fontSize: 57 },
		h3: { fontSize: 48 },
		h4: { fontSize: 40 },
		h5: { fontSize: 33 },
		h6: { fontSize: 28 },
		subtitle1: { fontSize: 23 },
		subtitle2: { fontSize: 19 },
		body1: { fontSize: 16 },
		body2: { fontSize: 12 },
	},
	// components: {
	// 	MuiStack: {
	// 	  defaultProps: {
	// 		useFlexGap: true,
	// 		spacing: 2,
	// 		direction: "column",
	// 	  }
	// 	}
	//   }
});
