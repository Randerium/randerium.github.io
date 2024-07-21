const API_KEY = 'AIzaSyA4UxCSS7UV0HIiqFsYVzFC7Dp9iIvpLcI'; // Remplace par ta clé d'API YouTube
const CHANNEL_ID = 'UCa3LIQmi_oVtPNRL2iEB71A'; // Remplace par l'ID de la chaîne YouTube

document.addEventListener('DOMContentLoaded', function() {
    fetchVideos(CHANNEL_ID);
});

function fetchVideos(channelId) {
    const videoContainer = document.getElementById('video-container');
    const videonumber = document.getElementById('videonumber');

    videoContainer.innerHTML = '<p>Chargement des vidéos...</p>';

    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=10&order=date&type=video&key=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            if (data.items && data.items.length > 0) {
                videoContainer.innerHTML = ''; // Clear loading message
                data.items.forEach(item => {
                    const videoId = item.id.videoId;
                    const iframe = document.createElement('iframe');
                    iframe.width = '700';
                    iframe.height = '500';
                    iframe.src = `https://www.youtube.com/embed/${videoId}`;
                    iframe.frameBorder = '0';
                    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
                    iframe.allowFullscreen = true;
                    videoContainer.appendChild(iframe);
                    
                });
            } else {
                videonumber.innerHTML = '';
                videoContainer.innerHTML = '<p>Aucune vidéo trouvée.</p>';
                console.log("Aucune vidéo trouvée. Pour l'ID: " + channelId)
            }
        })
        .catch(error => {
            console.error('Erreur:', error);
            videoContainer.innerHTML = '<p>Une erreur est survenue lors de la récupération des vidéos.</p>';
        });
}