import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const inputObject = document.querySelector('#search-box');
const listObject = document.querySelector('.country-list');
const blockObject = document.querySelector('.country-info');

inputObject.addEventListener('input', debounce(inputWrite, DEBOUNCE_DELAY));

function inputWrite(object) {
  let nameCountry = object.target.value.trim();
  if (!nameCountry) {
    blockObject.innerHTML = '';
    listObject.innerHTML = '';
    return;
  }

  fetchCountries(nameCountry)
    .then(r => {
      if (r.length > 10) {
        blockObject.innerHTML = '';
        listObject.innerHTML = '';
        return Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
      if (r.length === 1) {
        listObject.innerHTML = '';
        return blockObject.insertAdjacentHTML(
          'beforeend',
          renderCountryCard(r)
        );
      }
      blockObject.innerHTML = '';
      listObject.insertAdjacentHTML('beforeend', renderList(r));
    })
    .catch(error => {
      blockObject.innerHTML = '';
      listObject.innerHTML = '';
    });
}

function renderList(array) {
  return array
    .map(
      ({ name, flags }) =>
        `<li class="country-item"><img src="${flags.png}" alt="${name.official}" width='32' height = '20'>
        <p class="country-text">${name.official}</p></li>`
    )
    .join('');
}

function renderCountryCard(array) {
  return array
    .map(
      ({ name, capital, population, flags, languages }) =>
        `<div class = "country-item"><img src="${flags.png}" alt="${
          name.official
        }" width='64' height = '40'>
        <h1 class="country-text">${name.official}</h1></div>
        <p class="country-text-info">Capital: ${capital}</p>
        <p class="country-text-info">Population: ${population}</p>
        <p class="country-text-info">Languages: ${Object.values(languages)} </p>
        `
    )
    .join();
}
