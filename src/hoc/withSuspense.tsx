import Preloader from '../components/common/Preloader/Preloader';
import React from 'react';

export function withSuspense<WCP>(WrappedComponent: React.ComponentType<WCP>) {
  return (props: WCP) => <React.Suspense fallback={<Preloader/>}>
    <WrappedComponent {...props}/>
  </React.Suspense>
}