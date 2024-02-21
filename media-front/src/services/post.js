const BASE_URL = 'http://localhost:3000/api/v1';
const USER_TOKEN = localStorage.getItem('token');

export const getPost = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${BASE_URL}/post`, {
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