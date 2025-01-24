const keyApi = '48300700-8b1bb79d7569725b8d43b2192';

export const fetchPhotos = query => {
    const searchParams = new URLSearchParams({
        key: keyApi,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
    });

  return fetch(`https://pixabay.com/api/?${searchParams}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }

    return response.json();
  });
};