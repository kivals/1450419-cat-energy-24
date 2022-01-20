document.addEventListener('DOMContentLoaded', () => {
  const exampleLabelBefore = document.querySelector('.example__toggle-label--before');
  const exampleLabelAfter = document.querySelector('.example__toggle-label--after');
  const exampleAnimationContainer = document.querySelector('.example__animation');


  exampleLabelBefore.addEventListener('click', () => {
    if (!exampleAnimationContainer.classList.contains('example__animation--action-before')) {
      exampleAnimationContainer.classList.add('example__animation--action-before');
      exampleAnimationContainer.classList.remove('example__animation--action-after');
    }
  })

  exampleLabelAfter.addEventListener('click', () => {
    if (!exampleAnimationContainer.classList.contains('example__animation--action-after')) {
      exampleAnimationContainer.classList.add('example__animation--action-after');
      exampleAnimationContainer.classList.remove('example__animation--action-before');
    }
  })
});
