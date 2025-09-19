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

// Hydration Calculator App
const HydrationCalculator = liftSolid('my-app', {
  init(dispose) {
    const abortController = new AbortController();
    dispose(() => abortController.abort());

    const targets = targetRefs(this, {
      form: HTMLFormElement,
      weightInput: HTMLInputElement,
      unitSelector: HTMLElement,
      errorElement: HTMLElement,
      resultElement: HTMLElement,
      litersValue: HTMLElement,
      ouncesValue: HTMLElement,
    });

    if (
      !targets.form ||
      !targets.weightInput ||
      !targets.unitSelector ||
      !targets.errorElement ||
      !targets.resultElement
    ) {
      console.error('Required targets not found');
      return;
    }

    // Handle form submission
    targets.form.addEventListener(
      'submit',
      (e) => {
        e.preventDefault();

        if (
          !targets.weightInput ||
          !targets.unitSelector ||
          !targets.errorElement ||
          !targets.resultElement
        ) {
          console.error('Required targets not found');
          return;
        }

        const weight = parseFloat(targets.weightInput.value);
        const isLbs = targets.unitSelector.dataset.value === 'lbs';

        // Clear previous error
        targets.errorElement.textContent = '';
        targets.errorElement.classList.add('hidden');

        // Validate input
        if (!weight || weight <= 0 || weight >= 9999) {
          targets.errorElement.textContent = 'Please enter a valid weight.';
          targets.errorElement.classList.remove('hidden');
          return;
        }

        // Calculate daily intake
        // Base calculation: 35ml per kg of body weight
        const weightInKg = isLbs ? weight / 2.20462 : weight;
        const dailyIntakeMl = weightInKg * 35;
        const dailyIntakeLiters = dailyIntakeMl / 1000;
        const dailyIntakeOunces = dailyIntakeLiters * 33.814;

        // Update result display
        if (targets.litersValue) {
          targets.litersValue.textContent = dailyIntakeLiters.toFixed(1);
        }
        if (targets.ouncesValue) {
          targets.ouncesValue.textContent = dailyIntakeOunces.toFixed(1);
        }

        // Show result
        targets.resultElement.classList.remove('hidden');
      },
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
    'my-app': typeof HydrationCalculator & {
      props: { fakeProp: string };
    };
  }
}
