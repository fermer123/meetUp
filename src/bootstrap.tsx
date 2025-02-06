import ReactDOM from 'react-dom/client';

import ErrorBoundary from '@components/ErrorBoundary/ErrorBoundary';
import GlobalStyle from '@app/global';
import {Suspense} from 'react';
import Loader from '@components/Loader/Loader';
import Theme from '@app/Theme/Theme';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Suspense fallback={<Loader />}>
    <ErrorBoundary>
      <Theme>
        <GlobalStyle />
        <Loader />
      </Theme>
    </ErrorBoundary>
  </Suspense>,
);
