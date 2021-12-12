import React from 'react';
import deepmerge from 'deepmerge';
import { IColors, ThemeColors } from '../../resources/colors';
import { AsyncStorageService } from '../../utils/AsyncStorageService';
import { stringToBoolean } from '../../utils/StringUtils';
import { THEME_KEY } from '../../resources/strings';

export type ITheme = {
  dark: boolean;
  colors: IColors;
};

export interface IThemeProps {
  theme: ITheme;
  updateTheme: (dark: boolean) => void;
}

export const ThemeContext: React.Context<IThemeProps> = React.createContext({
  theme: { colors: ThemeColors.light, dark: false },
} as unknown as IThemeProps);

export function useThemeContext() {
  const context = React.useContext(ThemeContext);
  if (typeof context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeContext');
  }
  return context;
}

export function useThemeColors(): IColors {
  const themeContext = useThemeContext();
  return themeContext.theme.colors;
}
export type ThemeProviderProps = {
  dark?: boolean;
};

type ThemeProviderState = {
  theme: ITheme;
};

export default class ThemeProvider extends React.Component<
  ThemeProviderProps,
  ThemeProviderState
> {
  static defaultProps = {
    theme: ThemeColors.light,
    dark: false,
  };
  defaultTheme: Partial<ITheme>;

  constructor(props: { theme: ITheme; dark?: boolean }) {
    super(props);
    const defaultColors = props.dark ? ThemeColors.dark : ThemeColors.light;
    this.defaultTheme = deepmerge(
      {
        colors: defaultColors,
        dark: Boolean(props?.dark),
      },
      props.theme,
    );
    this.state = {
      theme: this.defaultTheme as ITheme,
    };
  }
  getThemePreference = async () => {
    try {
      const isDark = stringToBoolean(
        (await AsyncStorageService.getItem(THEME_KEY, false)) as string,
      );
      if (isDark) {
        this.updateTheme(isDark);
      }
    } catch (_) {}
  };
  componentDidMount() {
    this.getThemePreference();
  }

  updateTheme = (dark: boolean) => {
    this.setState(({ theme }) => ({
      theme: deepmerge(theme, {
        dark,
        colors: dark ? ThemeColors.dark : ThemeColors.light,
      }),
    }));
  };

  isDark = (): boolean => this.state.theme.dark;
  getTheme = () => this.state.theme;

  render() {
    return (
      <ThemeContext.Provider
        value={{
          theme: this.state.theme,
          updateTheme: this.updateTheme,
        }}>
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}

export const ThemeConsumer = ThemeContext.Consumer;
