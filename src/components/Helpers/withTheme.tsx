import React from 'react';
import {Theme, useTheme} from '@react-navigation/native';
// export const withTheme = (Component: React.ComponentClass | React.FC) => {
//   return (props: any) => {
//     const theme: Theme = useTheme();
//     return <Component {...props} theme={theme} />;
//   };
// };

//https://react-typescript-cheatsheet.netlify.app/docs/hoc/full_example/
export function withTheme<T>(WrappedComponent: React.ComponentType<T>) {
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';
  const ComponentWithTheme = (props: any) => {
    const theme: Theme = useTheme();
    return <WrappedComponent {...(props as T)} theme={theme} />;
  };
  ComponentWithTheme.displayName = `withTheme(${displayName})`;
  return ComponentWithTheme;
}
