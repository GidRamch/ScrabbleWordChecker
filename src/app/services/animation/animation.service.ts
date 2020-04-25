import { Injectable } from '@angular/core';
import { Animation, AnimationController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class AnimationService {

  constructor(private animationCtrl: AnimationController) { }

  /**
   * Animates the inputted element using a bounce effect,
   * based on scale.
   * @param element reference to element to animate
   */
  scaleBounce(element: Element) {
    const animation: Animation = this.animationCtrl.create()
      .addElement(element)
      .duration(1000)
      .keyframes([
        { offset: 0, transform: 'scale(0)' },
        { offset: 0.1, transform: 'scale(0.08)' },
        { offset: 0.2, transform: 'scale(0.3)' },
        { offset: 0.3, transform: 'scale(0.69)' },
        { offset: 0.36, transform: 'scale(1)' },
        { offset: 0.4, transform: 'scale(0.91)' },
        { offset: 0.5, transform: 'scale(0.77)' },
        { offset: 0.5, transform: 'scale(0.75)' },
        { offset: 0.6, transform: 'scale(0.78)' },
        { offset: 0.73, transform: 'scale(1)' },
        { offset: 0.82, transform: 'scale(0.94)' },
        { offset: 0.93, transform: 'scale(1)' },
        { offset: 0.95, transform: 'scale(0.98)' },
        { offset: 1, transform: 'scale(1)' },
      ]);
    animation.play();
  }
}
