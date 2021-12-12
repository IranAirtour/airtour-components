import React from 'react';
import deepmerge from 'deepmerge';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { ITheme, ThemeConsumer, IThemeProps } from './ThemeProvider';
import { ThemeColors } from '../../resources/colors';

const isClassComponent = (Component: any) =>
  Boolean(Component.prototype && Component.prototype.isReactComponent);

export interface ThemedComponent {
  displayName: string;
}

const ThemedComponent = (
  WrappedComponent: any,
  themeKey?: string,
  displayName?: string,
) => {
  return Object.assign(
    (props: any, forwardedRef: any) => {
      const { children, ...rest } = props;

      return (
        <ThemeConsumer>
          {context => {
            // If user isn't using ThemeProvider
            if (!context) {
              const newProps = {
                ...rest,
                theme: { dark: false, colors: ThemeColors.light },
                children,
              };
              return isClassComponent(WrappedComponent) ? (
                <WrappedComponent ref={forwardedRef} {...newProps} />
              ) : (
                <WrappedComponent {...newProps} />
              );
            }
            const { theme, updateTheme } = context;
            const newProps = {
              theme,
              updateTheme,
              ...deepmerge<ITheme>(
                (themeKey &&
                  (theme[
                    themeKey as keyof Partial<ITheme>
                  ] as Partial<ITheme>)) ||
                  {},
                rest,
                {
                  clone: false,
                },
              ),
              children,
            };
            if (isClassComponent(WrappedComponent)) {
              return <WrappedComponent ref={forwardedRef} {...newProps} />;
            }
            return <WrappedComponent {...newProps} />;
          }}
        </ThemeConsumer>
      );
    },
    { displayName: displayName },
  );
};

function withTheme<P = {}, T = {}>(
  WrappedComponent: React.ComponentType<P & Partial<IThemeProps>>,
  themeKey: string,
):
  | React.FunctionComponent<Omit<P, keyof IThemeProps>>
  | React.ForwardRefExoticComponent<P> {
  const name = themeKey
    ? `Themed.${themeKey}`
    : `Themed.${
        WrappedComponent.displayName || WrappedComponent.name || 'Component'
      }`;
  const Component = ThemedComponent(WrappedComponent, themeKey, name);

  if (isClassComponent(WrappedComponent)) {
    return hoistNonReactStatics(React.forwardRef(Component), WrappedComponent);
  }
  return Component;
}

export default withTheme;
