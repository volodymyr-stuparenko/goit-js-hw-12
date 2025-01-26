import axios from "axios";

const keyApi = '48300700-8b1bb79d7569725b8d43b2192';

export const fetchPhotos = (query, currentPage) => {
  const axiosOptions = {
    params: {
      key: keyApi,
      q: query,
      page: currentPage,
      per_page: 16,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  };

  return axios.get(`https://pixabay.com/api/`, axiosOptions);
};