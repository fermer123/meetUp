import {Suspense} from 'react';
import ReactDOM from 'react-dom/client';

import GlobalStyle from '@app/global';
import Theme from '@app/Theme/Theme';
import ErrorBoundary from '@components/ErrorBoundary/ErrorBoundary';
import Header from '@components/Header/Header';
import Loader from '@components/Loader/Loader';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Suspense fallback={<Loader />}>
    <ErrorBoundary>
      <Theme>
        <GlobalStyle />
        <Header />
      </Theme>
    </ErrorBoundary>
  </Suspense>,
);
