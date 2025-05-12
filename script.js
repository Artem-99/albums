document.addEventListener('DOMContentLoaded', loadUsers);

async function loadUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
            throw new Error('Ошибка сети');
        }
        const users = await response.json();
        const usersDiv = document.getElementById('users');
        usersDiv.innerHTML = ''; // Очищаем содержимое
        users.forEach(user => {
            const userElement = document.createElement('div');
            userElement.textContent = user.name;
            userElement.addEventListener('click', () => loadAlbums(user.id));
            usersDiv.appendChild(userElement);
        });
    } catch (error) {
        console.error('Ошибка при загрузке пользователей:', error);
        const usersDiv = document.getElementById('users');
        usersDiv.innerHTML = 'Ошибка загрузки пользователей';
    }
}


async function loadAlbums(userId) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`);
        if (!response.ok) {
            throw new Error('Ошибка сети');
        }
        const albums = await response.json();
        const albumsDiv = document.getElementById('albums');
        albumsDiv.innerHTML = '';

        const backButton = document.createElement('button');
        backButton.textContent = 'Назад к пользователям';
        backButton.addEventListener('click', () => {
            albumsDiv.style.display = 'none';
            document.getElementById('photos').style.display = 'none';
            document.getElementById('users').style.display = 'block';
        });
        albumsDiv.appendChild(backButton);

        albums.forEach(album => {
            const albumElement = document.createElement('div');
            albumElement.textContent = album.title;
            albumElement.addEventListener('click', () => loadPhotos(album.id));
            albumsDiv.appendChild(albumElement);
        });
        
        albumsDiv.style.display = 'block';
        document.getElementById('photos').style.display = 'none';
        document.getElementById('users').style.display = 'none';
    } catch (error) {
        console.error('Ошибка при загрузке альбомов:', error);
        const albumsDiv = document.getElementById('albums');
        albumsDiv.innerHTML = 'Ошибка загрузки альбомов';
    }
}


async function loadPhotos(albumId) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);
        if (!response.ok) {
            throw new Error('Ошибка сети');
        }
        const photos = await response.json();
        const photosDiv = document.getElementById('photos');
        photosDiv.innerHTML = ''; 

        const backButton = document.createElement('button');
        backButton.textContent = 'Назад к альбомам';
        backButton.addEventListener('click', () => {
            photosDiv.style.display = 'none';
            document.getElementById('albums').style.display = 'block';
        });
        photosDiv.appendChild(backButton);

        photos.forEach(photo => {
            const photoElement = document.createElement('img');
            photoElement.src = photo.thumbnailUrl;
            photosDiv.appendChild(photoElement);
        });

        photosDiv.style.display = 'grid';
        document.getElementById('albums').style.display = 'none';
    } catch (error) {
        console.error('Ошибка при загрузке фотографий:', error);
        const photosDiv = document.getElementById('photos');
        photosDiv.innerHTML = 'Ошибка загрузки фотографий';
    }
}
