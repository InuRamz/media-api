const BASE_URL = 'http://localhost:3000/api/v1';
const USER_TOKEN = localStorage.getItem('token');

export const getThematics = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${BASE_URL}/thematic`, {
				method: 'GET',
				headers: {'Content-Type': 'application/json', 'Authorization': USER_TOKEN}
			});
	
			if (response.ok) {
				const data = await response.json();
				resolve(data);
	
			} else {
				reject(null);
			}
	
		} catch (error) {
			reject(error);
		}
	});
};

export const addThematic = ({name, category, file}) => {
	return new Promise(async (resolve, reject) => {
		try {
			const formData = new FormData();
			formData.append('name', name);
			formData.append('category', category);
			formData.append('front', file);

			const response = await fetch(`${BASE_URL}/thematic`, {
				method: 'POST',
				headers: {'Authorization': USER_TOKEN},
				body: formData,
			});
	
			if (response.ok) {
				const data = await response.json();
				resolve(data);
	
			} else {
				reject(null);
			}
	
		} catch (error) {
			reject(error);
		}
	});
};
