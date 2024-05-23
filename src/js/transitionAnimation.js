/**
 * This script is used to animate the transition between pages.
 * @author Philip
 */

window.onload = () => {
    const transitionElement = document.querySelector('.transition');
    const allButtons = document.querySelectorAll('a');

    setTimeout(() => {
        transitionElement.classList.remove('is-active');
    }, 500);

    for (let i = 0; i < allButtons.length; i++) {
        const button = allButtons[i];

        button.addEventListener('click', e => { // Add event listener to all buttons
            e.preventDefault()
            const target = e.currentTarget.href;
            console.log(target)

            transitionElement.classList.add('is-active');// Add the class is-active to the transition element
            setTimeout(() => {
                window.location.href = target;
            }, 500);
        });

        // Check if all images are loaded and current page is Game.html
        if (window.allImagesLoaded && window.location.href.includes('Game.html')) {
            console.log('All images are loaded');
        }
    }
}