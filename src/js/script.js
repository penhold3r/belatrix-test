import 'materialize-css/dist/css/materialize.css';
import '../css/style.css';

import M from 'materialize-css';
import loadData from './load-data';

const init = () => {
   document.querySelector('.btn').addEventListener('click', handleClick, false);
   M.AutoInit();
   console.log('all set!');
}

// callback to load button
const handleClick = e => {
   //instance of raw data
   const ubigeos = 'https://raw.githubusercontent.com/penhold3r/belatrix-test/master/ubigeos.txt';

   e.preventDefault(); // just to be sure
   e.currentTarget.style.visibility = 'hidden'; // hide button after loading

   loadData(ubigeos);
}

//IIFE
(() => init())();
