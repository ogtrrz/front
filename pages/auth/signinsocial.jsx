import React from "react";
import { signIn, getCsrfToken, getProviders } from "next-auth/react";
// import Header from "../../components/header";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PestControlOutlinedIcon from "@mui/icons-material/PestControlOutlined";
import PestControlRodentIcon from "@mui/icons-material/PestControlRodent";
import { SvgIcon } from "@mui/material";
// import { ReactComponent as GoogleSvg } from "public/google.svg";

// const useStyles = makeStyles({
// 	imageIcon: {
// 	  height: '100%'
// 	},
// 	iconRoot: {
// 	  textAlign: 'center'
// 	}
//   });

const signinsocial = ({ csrfToken, providers }) => {
	console.log("providers", providers);
	return (
		<React.Fragment>
			<Stack
				direction='row'
				spacing={2}
				justifyContent='center'
				sx={{ pt: { xs: 25, md: 50 } }}>
				<PestControlRodentIcon
					color='primary'
					fontSize='large'
					sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
				/>
				<PestControlRodentIcon
					color='primary'
					fontSize='large'
					sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
				/>
				<PestControlRodentIcon
					color='primary'
					fontSize='large'
					sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
				/>
				<PestControlOutlinedIcon
					color='primary'
					fontSize='large'
					sx={{ display: { md: "flex" }, mr: 1 }}
				/>
				<Typography
					color='primary'
					variant='h1'
					style={{ textAlign: "center" }}>
					<strong>Transotas.org</strong>
				</Typography>
				<PestControlOutlinedIcon
					fontSize='large'
					color='primary'
					sx={{ display: { md: "flex" }, mr: 1 }}
				/>
				<PestControlRodentIcon
					color='primary'
					fontSize='large'
					sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
				/>
				<PestControlRodentIcon
					color='primary'
					fontSize='large'
					sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
				/>
				<PestControlRodentIcon
					color='primary'
					fontSize='large'
					sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
				/>
			</Stack>
			<Typography color='primary' variant='h4' style={{ textAlign: "center" }}>
				<strong>Iniciar sesión con:</strong>
			</Typography>

			<br />
			<nav aria-label='Iniciar sesión social'>
				<List
					sx={{
						pl: { xs: 100, sm: 200, md: 400, lg: 650, xl: 800 },
						pt: { xs: 25, md: 50 },
					}}>
					<ListItem
						disablePadding
						sx={{
							"&:hover": {
								backgroundColor: "primary.main",
								color: "white",
								"& .MuiListItemIcon-root": {
									color: "white",
								},
							},
						}}>
						<ListItemButton onClick={() => signIn("google")}>
							<ListItemIcon>
								<SvgIcon>
									<svg
										width='24'
										height='24'
										viewBox='0 0 24 24'
										xmlns='http://www.w3.org/2000/svg'>
										<title>Google icon</title>
										<path
											fill='#EA4335 '
											d='M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z'
										/>
										<path
											fill='#34A853'
											d='M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z'
										/>
										<path
											fill='#4A90E2'
											d='M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z'
										/>
										<path
											fill='#FBBC05'
											d='M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z'
										/>
									</svg>
								</SvgIcon>
							</ListItemIcon>
							<ListItemText primary='Google' />
						</ListItemButton>
					</ListItem>
					<ListItem
						disablePadding
						sx={{
							"&:hover": {
								backgroundColor: "primary.main",
								color: "white",
								"& .MuiListItemIcon-root": {
									color: "white",
								},
							},
						}}>
						<ListItemButton onClick={() => signIn("tester")}>
							<ListItemIcon>
								<SvgIcon>
									<svg
										clipRule='evenodd'
										fillRule='evenodd'
										width='24'
										height='24'
										imageRendering='optimizeQuality'
										shapeRendering='geometricPrecision'
										textRendering='geometricPrecision'
										viewBox='6702.77 18309.17 6561.66 6561.660000000007'
										xmlns='http://www.w3.org/2000/svg'>
										<linearGradient
											id='a'
											gradientUnits='userSpaceOnUse'
											x1='9983.6'
											x2='9983.6'
											y1='18249.39'
											y2='25150.62'>
											<stop offset='0' stopColor='#00b2ff' />
											<stop offset='1' stopColor='#006aff' />
										</linearGradient>
										<path
											d='M9983.6 18309.17c1811.95 0 3280.83 1468.88 3280.83 3280.83s-1468.88 3280.83-3280.83 3280.83S6702.77 23401.95 6702.77 21590s1468.88-3280.83 3280.83-3280.83z'
											fill='url(#a)'
										/>
										<path
											d='M10409.89 24843.29v-2534.17h714.43l94.7-891.91h-809.13l1.2-446.44c0-232.63 22.1-357.22 356.24-357.22h446.68v-892.06h-714.59c-858.35 0-1160.42 432.65-1160.42 1160.34v535.45h-535.07v891.99H9339v2498.09c208.45 41.53 423.95 63.47 644.6 63.47a3310.9 3310.9 0 0 0 426.29-27.54z'
											fill='#fff'
											fillRule='nonzero'
										/>
									</svg>
								</SvgIcon>
							</ListItemIcon>
							<ListItemText primary='Facebook' />
						</ListItemButton>
					</ListItem>
					<ListItem
						disablePadding
						sx={{
							"&:hover": {
								backgroundColor: "primary.main",
								color: "white",
								"& .MuiListItemIcon-root": {
									color: "white",
								},
							},
						}}>
						<ListItemButton>
							<ListItemIcon>
								<SvgIcon>
									<svg
										width='24'
										height='24'
										viewBox='117.806 161.288 464.388 377.424'
										xmlns='http://www.w3.org/2000/svg'>
										<path
											d='m582.194 205.976c-17.078 7.567-35.424 12.68-54.71 14.991 19.675-11.78 34.769-30.474 41.886-52.726-18.407 10.922-38.798 18.857-60.497 23.111-17.385-18.488-42.132-30.064-69.538-30.064-52.603 0-95.266 42.663-95.266 95.307a97.3 97.3 0 0 0 2.454 21.68c-79.211-3.989-149.383-41.928-196.382-99.562-8.18 14.112-12.885 30.474-12.885 47.899 0 33.05 16.833 62.236 42.377 79.314a95.051 95.051 0 0 1 -43.154-11.924v1.227c0 46.16 32.826 84.672 76.43 93.426a95.97 95.97 0 0 1 -25.095 3.313 95.929 95.929 0 0 1 -17.936-1.677c12.128 37.836 47.306 65.406 89.008 66.142-32.622 25.565-73.71 40.802-118.337 40.802-7.69 0-15.278-.45-22.743-1.33 42.173 27.06 92.24 42.807 146.029 42.807 175.275 0 271.094-145.17 271.094-271.073 0-4.09-.103-8.222-.287-12.312 18.612-13.458 34.769-30.208 47.51-49.29z'
											fill='#1da1f2'
										/>
									</svg>
								</SvgIcon>
							</ListItemIcon>
							<ListItemText primary='Twitter' />
						</ListItemButton>
					</ListItem>
					<ListItem
						disablePadding
						sx={{
							"&:hover": {
								backgroundColor: "primary.main",
								color: "white",
								"& .MuiListItemIcon-root": {
									color: "white",
								},
							},
						}}>
						<ListItemButton>
							<ListItemIcon>
								<SvgIcon>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										viewBox='2.842170943040401e-14 0 3364.7 3364.7'
										width='24'
										height='24'>
										<defs>
											<radialGradient
												id='a'
												cx='217.76'
												cy='3290.99'
												r='4271.92'
												gradientUnits='userSpaceOnUse'>
												<stop offset='.09' stopColor='#fa8f21' />
												<stop offset='.78' stopColor='#d82d7e' />
											</radialGradient>
											<radialGradient
												id='b'
												cx='2330.61'
												cy='3182.95'
												r='3759.33'
												gradientUnits='userSpaceOnUse'>
												<stop
													offset='.64'
													stopColor='#8c3aaa'
													stopOpacity='0'
												/>
												<stop offset='1' stopColor='#8c3aaa' />
											</radialGradient>
										</defs>
										<path
											d='M853.2 3352.8c-200.1-9.1-308.8-42.4-381.1-70.6-95.8-37.3-164.1-81.7-236-153.5s-116.4-140.1-153.5-235.9c-28.2-72.3-61.5-181-70.6-381.1-10-216.3-12-281.2-12-829.2s2.2-612.8 11.9-829.3C21 653.1 54.5 544.6 82.5 472.1 119.8 376.3 164.3 308 236 236c71.8-71.8 140.1-116.4 236-153.5C544.3 54.3 653 21 853.1 11.9 1069.5 2 1134.5 0 1682.3 0c548 0 612.8 2.2 829.3 11.9 200.1 9.1 308.6 42.6 381.1 70.6 95.8 37.1 164.1 81.7 236 153.5s116.2 140.2 153.5 236c28.2 72.3 61.5 181 70.6 381.1 9.9 216.5 11.9 281.3 11.9 829.3 0 547.8-2 612.8-11.9 829.3-9.1 200.1-42.6 308.8-70.6 381.1-37.3 95.8-81.7 164.1-153.5 235.9s-140.2 116.2-236 153.5c-72.3 28.2-181 61.5-381.1 70.6-216.3 9.9-281.3 11.9-829.3 11.9-547.8 0-612.8-1.9-829.1-11.9'
											fill='url(#a)'
										/>
										<path
											d='M853.2 3352.8c-200.1-9.1-308.8-42.4-381.1-70.6-95.8-37.3-164.1-81.7-236-153.5s-116.4-140.1-153.5-235.9c-28.2-72.3-61.5-181-70.6-381.1-10-216.3-12-281.2-12-829.2s2.2-612.8 11.9-829.3C21 653.1 54.5 544.6 82.5 472.1 119.8 376.3 164.3 308 236 236c71.8-71.8 140.1-116.4 236-153.5C544.3 54.3 653 21 853.1 11.9 1069.5 2 1134.5 0 1682.3 0c548 0 612.8 2.2 829.3 11.9 200.1 9.1 308.6 42.6 381.1 70.6 95.8 37.1 164.1 81.7 236 153.5s116.2 140.2 153.5 236c28.2 72.3 61.5 181 70.6 381.1 9.9 216.5 11.9 281.3 11.9 829.3 0 547.8-2 612.8-11.9 829.3-9.1 200.1-42.6 308.8-70.6 381.1-37.3 95.8-81.7 164.1-153.5 235.9s-140.2 116.2-236 153.5c-72.3 28.2-181 61.5-381.1 70.6-216.3 9.9-281.3 11.9-829.3 11.9-547.8 0-612.8-1.9-829.1-11.9'
											fill='url(#b)'
										/>
										<path
											d='M1269.25 1689.52c0-230.11 186.49-416.7 416.6-416.7s416.7 186.59 416.7 416.7-186.59 416.7-416.7 416.7-416.6-186.59-416.6-416.7m-225.26 0c0 354.5 287.36 641.86 641.86 641.86s641.86-287.36 641.86-641.86-287.36-641.86-641.86-641.86S1044 1335 1044 1689.52m1159.13-667.31a150 150 0 1 0 150.06-149.94h-.06a150.07 150.07 0 0 0-150 149.94M1180.85 2707c-121.87-5.55-188.11-25.85-232.13-43-58.36-22.72-100-49.78-143.78-93.5s-70.88-85.32-93.5-143.68c-17.16-44-37.46-110.26-43-232.13-6.06-131.76-7.27-171.34-7.27-505.15s1.31-373.28 7.27-505.15c5.55-121.87 26-188 43-232.13 22.72-58.36 49.78-100 93.5-143.78s85.32-70.88 143.78-93.5c44-17.16 110.26-37.46 232.13-43 131.76-6.06 171.34-7.27 505-7.27S2059.13 666 2191 672c121.87 5.55 188 26 232.13 43 58.36 22.62 100 49.78 143.78 93.5s70.78 85.42 93.5 143.78c17.16 44 37.46 110.26 43 232.13 6.06 131.87 7.27 171.34 7.27 505.15s-1.21 373.28-7.27 505.15c-5.55 121.87-25.95 188.11-43 232.13-22.72 58.36-49.78 100-93.5 143.68s-85.42 70.78-143.78 93.5c-44 17.16-110.26 37.46-232.13 43-131.76 6.06-171.34 7.27-505.15 7.27s-373.28-1.21-505-7.27M1170.5 447.09c-133.07 6.06-224 27.16-303.41 58.06-82.19 31.91-151.86 74.72-221.43 144.18S533.39 788.47 501.48 870.76c-30.9 79.46-52 170.34-58.06 303.41-6.16 133.28-7.57 175.89-7.57 515.35s1.41 382.07 7.57 515.35c6.06 133.08 27.16 223.95 58.06 303.41 31.91 82.19 74.62 152 144.18 221.43s139.14 112.18 221.43 144.18c79.56 30.9 170.34 52 303.41 58.06 133.35 6.06 175.89 7.57 515.35 7.57s382.07-1.41 515.35-7.57c133.08-6.06 223.95-27.16 303.41-58.06 82.19-32 151.86-74.72 221.43-144.18s112.18-139.24 144.18-221.43c30.9-79.46 52.1-170.34 58.06-303.41 6.06-133.38 7.47-175.89 7.47-515.35s-1.41-382.07-7.47-515.35c-6.06-133.08-27.16-224-58.06-303.41-32-82.19-74.72-151.86-144.18-221.43s-139.24-112.27-221.33-144.18c-79.56-30.9-170.44-52.1-303.41-58.06-133.3-6.09-175.89-7.57-515.3-7.57s-382.1 1.41-515.45 7.57'
											fill='#fff'
										/>
									</svg>
								</SvgIcon>
							</ListItemIcon>
							<ListItemText primary='Instagram' />
						</ListItemButton>
					</ListItem>
					<ListItem
						disablePadding
						sx={{
							"&:hover": {
								backgroundColor: "primary.main",
								color: "white",
								"& .MuiListItemIcon-root": {
									color: "white",
								},
							},
						}}>
						<ListItemButton>
							<ListItemIcon>
								<SvgIcon>
									<svg
										viewBox='0 0 59.242 47.271'
										width='32'
										height='32'
										xmlns='http://www.w3.org/2000/svg'>
										<path
											d='m32.368 0-17.468 15.145-14.9 26.75h13.437zm2.323 3.543-7.454 21.008 14.291 17.956-27.728 4.764h45.442z'
											fill='#0072c6'
										/>
									</svg>
								</SvgIcon>
							</ListItemIcon>
							<ListItemText primary='Azure' />
						</ListItemButton>
					</ListItem>
				</List>
			</nav>
			<Box sx={{ p: { xs: 50, md: 95 } }} />
		</React.Fragment>
	);
};

export default signinsocial;

export async function getServerSideProps(context) {
	const providers = await getProviders();
	const csrfToken = await getCsrfToken(context);
	console.log("providers", providers);
	console.log("csrfToken", csrfToken);
	
	return {
		props: {
			providers,
			csrfToken,
		},
	};
}
