/**
 *
 * @param {Array} data - Array of ordered data
 */
const buildTables = data => {
	const tablesWrapper = document.querySelector('#tables')

	// group data
	const tables = data.reduce((tables, line) => {
		// model object
		tables = {
			departamento: (tables.departamento && tables.departamento) || [],
			provincia: (tables.provincia && tables.provincia) || [],
			distrito: (tables.distrito && tables.distrito) || []
		}

		// filter data by table
		if (line.provincia == '') {
			tables.departamento.push({
				codigo: line.departamento.codigo,
				nombre: line.departamento.nombre,
				codigoPadre: '-',
				descripcionPadre: '-'
			})
		} else if (line.provincia != '' && line.distrito == '') {
			tables.provincia.push({
				codigo: line.provincia.codigo,
				nombre: line.provincia.nombre,
				codigoPadre: line.departamento.codigo,
				descripcionPadre: line.departamento.nombre
			})
		} else {
			tables.distrito.push({
				codigo: line.distrito.codigo,
				nombre: line.distrito.nombre,
				codigoPadre: line.provincia.codigo,
				descripcionPadre: line.provincia.nombre
			})
		}

		return tables
	}, {})

	console.log('TABLAS: ', JSON.stringify(tables, null, 2))

	// create tables
	Object.keys(tables).map(table => {
		const title = table.charAt(0).toUpperCase() + table.slice(1) // capitalize table title
		const tableTitle = document.createElement('h2')
		const tableEl = document.createElement('table')
		const tableHeader = document.createElement('tr')
		const headers = ['Código', 'Nombre', 'Código Padre', 'Descripción Padre']

		tableTitle.innerText = title
		// materialize classes
		tableTitle.classList.add('amber', 'lighten-5', 'amber-text', 'text-darken-1')
		tablesWrapper.appendChild(tableTitle)

		// table headers
		headers.map(header => {
			const rowHeader = document.createElement('th')
			rowHeader.innerText = header
			tableHeader.appendChild(rowHeader)
		})
		// materialize classes
		tableEl.classList.add('amber', 'lighten-5', 'grey-text', 'text-darken-3')
		tableEl.appendChild(tableHeader)

		// tables rows
		tables[table].map(row => {
			const tr = document.createElement('tr')

			// row content
			Object.values(row).map(value => {
				const td = document.createElement('td')
				td.innerText = value
				tr.appendChild(td)
			})

			tableEl.appendChild(tr)
		})

		tablesWrapper.appendChild(tableEl) // insert table into DOM
	})
}

export default buildTables
