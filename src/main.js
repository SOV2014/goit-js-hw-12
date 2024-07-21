import axios from 'axios';
import { fetchImages } from './js/pixabay-api.js';
import {
  renderGallery,
  showNoResultsMessage,
  showFetchErrorMessage,
  hideLoadMoreButton,
  showEndOfResultsMessage,
  showLoadMoreButton,
} from './js/render-functions.js';

document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.querySelector('.search-form');
  const loadMoreButton = document.querySelector('.load-more-button');
  const loader = document.querySelector('.loader');
  const cardContainer = document.querySelector('.card-container');

  loader.style.display = 'none';
  loadMoreButton.style.display = 'none';

  let currentPage = 1;
  let currentQuery = '';
  let form;

  searchForm.addEventListener('submit', handleSearch);

  async function handleSearch(event) {
    event.preventDefault();

    form = event.currentTarget;
    const queryValue = form.elements.query.value.trim().toLowerCase();

    if (!queryValue) {
      return;
    }

    loader.style.display = 'inline-block';
    cardContainer.innerHTML = '';

    try {
      const data = await fetchImages(queryValue);
      loader.style.display = 'none';

      if (data.hits.length === 0) {
        showNoResultsMessage();
        hideLoadMoreButton();
      } else {
        renderGallery(data.hits);
        showLoadMoreButton();
        currentPage = 1;
        currentQuery = queryValue;
        smoothScrollToNextGroup();
      }
    } catch (error) {
      loader.style.display = 'none';
      showFetchErrorMessage();
    } finally {
      form.reset();
    }
  }

  loadMoreButton.addEventListener('click', async () => {
    loader.style.display = 'inline-block';

    try {
      const data = await fetchImages(currentQuery);
      loader.style.display = 'none';

      if (data.hits.length === 0) {
        showEndOfResultsMessage();
        hideLoadMoreButton();
      } else {
        renderGallery(data.hits);
        currentPage += 1;
        smoothScrollToNextGroup();
      }
    } catch (error) {
      loader.style.display = 'none';
      showFetchErrorMessage();
    } finally {
      form.reset();
    }
  });

  function smoothScrollToNextGroup() {
    const cardHeight = cardContainer
      .querySelector('.card')
      .getBoundingClientRect().height;

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
});
