import {FC} from 'react';

import {Spinner, SpinnerContainer} from './Loader.styled';

const Loader: FC = () => {
  return (
    <SpinnerContainer>
      <Spinner />
    </SpinnerContainer>
  );
};

export default Loader;
