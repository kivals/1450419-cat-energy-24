document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.header').classList.remove('header--nojs');

  const routeLinks = document.querySelectorAll('.header__nav-link');

  Array.from(routeLinks).forEach(link => {
    const linkUrl = new URL(link.href);
    if (linkUrl.pathname === document.location.pathname) {
      link.classList.add('header__nav-item--active');
    }
  })

  const menuBurger = document.querySelector('.header__toggle');
  menuBurger.addEventListener('click', burgerClickHandler);
});

function burgerClickHandler(e) {
  this.classList.toggle('header__toggle--active');
  document.querySelector('.header__nav').classList.toggle('header__nav--active');
}
