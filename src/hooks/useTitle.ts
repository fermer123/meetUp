import {useEffect} from 'react';

export const useTitle = (value: string = 'mainApp') => {
  useEffect(() => {
    document.title = value;
  });
};
