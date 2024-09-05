import './js/bootstrap.bundle.min.js';
import './scss/fontawesome.scss';
import './scss/bootstrap.scss';
import './scss/style.scss';
import { Collapse } from './js/bootstrap.bundle.min.js';
import { loadCurrentPage, Storage } from './js/home.js';

//  Variables --------------------
const navbar = document.querySelector('.navbar');
const mediaObj = window.matchMedia(
  '(orientation:landscape) and (max-height:600px)'
);

// ----------------
let firstPlay = true;
const loadYoutubePlayerListeners = async () => {
  const { onYouTubeIframeAPIReady, stopVideo } = await import(
    './js/youtube_api.js'
  );

  const scrollToTopBtn = document.querySelector('a.fixed-bottom');
  const videoModal = document.getElementById('videoModal');
  const videoId = 'M7lc1UVf-VE';

  const closePlayer = () => {
    stopVideo();
    navbar.classList.add('fixed-top');
    scrollToTopBtn.classList.add('show');
  };

  const loadPlayer = () => {
    scrollToTopBtn.classList.remove('show');
    navbar.classList.contains('fixed-top') &&
      navbar.classList.remove('fixed-top');

    // -----------
    firstPlay === true &&
      videoModal.addEventListener('hide.bs.modal', closePlayer);

    firstPlay === false &&
      videoModal.removeEventListener('hide.bs.modal', closePlayer);

    onYouTubeIframeAPIReady(videoId);
    firstPlay = false;
  };

  videoModal.addEventListener('shown.bs.modal', loadPlayer);
};

// ----------------------
const userScroll = () => {
  const scrollToTopBtn = document.querySelector('a.fixed-bottom');

  if (window.scrollY > 1200) {
    !mediaObj.matches && navbar.classList.add('fixed-top', 'opacity-85');
    scrollToTopBtn.classList.add('show');
  } else {
    navbar.classList.remove('fixed-top', 'opacity-85');
    scrollToTopBtn.classList.remove('show');
  }
};

// Close navbar dropdown on link click --------------
const collapseNavbar = () => {
  const navbarCollapse = document.querySelector('.navbar-collapse');
  const bsCollapse = new Collapse(navbarCollapse, { toggle: false });
  const navLinks = document.querySelectorAll('.nav-link');

  navbarCollapse.addEventListener('show.bs.collapse', () => {
    navLinks.forEach((navLink) => {
      navLink.addEventListener('click', () => bsCollapse.hide());
    });
  });
};

function toggleFullScreen(videoEl) {
  if (!document.fullscreenElement) {
    videoEl.requestFullscreen();
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
}

// ------------------
const init = () => {
  loadCurrentPage();
  collapseNavbar();
  Storage.getCurrentPage() === 'home-page' && loadYoutubePlayerListeners();

  mediaObj.addEventListener('change', (e) => {
    e.matches &&
      navbar.classList.contains('fixed-top') &&
      navbar.classList.remove('fixed-top');
  });
  window.addEventListener('scroll', userScroll);
};

window.addEventListener('DOMContentLoaded', init);
