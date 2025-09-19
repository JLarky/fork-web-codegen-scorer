import { liftSolid } from '@lift-html/solid';
import { targetRefs } from '@lift-html/incentive';

import.meta.hot?.accept();

const UnitSelector = liftSolid('unit-selector', {
  init(dispose) {
    const abortController = new AbortController();
    dispose(() => abortController.abort());

    const targets = targetRefs(this, {
      input: HTMLInputElement,
      kg: HTMLButtonElement,
      lbs: HTMLButtonElement,
    });

    if (!targets.input || !targets.kg || !targets.lbs) {
      console.error('Targets not found');
      return;
    }

    const input = targets.input;

    targets.kg.addEventListener(
      'click',
      () => ((input.checked = false), (this.dataset.value = 'kg')),
      abortController
    );

    targets.lbs.addEventListener(
      'click',
      () => ((input.checked = true), (this.dataset.value = 'lbs')),
      abortController
    );
  },
});

const ResultUnitsSelector = liftSolid('result-units-selector', {
  init(dispose) {
    const abortController = new AbortController();
    dispose(() => abortController.abort());

    const targets = targetRefs(this, {
      liters: HTMLButtonElement,
      ounces: HTMLButtonElement,
    });

    if (!targets.liters || !targets.ounces) {
      console.error('Result units targets not found');
      return;
    }

    targets.liters.addEventListener(
      'click',
      () => (this.dataset.value = 'liters'),
      abortController
    );

    targets.ounces.addEventListener(
      'click',
      () => (this.dataset.value = 'ounces'),
      abortController
    );
  },
});

declare module '@lift-html/core' {
  interface KnownElements {
    'unit-selector': typeof UnitSelector & {
      props: { 'data-value': 'kg' | 'lbs' };
    };
    'result-units-selector': typeof ResultUnitsSelector & {
      props: { 'data-value': 'liters' | 'ounces' };
    };
  }
}
