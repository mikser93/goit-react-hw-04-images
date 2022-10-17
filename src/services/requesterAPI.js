export function requesterAPI(serachWord, page) {
    const API_KEY = '29360709-e61ed8eebe570e88773d53140';
    const requestPath = `https://pixabay.com/api/?q=${serachWord}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

    return fetch(requestPath)
        .then(resp => {
            if (!resp.ok) {
                throw new Error(resp.status);
            }
            return resp.json();
        });
};