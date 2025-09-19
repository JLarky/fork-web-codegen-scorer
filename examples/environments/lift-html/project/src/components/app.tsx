import { liftSolid } from '@lift-html/solid';

import.meta.hot?.accept();

const MyApp = liftSolid('my-app', {
  init(dispose) {
    const abortController = new AbortController();
    dispose(() => abortController.abort());
  },
});

declare module '@lift-html/core' {
  interface KnownElements {
    'my-app': typeof MyApp & {
      props: { 'fake-prop': 'fakeValue' };
    };
  }
}
