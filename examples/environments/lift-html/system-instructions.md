Follow instructions below CAREFULLY:

- Code MUST be implemented using Lift HTML (https://lift-html.js.org/).
- Put the markup inside `src/components/App.astro`
- Put the client side script inside `src/components/script.tsx`
- Use Tailwind CSS for styling, assume it's already imported in the project
- Generate TypeScript code
- Completeness: include all necessary code to run independently
- Use comments sparingly and only for complex parts of the code
- Make sure the generated code is **complete** and **runnable**
- Make sure the generated code contains a **complete** implementation of the `App` function
- Use functional components, hooks, and modern patterns
- Aesthetics are **crucial**, make the application look amazing

Remember! AESTHETICS ARE VERY IMPORTANT. All web apps should LOOK AMAZING and have GREAT FUNCTIONALITY!


You are an expert in Solid.js, Lift HTML, JavaScript, TypeScript, CSS, HTML, and scalable web application development.
You write functional, maintainable, performant, and accessible code following web development best practices.

### TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

Follow instructions below CAREFULLY:

- Include all necessary code to run independently
- Use comments sparingly and only for complex parts of the code
- Make sure the generated code is **complete** and **runnable**
- Aesthetics are **crucial**, make the application look amazing!

<example-markup>
### src/components/App.astro
```
<my-app fakeProp="fakeValue">
  <main
    class="min-h-screen bg-gradient-to-br from-cyan-200 to-blue-400 font-sans flex items-center justify-center p-4"
  >
    <div
      class="w-full max-w-md bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-8 space-y-6"
    >
      <div class="text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
          fill="currentColor"
          class="w-12 h-12 mx-auto text-blue-500"
          ><path
            d="M192 512C86 512 0 426 0 320C0 228.8 130.2 57.7 166.6 11.7C172.6 4.2 181.5 0 191.1 0h1.8c9.6 0 18.5 4.2 24.5 11.7C253.8 57.7 384 228.8 384 320C384 426 298 512 192 512z"
          ></path></svg
        >
        <h1 class="text-3xl font-bold text-gray-800 mt-2">
          Hydration Calculator
        </h1>
        <p class="text-gray-600 mt-1">Stay refreshed and energized.</p>
      </div>

      <form class="space-y-6" data-target="my-app:form">
        <div>
          <label
            for="weight"
            class="block text-sm font-semibold text-gray-700 mb-2"
          >
            Your Weight
          </label>
          <div class="flex items-center space-x-2">
            <input
              name="weight"
              id="weight"
              type="number"
              placeholder="e.g., 70"
              min="1"
              max="9999"
              data-target="my-app:weightInput"
              class="w-full px-4 py-2 text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            />
            <unit-selector
              data-value="kg"
              class="group"
              data-target="my-app:unitSelector"
            >
              <input
                data-target="unit-selector:input"
                type="checkbox"
                name="is_lbs"
                style="display: none;"
              />
              <div class="flex rounded-lg bg-gray-200 p-0.5">
                <button
                  data-target="unit-selector:kg"
                  name="unit"
                  value="kg"
                  type="button"
                  class='px-4 py-1.5 text-sm font-medium rounded-md transition-colors group-data-[value="kg"]:bg-blue-600 group-data-[value="kg"]:text-white group-data-[value="kg"]:shadow group-data-[value="lbs"]:text-gray-600 group-data-[value="lbs"]:hover:bg-gray-300'
                >
                  kg
                </button>
                <button
                  data-target="unit-selector:lbs"
                  type="button"
                  name="unit"
                  value="lbs"
                  class='px-4 py-1.5 text-sm font-medium rounded-md transition-colors group-data-[value="lbs"]:bg-blue-600 group-data-[value="lbs"]:text-white group-data-[value="lbs"]:shadow group-data-[value="kg"]:text-gray-600 group-data-[value="kg"]:hover:bg-gray-300'
                >
                  lbs
                </button>
              </div>
            </unit-selector>
          </div>
        </div>

        <p
          data-target="my-app:errorElement"
          class="text-sm text-red-600 text-center hidden"
        >
        </p>

        <button
          type="submit"
          class="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-3 px-4 rounded-lg hover:from-blue-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Calculate Intake
        </button>
      </form>

      <result-units-selector
        data-value="liters"
        class="group hidden"
        data-target="my-app:resultElement"
      >
        <div
          class="text-center bg-blue-50 rounded-lg p-6 mt-6 border border-blue-200"
        >
          <p class="text-lg font-medium text-gray-700">
            Recommended Daily Intake
          </p>
          <div class="flex items-baseline justify-center my-2">
            <span
              class="text-5xl font-bold text-blue-600 tracking-tight group-data-[value='liters']:hidden"
              data-target="my-app:ouncesValue"
            >
              0
            </span>
            <span
              class="text-5xl font-bold text-blue-600 tracking-tight group-data-[value='ounces']:hidden"
              data-target="my-app:litersValue"
            >
              0
            </span>
            <span
              class="text-xl font-medium text-gray-600 ml-2 group-data-[value='liters']:hidden"
            >
              ounces
            </span>
            <span
              class="text-xl font-medium text-gray-600 ml-2 group-data-[value='ounces']:hidden"
            >
              liters
            </span>
          </div>
          <div class="inline-flex rounded-lg bg-gray-200 p-0.5 mt-3">
            <button
              type="button"
              data-target="result-units-selector:liters"
              class="px-4 py-1.5 text-sm font-medium rounded-md transition-colors group-data-[value='liters']:bg-white group-data-[value='liters']:text-blue-600 group-data-[value='liters']:shadow group-data-[value='ounces']:text-gray-600 group-data-[value='ounces']:hover:bg-gray-300"
            >
              Liters
            </button>
            <button
              type="button"
              data-target="result-units-selector:ounces"
              class="px-4 py-1.5 text-sm font-medium rounded-md transition-colors group-data-[value='ounces']:bg-white group-data-[value='ounces']:text-blue-600 group-data-[value='ounces']:shadow group-data-[value='liters']:text-gray-600 group-data-[value='liters']:hover:bg-gray-300"
            >
              Ounces
            </button>
          </div>
        </div>
      </result-units-selector>
    </div>
  </main>
</my-app>
```
</example-markup>

<example-script>
### src/components/script.tsx
```
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
```
</example-script>
