import buildTables from './build-tables'

/**
 *
 * @param {String} data - Path to data file
 */

const loadData = data => {
	fetch(data) // load data
		.then(resp => resp.text()) // parse response to text
		.then(data => data.split('\n')) // create array by each line
		.then(data => data.map(line => line.replace(/[“”]+/g, ''))) // strip quotation marks
		.then(data => data.map(line => line.split('/'))) // separate into single elements
		.then(data =>
			data.reduce((json, line) => {
				// for each line of arrays create an object
				json.push({
					departamento: line[0].trim(), // trimming...
					provincia: line[1].trim(),
					distrito: line[2].trim()
				})
				return json
			}, [])
		)
		.then(data => {
			const ordered = data.reduce((obj, line) => {
				obj.push({
					departamento:
						line.departamento != ''
							? {
									codigo: line.departamento.substr(0, line.departamento.indexOf(' ')),
									nombre: line.departamento.substr(line.departamento.indexOf(' ') + 1)
							  }
							: '',
					provincia:
						line.provincia != ''
							? {
									codigo: line.provincia.substr(0, line.provincia.indexOf(' ')),
									nombre: line.provincia.substr(line.provincia.indexOf(' ') + 1)
							  }
							: '',
					distrito:
						line.distrito != ''
							? {
									codigo: line.distrito.substr(0, line.distrito.indexOf(' ')),
									nombre: line.distrito.substr(line.distrito.indexOf(' ') + 1)
							  }
							: ''
				})
				return obj
			}, [])

			console.log('ORDERED DATA: ', JSON.stringify(ordered, null, 2)) // final object ordered and labeled

			return ordered
		})
		.then(data => buildTables(data))
		.catch(err => {
			console.error('Error loading data!\n\n', err)
			document.querySelector('#tables').innerHTML = `
            <h2 style="background:darkred; color:tomato">
               Hubo un error al cargar los datos.
            </h2>
         `
		})
}

export default loadData
