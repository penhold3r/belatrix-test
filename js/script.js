(function()
{
	const btn = document.querySelector('#btn');
	btn.addEventListener('click', loadData, false);
})();
//
function loadData(e)
{
	const ubigeos = 'ubigeos.txt';
	e.preventDefault();
	//
	fetch(ubigeos)
		.then((resp) => resp.text())
		.then((data) => data.split('\n'))
		.then((data) => data.map((line) => line.replace(/[“”]+/g, '')))
		.then((data) => data.map((line) => line.split('/')))
		.then((data) =>
		{
			let json = [];
			data.map((line) =>
			{
				json.push({
					departamento: line[0].trim(),
					provincia: line[1].trim(),
					distrito: line[2].trim()
				});
			});
			return json;
		})
		.then((data) =>
		{
			let finalJson = [];
			data.map((line) =>
			{
				let dp = line.departamento,
					pr = line.provincia,
					dt = line.distrito;
				//
				finalJson.push({
					departamento: (dp != '') ? {codigo: dp.substr(0, dp.indexOf(' ')), nombre: dp.substr(dp.indexOf(' ') +1)} : '',
					provincia: (pr != '') ? {codigo: pr.substr(0, pr.indexOf(' ')), nombre: pr.substr(pr.indexOf(' ') +1)} : '',
					distrito: (dt != '') ? {codigo: dt.substr(0, dt.indexOf(' ')), nombre: dt.substr(dt.indexOf(' ') +1)} : ''
				});
			});
			console.log(finalJson);
			return finalJson
		})
		.then((data) =>
		{
			let tables = [{departamento: []}, {provincia: []}, {distrito: []}];
			data.map((line) =>
			{
				if(line.provincia == '')
				{
					tables[0].departamento.push({
						codigo: line.departamento.codigo, 
						nombre: line.departamento.nombre, 
						codigoPadre: '-', 
						descripcionPadre: '-'
					});
				}
				else if(line.provincia != '' && line.distrito == '')
				{
					tables[1].provincia.push({
						codigo: line.provincia.codigo, 
						nombre: line.provincia.nombre, 
						codigoPadre: line.departamento.codigo, 
						descripcionPadre: line.departamento.nombre
					});
				}
				else
				{
					tables[2].distrito.push({
						codigo: line.distrito.codigo, 
						nombre: line.distrito.nombre, 
						codigoPadre: line.provincia.codigo, 
						descripcionPadre: line.provincia.nombre
					});
				}
			});
			return tables;
		})
		.then((data) => buildTables(data));
}
//
function buildTables(tables)
{
	const tablesWrapper = document.querySelector('#tables');
	//
	tables.map((table) =>
	{
		for(let i in table)
		{
			let tableTitle = document.createElement('h2'),
				tableEl = document.createElement('table'),
				tableHeader = document.createElement('tr');
			//
			tableTitle.innerHTML = i;
			tablesWrapper.appendChild(tableTitle);
			tableHeader.innerHTML = '<th>Código</th><th>Nombre</th><th>Código Padre</th><th>Descripción Padre</th>';
			tableEl.appendChild(tableHeader);
			for(let j in table[i])
			{
				let row = table[i],
					tr = document.createElement('tr');
				tr.innerHTML = '<td>'+ row[j].codigo + '</td>';
				tr.innerHTML += '<td>'+ row[j].nombre + '</td>';
				tr.innerHTML += '<td>'+ row[j].codigoPadre + '</td>';
				tr.innerHTML += '<td>'+ row[j].descripcionPadre + '</td>';
				tableEl.appendChild(tr);
			}
			tablesWrapper.appendChild(tableEl);
		}
	});
}
