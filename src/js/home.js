import './replaceme.min.js';
import loadProjects from './projects.js';

// Header
import hero_image_html from '../html_files/home/header/hero_image.html';
import navbar_html from '../html_files/home/header/navbar.html';
import showcase_html from '../html_files/home/header/showcase.html';

// Main
import partners_html from '../html_files/home/main/partners.html';
import info_html from '../html_files/home/main/info.html';
import solutions_html from '../html_files/home/main/solutions.html';
import detail_1_html from '../html_files/home/main/details_1.html';
import details_2_html from '../html_files/home/main/details_2.html';
import expertise_html from '../html_files/home/main/expertise.html';
import video_html from '../html_files/home/main/video.html';
import pricing_html from '../html_files/home/main/pricing.html';
import projects_html from '../html_files/home/main/projects.html';
import subscribe_html from '../html_files/home/main/subscribe.html';

import footer_html from '../html_files/home/footer.html';
import scrollTop_html from '../html_files/home/scrollTop.html';

import about_html from '../html_files/home/main/inner_page/about.html';
import privacy_html from '../html_files/home/main/inner_page/privacy.html';
import inner_showcase_html from '../html_files/home/main/inner_page/inner_showcase.html';

// ---------------------
const header = document.getElementById('header');
const showcase = document.getElementById('showcase');
const body = document.querySelector('body');
const sections = document.querySelectorAll('section');
const innerSection = document.getElementById('inner-page');

// Storage ---------------
class Storage {
  static setCurrentPage = (current) => {
    localStorage.setItem('current-page', current);
  };

  static getCurrentPage = () => {
    return localStorage.getItem('current-page');
  };
}

// ----------------------
const loadBaseHTML = () => {
  header.insertAdjacentHTML('afterbegin', hero_image_html);
  header.querySelector('.navbar').innerHTML = navbar_html;
  document.getElementById('footer').innerHTML = footer_html;
  body.insertAdjacentHTML('beforeend', scrollTop_html);
};

// ------------------
const clearHTML = () => {
  sections.forEach((section) => {
    section.classList.add('d-none');
  });
  showcase.classList.replace('d-none', 'd-block');
  innerSection.classList.replace('d-none', 'd-block');
};

const innerPageLinksTarget = () => {
  const links = document.querySelectorAll(
    '.nav-link,.navbar-brand,.footer-link'
  );

  links.forEach((link) => {
    link.addEventListener('click', () => {
      Storage.setCurrentPage('home-page');
      loadHomePage();
    });
  });
};

const loadInnerPage = () => {
  clearHTML();
  showcase.innerHTML = inner_showcase_html;
  innerSection.querySelector('#about').innerHTML = about_html;
  innerSection.querySelector('#privacy').innerHTML = privacy_html;
  Storage.setCurrentPage('inner-page');
  innerPageLinksTarget();
};

const toDetailsPageListeners = () => {
  document
    .querySelectorAll('a[href="#privacy"],a[href="#about"]')
    .forEach((element) => {
      element.addEventListener('click', loadInnerPage);
    });
};

// --------------------------------
const restoreHTML = () => {
  sections.forEach((section) => {
    section.classList.replace('d-none', 'd-block');
  });

  innerSection.classList.replace('d-block', 'd-none');
};

const loadHomePage = () => {
  loadBaseHTML();
  showcase.innerHTML = showcase_html;
  new ReplaceMe(document.querySelector('.replace-me'));
  restoreHTML();

  document.getElementById('partners').innerHTML = partners_html;
  document.getElementById('info').innerHTML = info_html;
  document.getElementById('solutions').innerHTML = solutions_html;
  document.getElementById('details').innerHTML = detail_1_html;
  document.getElementById('details-2').innerHTML = details_2_html;
  document.getElementById('expertise').innerHTML = expertise_html;
  document.getElementById('video').innerHTML = video_html;
  document.getElementById('pricing').innerHTML = pricing_html;

  document.getElementById('projects').innerHTML = projects_html;
  loadProjects();

  document.getElementById('subscribe').innerHTML = subscribe_html;

  toDetailsPageListeners();
  Storage.setCurrentPage('home-page');
};

const loadCurrentPage = () => {
  !Storage.getCurrentPage() || Storage.getCurrentPage() === 'home-page'
    ? loadHomePage()
    : loadInnerPage();
};

export { loadCurrentPage, Storage };
