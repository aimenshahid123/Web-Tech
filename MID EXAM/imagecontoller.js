const imageNameDisplay = document.getElementById('image-name-display');
const images = document.querySelectorAll('img'); // Assumes you have multiple images

images.forEach(image => {
    image.addEventListener('mouseover', () => {
        imageNameDisplay.textContent = image.alt; 
        console.log( "event listening");
    });

    image.addEventListener('mouseout', () => {
        imageNameDisplay.textContent = ''; // Clear the display
    });
});