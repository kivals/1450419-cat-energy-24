document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.header').classList.remove('header--nojs');

  const menuBurger = document.querySelector('.header__toggle');
  menuBurger.addEventListener('click', burgerClickHandler);

  const exampleLabelBefore = document.querySelector('.example__toggle-label--before');
  const exampleLabelAfter = document.querySelector('.example__toggle-label--after');
  const exampleImgBefore = document.querySelector('.example__photo-item--before');
  const exampleImgAfter = document.querySelector('.example__photo-item--after');
  const exampleToggler = document.querySelector('.example__toggler')

  exampleLabelBefore.addEventListener('click', () => {
    if (!exampleImgAfter.classList.contains('hidden')) {
      exampleImgAfter.classList.toggle('hidden');
      exampleImgBefore.classList.toggle('hidden');

      exampleToggler.classList.remove('example__toggler--after');
      exampleToggler.classList.add('example__toggler--before');
    }
  })

  exampleLabelAfter.addEventListener('click', () => {
    if (!exampleImgBefore.classList.contains('hidden')) {
      exampleImgBefore.classList.toggle('hidden');
      exampleImgAfter.classList.toggle('hidden');

      exampleToggler.classList.remove('example__toggler--before');
      exampleToggler.classList.add('example__toggler--after');
    }
  })
});

function burgerClickHandler(e) {
  this.classList.toggle('header__toggle--active');
  document.querySelector('.header__nav').classList.toggle('header__nav--active');
}
