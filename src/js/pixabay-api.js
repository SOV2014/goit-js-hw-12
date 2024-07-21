import axios from 'axios';

const apiKey = '44780398-b9dbe1b89370a8f5261d05d93';
const baseUrl = 'https://pixabay.com/api/';

let currentPage = 1;
let currentQuery = '';

export async function fetchImages(query) {
  try {
    if (query !== currentQuery) {
      currentPage = 1;
      currentQuery = query;
    }

    const response = await axios.get(baseUrl, {
      params: {
        key: apiKey,
        q: query,
        page: currentPage,
        per_page: 15,
      },
    });

    currentPage += 1;

    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
}
