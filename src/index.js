import './css/styles.css';

import LINK from './fetchCountries';

import Notiflix from 'notiflix';
var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  ul: document.querySelector('.country-list'),
  divInfo: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(event) {
  let userCountry = event.target.value.trim();

if (userCountry) {
    LINK.fetchCountries(userCountry)
    .then(successFind)
    .catch(errorFind)
 
    }

    refs.input.innerHTML = ''
    refs.divInfo.innerHTML = ''

}

function successFind(userFoundCountry){
    // console.log(userFoundCountry)

    if (userFoundCountry.length > 10) {
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
    }
    else if(userFoundCountry.length === 1){
        const markup = showOneCounry(userFoundCountry);

        refs.input.innerHTML = '';
        refs.divInfo.innerHTML = markup;
    }
    else if (userFoundCountry.length > 1 || userFoundCountry.length < 10) {
        const markup = showAllCounry(userFoundCountry)

        refs.input.innerHTML = '';
        refs.divInfo.innerHTML = markup;
    }
    else{
        // console.log(userFoundCountry.message)
        Notiflix.Notify.failure("Oops, there is no country with that name");
        refs.input.innerHTML = '';
        refs.divInfo.innerHTML = '';
    }

}


function showOneCounry(userFoundCountry){
    return userFoundCountry
    .map(({ name, flags, capital, population, languages }) => {

      return `
        <li class="country-item">
          <img src="${flags.svg}" alt="${name.official}" width="60" height="30">
          <p>${name.official}</p>
          <p>Capital: ${capital}</p>
          <p>Population: ${population}</p>
          <p>Languages: ${Object.values(languages).join(',')}</p>
        </li>
      `;
    })
    .join('');
}
// Object.values(languages).join(',')
function showAllCounry(userFoundCountry){
    return userFoundCountry
    .map(({ name, flags }) => {
      return `
        <li class="country-item">
          <img src="${flags.svg}" alt="${name.official}" width="60" height="30">
          <p>${name.official}</p>
        </li>
      `;
    })
    .join('');
}

function errorFind(еrror){
   Notiflix.Notify.failure("Oops, there is no country with that name");
}