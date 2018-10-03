/**
 * 
 * @param {Array} data - Array of ordered data 
 */
const buildTables = data => {
   const tablesWrapper = document.querySelector('#tables');
   const tables = data.reduce((tables, line) => {
      tables = [
         { departamento: (tables[0] && tables[0].departamento) || [] },
         { provincia: (tables[1] && tables[1].provincia) || [] },
         { distrito: (tables[2] && tables[2].distrito) || [] }
      ];

      if (line.provincia == '') {
         tables[0].departamento.push({
            codigo: line.departamento.codigo,
            nombre: line.departamento.nombre,
            codigoPadre: '-',
            descripcionPadre: '-'
         });
      }
      else if (line.provincia != '' && line.distrito == '') {
         tables[1].provincia.push({
            codigo: line.provincia.codigo,
            nombre: line.provincia.nombre,
            codigoPadre: line.departamento.codigo,
            descripcionPadre: line.departamento.nombre
         });
      }
      else {
         tables[2].distrito.push({
            codigo: line.distrito.codigo,
            nombre: line.distrito.nombre,
            codigoPadre: line.provincia.codigo,
            descripcionPadre: line.provincia.nombre
         });
      }

      return tables;

   }, []);

   console.log('TABLAS: ', JSON.stringify(tables, null, 2));

   //
   tables.map((table) => {
      // creating a table for each array
      for (let i in table) {
         let tableTitle = document.createElement('h2');
         let tableEl = document.createElement('table');
         let tableHeader = document.createElement('tr');
         //
         tableTitle.innerHTML = i; // name extracted from array key
         tableTitle.classList.add('amber', 'lighten-5', 'amber-text', 'text-darken-1');
         tablesWrapper.appendChild(tableTitle);
         tableHeader.innerHTML = '<th>Código</th><th>Nombre</th><th>Código Padre</th><th>Descripción Padre</th>'; // constant header
         tableEl.classList.add('amber', 'lighten-5', 'grey-text', 'text-darken-3');
         tableEl.appendChild(tableHeader);

         // populate rows with each entry
         for (let j in table[i]) {
            let row = table[i];
            let tr = document.createElement('tr');
            tr.innerHTML = '<td>' + row[j].codigo + '</td>';
            tr.innerHTML += '<td>' + row[j].nombre + '</td>';
            tr.innerHTML += '<td>' + row[j].codigoPadre + '</td>';
            tr.innerHTML += '<td>' + row[j].descripcionPadre + '</td>';
            tableEl.appendChild(tr);
         }
         tablesWrapper.appendChild(tableEl); // insert table into DOM
      }
   });
}

export default buildTables;