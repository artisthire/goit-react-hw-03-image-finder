import axios from 'axios';

const API_KEY = '27905247-52ff39917099ed7913d47ea34';

axios.defaults.baseURL = 'https://pixabay.com/api';

async function getData(query, page = 1, perPage = 12) {
  try {
    const { data } = await axios.get(
      `/?key=${API_KEY}&per_page=${perPage}&page=${page}&q=${query}&image_type=photo&orientation=horizontal`
    );

    if (data.total === 0) {
      throw new Error(`Not found for request: "${query}"`);
    }

    return data;
  } catch (error) {
    if (error.code) {
      throw new Error(
        `Something went wrong. Please try again later. Error: ${error.code}`
      );
    }

    throw error;
  }
}

const API = {
  getData,
};

export default API;
