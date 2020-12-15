import Preloader from '../components/common/Preloader/Preloader';
import React from 'react';

export const withSuspense = (Component: React.FC) => {
  return (props: any) => <React.Suspense fallback={<Preloader/>}>
    <Component {...props}/>
  </React.Suspense>
}