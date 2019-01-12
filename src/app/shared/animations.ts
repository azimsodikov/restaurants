import { trigger, style, animate, transition, query, animateChild, group } from '@angular/animations';

export const slideInAnimation =
  trigger('routeAnimations', [
    // Declares an animation transition as a sequence of animation steps to run when a given condition is satisfied.
    transition('HOME => DETAILS', [
      style({ position: 'relative' }),
      // Finds one or more inner elements within the current element that is being animated within a sequence.
      query(':enter, :leave', [
        style({
          position: 'absolute',
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ left: '-100%'})
      ]),
      query(':leave', animateChild()),
      // Defines a list of animation steps to be run in parallel.
      group([
        query(':leave', [
          // call to specify an animation step that applies given style data to the parent animation for a given amount of time.
          animate('400ms ease-out', style({ left: '100%'}))
        ]),
        query(':enter', [
          animate('400ms ease-in', style({ left: '0%'}))
        ])
      ]),
      query(':enter', animateChild()),
    ]),
  ]);
