document.addEventListener('DOMContentLoaded', () => {
  //TODO разобрать с цветом на разный страницах
  const routeLinks = document.querySelectorAll('.header__nav-link');
  Array.from(routeLinks).forEach(link => {
    const linkUrl = new URL(link.href);
    console.log(linkUrl);
    if (linkUrl.pathname === document.location.pathname && linkUrl.hash === document.location.hash) {
      console.log('HERE');
      // console.log(link.closest('.header__nav-item'));
      link.closest('.header__nav-item').classList.add('header__nav-item--active');
    }
  })

  document.querySelector('.header').classList.remove('header--nojs');

  const menuBurger = document.querySelector('.header__toggle');
  menuBurger.addEventListener('click', burgerClickHandler);
});

function burgerClickHandler(e) {
  this.classList.toggle('header__toggle--active');
  document.querySelector('.header__nav').classList.toggle('header__nav--active');
}
