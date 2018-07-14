(function()
{
	const btn = document.querySelector('#btn');
	btn.addEventListener('click', loadData, false);
	//getData(); non ES6 path
})(); //IIFE
//
const loadData = e =>
{
	const ubigeos = 'ubigeos.txt'; //instance of raw data
	e.preventDefault(); // just to be sure
	//
	fetch(ubigeos) // load data
		.then(resp => resp.text()) // parse response to text
		.then(data => data.split('\n')) // create array by each line
		.then(data => data.map((line) => line.replace(/[“”]+/g, ''))) // strip quotation marks from lines
		.then(data => data.map((line) => line.split('/'))) // separate into single elements
		.then(data =>
		{
			let json = []; // new object
			data.map(line =>
			{
				json.push({ // for each line of arrays create a key-value object
					departamento: line[0].trim(), // trimming...
					provincia: line[1].trim(),
					distrito: line[2].trim()
				});
			});
			return json;
		})
		.then(data =>
		{
			let finalJson = [];
			data.map(line =>
			{
				const dp = line.departamento;
				const pr = line.provincia;
				const dt = line.distrito;
				//
				finalJson.push({ // separate name and code for each entry
					departamento: (dp != '') ? {codigo: dp.substr(0, dp.indexOf(' ')), nombre: dp.substr(dp.indexOf(' ') +1)} : '',
					provincia: (pr != '') ? {codigo: pr.substr(0, pr.indexOf(' ')), nombre: pr.substr(pr.indexOf(' ') +1)} : '',
					distrito: (dt != '') ? {codigo: dt.substr(0, dt.indexOf(' ')), nombre: dt.substr(dt.indexOf(' ') +1)} : ''
				});
			});
			console.log(finalJson); // final object ordered and labeled
			return finalJson
		})
		.then(data =>
		{
			// an array for each future table
			let tables = [{departamento: []}, {provincia: []}, {distrito: []}];
			data.map(line =>
			{
				// filtering elemnts for table and labeling acordingly
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
		.then(data => buildTables(data));
}
//
const buildTables = tables =>
{
	const tablesWrapper = document.querySelector('#tables'); 
	//
	tables.map(table =>
	{
		for(let i in table) // creating a table for each array
		{
			const tableTitle = document.createElement('h2');
			const tableEl = document.createElement('table');
			const tableHeader = document.createElement('tr');
			//
			tableTitle.innerHTML = i; // name extracted from array key
			tablesWrapper.appendChild(tableTitle);
			tableHeader.innerHTML = '<th>Código</th><th>Nombre</th><th>Código Padre</th><th>Descripción Padre</th>'; // constant header
			tableEl.appendChild(tableHeader);
			for(let j in table[i]) // populate rows with each entry
			{
				let row = table[i],
					tr = document.createElement('tr');
				tr.innerHTML = '<td>'+ row[j].codigo + '</td>';
				tr.innerHTML += '<td>'+ row[j].nombre + '</td>';
				tr.innerHTML += '<td>'+ row[j].codigoPadre + '</td>';
				tr.innerHTML += '<td>'+ row[j].descripcionPadre + '</td>';
				tableEl.appendChild(tr);
			}
			tablesWrapper.appendChild(tableEl); // insert table into DOM
		}
	});
}
//-------------------------------------------------
// non ES6
//
function getData()
{
	var data = 'ubigeos.txt';
	var request = new XMLHttpRequest;
	//
	request.open('GET', data, true);
	request.setRequestHeader("Content-type", "application/text");
	request.onreadystatechange = function()
	{
		if(request.readyState === 4 && request.status === 200)
		{
			var resp = request.responseText;
			formatData(resp);
		}
		else console.log(request.readyState);
	}
	request.send();
}
//
function formatData(data)
{
	var json = [], finalJson = [], tables = [];
	//
	data = data.split('\n');
	for(var i = 0; i < data.length; i++)
	{
		data[i] = data[i].replace(/[“”]+/g, '');
		data[i] = data[i].split('/');
		for(var j = 0; j < data[i].length; j++) data[i][j] = data[i][j].trim();
		//
		json.push({
			departamento: data[i][0],
			provincia: data[i][1],
			distrito: data[i][2]
		});
	}
	//
	for(var k = 0; k < json.length; k++)
	{
		var dp = json[k].departamento,
			pr = json[k].provincia,
			dt = json[k].distrito;
		//
		finalJson.push({
			departamento: (dp != '') ? {codigo: dp.substr(0, dp.indexOf(' ')), nombre: dp.substr(dp.indexOf(' ') +1)} : '',
			provincia: (pr != '') ? {codigo: pr.substr(0, pr.indexOf(' ')), nombre: pr.substr(pr.indexOf(' ') +1)} : '',
			distrito: (dt != '') ? {codigo: dt.substr(0, dt.indexOf(' ')), nombre: dt.substr(dt.indexOf(' ') +1)} : ''
		});
	}
	console.log(finalJson);
	//
	tables = [{departamento: []}, {provincia: []}, {distrito: []}];
	for(var l = 0; l < finalJson.length; l++)
	{
		if(finalJson[l].provincia == '')
		{
			tables[0].departamento.push({
				codigo: finalJson[l].departamento.codigo, 
				nombre: finalJson[l].departamento.nombre, 
				codigoPadre: '-', 
				descripcionPadre: '-'
			});
		}
		else if(finalJson[l].provincia != '' && finalJson[l].distrito == '')
		{
			tables[1].provincia.push({
				codigo: finalJson[l].provincia.codigo, 
				nombre: finalJson[l].provincia.nombre, 
				codigoPadre: finalJson[l].departamento.codigo, 
				descripcionPadre: finalJson[l].departamento.nombre
			});
		}
		else
		{
			tables[2].distrito.push({
				codigo: finalJson[l].distrito.codigo, 
				nombre: finalJson[l].distrito.nombre, 
				codigoPadre: finalJson[l].provincia.codigo, 
				descripcionPadre: finalJson[l].provincia.nombre
			});
		}
	}
	console.log(tables);
	createTables(tables);
}
//
function createTables(tables)
{
	var tablesWrapper = document.getElementById('tables');
	//
	for(var i = 0; i < tables.length; i++)
	{
		for(let j in tables[i])
		{
			var tableTitle = document.createElement('h2'),
				tableEl = document.createElement('table'),
				tableHeader = document.createElement('tr');
			//
			tableTitle.innerHTML = j;
			tablesWrapper.appendChild(tableTitle);
			tableHeader.innerHTML = '<th>Código</th><th>Nombre</th><th>Código Padre</th><th>Descripción Padre</th>';
			tableEl.appendChild(tableHeader);
			for(var k in tables[i][j])
			{
				var row = tables[i][j],
					tr = document.createElement('tr');
				tr.innerHTML = '<td>'+ row[k].codigo + '</td>';
				tr.innerHTML += '<td>'+ row[k].nombre + '</td>';
				tr.innerHTML += '<td>'+ row[k].codigoPadre + '</td>';
				tr.innerHTML += '<td>'+ row[k].descripcionPadre + '</td>';
				tableEl.appendChild(tr);
			}
			tablesWrapper.appendChild(tableEl);
		}
	}
}

