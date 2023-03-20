import { Notify } from 'notiflix/build/notiflix-notify-aio';
const baseURL = 'https://restcountries.com/v3.1/all';

export function fetchCountries(name) {
  return fetch(`${baseURL}/name/${name}`)
    .then(response => {
      if (!response.ok) {
        return Notify.failure(' Oops, there is no country with that name ');
      }
      return response.json();
    })
    .catch(error => console.log(error));
}
