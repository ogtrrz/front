const getStaticPaths = async () => {
	//{ params: { paginaActual: 1+'' } },
	let pathsWithParams = [];
	for (let i = 0; i < 77; i++) {
		pathsWithParams.push({ params: { paginaActual: i + '' } });
	}

	//  ({ params: { Denuncia: id + "" } }));

	console.log(pathsWithParams);
};

getStaticPaths();
