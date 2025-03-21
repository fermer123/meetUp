import {lazy, Suspense} from 'react';
import ReactDOM from 'react-dom/client';

import GlobalStyle from '@app/global';
import Theme from '@app/Theme/Theme';
import ErrorBoundary from '@components/ErrorBoundary/ErrorBoundary';
import Header from '@components/Header/Header';
import Loader from '@components/Loader/Loader';
import {ThemeProvider} from '@provider/ThemeProvider';

const BusinessСard = lazy(() => import('firstApp/BusinessСard'));

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Suspense fallback={<Loader />}>
    <ErrorBoundary>
      <ThemeProvider>
        <Theme>
          <GlobalStyle />
          <Header />
          <BusinessСard name='Igor Smolin' />
        </Theme>
      </ThemeProvider>
    </ErrorBoundary>
  </Suspense>,
);
