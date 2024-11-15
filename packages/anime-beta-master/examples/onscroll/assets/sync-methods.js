import {
  utils,
  animate,
  onScroll,
  stagger,
} from '../../../src/anime.js';

// Sync

const sections = utils.$('section');
const methods = ['play', 'play pause', 'playForward pause playBackward pause', 'restart restart'];

 sections.forEach(($section, i) => {
  animate($section.querySelectorAll('.card'), {
    z: [i * 10, i * 10],
    rotate: [stagger(utils.random(-1, 1, 2)), stagger(15)],
    transformOrigin: ['75% 75%', '75% 75%'],
    ease: 'inOut(1)',
    autoplay: onScroll({
      sync: methods[i],
      debug: true,
      enter:  'center max',
      leave: 'center min',
    }),
  });
});