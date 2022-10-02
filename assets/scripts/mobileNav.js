const navMenuBtn = document.querySelector('.nav-container > img');

const showNavHandler = () => {
    const navEl = document.getElementById('nav');
    navEl.classList.toggle('mobile-nav');
}

navMenuBtn.addEventListener('click', showNavHandler);
