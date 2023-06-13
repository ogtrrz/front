import { createTheme } from "@mui/material/styles";
import { Poppins } from "next/font/google";
import { purple, red, blueGrey } from "@mui/material/colors";

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
			main: "#37474F", //blueGrey.A700,
		},
		error: { main: "#FF0000" },
		warning: { main: "#F5EE9E" },
		info: { main: "#568BFF" },
		success: { main: "#00B389" },
		background: { default: "#FDFFFC" },
	},
	breakpoints: {
		values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
	},
	typography: {
		fontFamily: poppins.style.fontFamily,
		h1: { fontSize: 28 },
		h2: { fontSize: 27 },
		h3: { fontSize: 26 },
		h4: { fontSize: 25 },
		h5: { fontSize: 24 },
		h6: { fontSize: 23 },
		subtitle1: { fontSize: 22 },
		subtitle2: { fontSize: 19 },
		body1: { fontSize: 16 },
		body2: { fontSize: 14 },
	},
	spacing: 1,
	overrides: {
		MuiSvgIcon: {
			colorPrimary: {
				color: ["#FFF", "!important"],
			},
			colorSecondary: {
				color: ["#FFF", "!important"],
			},
		},
	},
	colorScheme: "auto",
	brandColor: "#000000",
	logo: "/transotas.svg",
	buttonText: "#FFF",
	// overrides: {
	// 	datagrid: {
	// 		header: {
	// 			fontWeight: "bold",
	// 		},
	// 	},
	// },
	// "& .MuiDataGrid-columnHeaders": {
	// 	backgroundColor: "rgba(0,0,255,0.6)",
	// 	color: "rgba(255,0,0,0.7)",
	// 	fontSize: 16,
	// },
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
