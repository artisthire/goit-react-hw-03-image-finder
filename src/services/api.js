const API_KEY = '27905247-52ff39917099ed7913d47ea34';
const BASE_URL = `https://pixabay.com/api/?key=${API_KEY}&image_type=photo&orientation=horizontal`;

async function getData(query, page = 1, perPage = 12) {
  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.open('GET', `${BASE_URL}&per_page=${perPage}&page=${page}&q=${query}`);
  xhr.send();

  return new Promise((resolve, reject) => {
    xhr.onload = () => {
      if (xhr.status !== 200) {
        reject(new Error(`Something went wrong. Error ${xhr.status}`));
      } else {
        if (xhr.response.total === 0) {
          reject(new Error(`Not found for request: "${query}"`));
        } else {
          resolve(xhr.response);
        }
      }
    };

    xhr.onerror = () => {
      reject(new Error('Connection error'));
    };
  });
}

const API = {
  getData,
};

export default API;
