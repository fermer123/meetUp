import {lazy, Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import styled from 'styled-components';

import GlobalStyle from '@app/global';
import Theme from '@app/Theme/Theme';
import ErrorBoundary from '@components/ErrorBoundary/ErrorBoundary';
import Header from '@components/Header/Header';
import Loader from '@components/Loader/Loader';
import {Box} from '@mui/material';
import {ThemeProvider} from '@provider/ThemeProvider';

// const BusinessСard = lazy(() => import('firstApp/BusinessСard'));

export const ErrorContainer = styled(Box)`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BusinessСard = lazy(() =>
  import('firstApp/BusinessСard').catch(() => ({
    default: () => (
      <ErrorContainer>Не удалось загрузить бизнес Карточку</ErrorContainer>
    ),
  })),
);

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
