/// <reference path='./types.js' />

import {
  minValue,
  noop,
  valueTypes,
  tickModes,
} from './consts.js';

import {
  cloneArray,
} from './helpers.js';

import {
  render,
} from './render.js';

export const additive = {
  animation: null,
  update: noop,
}

/**
 * @typedef AdditiveAnimation
 * @property {Number} duration
 * @property {Number} _offset
 * @property {Number} _delay
 * @property {Tween} _head
 * @property {Tween} _tail
 */

/**
 * @param  {TweenAdditiveLookups} lookups
 * @return {AdditiveAnimation}
 */
export const addAdditiveAnimation = lookups => {
  let animation = additive.animation;
  if (!animation) {
    animation = {
      duration: minValue,
      _offset: 0,
      _delay: 0,
      _head: null,
      _tail: null,
    }
    additive.animation = animation;
    additive.update = () => {
      lookups.forEach(propertyAnimation => {
        for (let propertyName in propertyAnimation) {
          const tweens = propertyAnimation[propertyName];
          const lookupTween = tweens._head;
          const additiveValues = lookupTween._valueType === valueTypes.COMPLEX ? cloneArray(lookupTween._fromNumbers) : null;
          let additiveValue = lookupTween._fromNumber;
          let tween = tweens._tail;
          while (tween && tween !== lookupTween) {
            if (additiveValues) {
              tween._numbers.forEach((value, i) => additiveValues[i] += value);
            } else {
              additiveValue += tween._number;
            }
            tween = tween._prevAdd;
          }
          lookupTween._toNumber = additiveValue;
          lookupTween._toNumbers = additiveValues;
        }
      });
      // TODO: Avoid polymorphism here, idealy the additive animation should be a regular animation with a higher priority in the render loop
      render(animation, 1, 1, 0, tickModes.FORCE);
    }
  }
  return animation;
}
