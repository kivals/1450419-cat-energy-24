document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.header').classList.remove('header--nojs');

  const menuBurger = document.querySelector('.header__toggle');
  menuBurger.addEventListener('click', burgerClickHandler);
});

function burgerClickHandler(e) {
  this.classList.toggle('header__toggle--active');
  document.querySelector('.header__nav').classList.toggle('header__nav--active');
}
