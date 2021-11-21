export const colors = {
  red: '#D13939',
  orange: '#FF9500',
  yellow: '#FFCC00',
  green: '#4CD964',
  tealBlue: '#5AC8FA',
  blue: '#007AFF',
  purple: '#5856D6',
  pink: '#FF2D55',
  white: '#FFFFFF',
  customGray: '#EFEFF4',
  lightGray: '#E5E5EA',
  lightGray2: '#D1D1D6',
  midGray: '#C7C7CC',
  gray: '#C4C4C4',
  black: '#000000',
};

export type IColors = {
  backgroundMain: string;
  backgroundPaper: string;
  primaryDark: string;
  primaryMain: string;
  primaryLight: string;
  primaryShade: string;
  primaryGray: string;
  secondaryDark: string;
  secondaryMain: string;
  secondaryLight: string;
  secondaryShade: string;
  grey50: string;
  grey100: string;
  grey200: string;
  grey300: string;
  grey400: string;
  grey500: string;
  grey600: string;
  grey700: string;
  grey800: string;
  grey850: string;
  grey900: string;
  tertiaryDark: string;
  tertiaryMain: string;
  tertiaryLight: string;
  tertiaryShade: string;
  errorMain: string;
  errorLight: string;
  infoMain: string;
  infoLight: string;
  successMain: string;
  successLight: string;
  warningMain: string;
  warningLight: string;
  textBlack: string;
  textDark: string;
  textLight: string;
  textWhite: string;
  textSecondary: string;
  textPrimary: string;
  textTertiary: string;
};
type IColorsKeys = keyof IColors;
export type IColorSchemes = {
  light: {
    [key in IColorsKeys]: string;
  };
  dark: {
    [key in IColorsKeys]: string;
  };
};

export const ThemeColors: IColorSchemes = {
  light: {
    backgroundMain: '#EEEEEF',
    backgroundPaper: '#FEFEFF',
    primaryDark: '#153D76',
    primaryMain: '#1F56A3',
    primaryLight: '#7FA4D8',
    primaryShade: '#E2EEFF',
    primaryGray: '#435178',
    secondaryDark: '#931846',
    secondaryMain: '#CB1150',
    secondaryLight: '#FDB16A',
    secondaryShade: '#FFEAD7',
    grey50: '#FAFAFA',
    grey100: '#F5F5F5',
    grey200: '#EEEEEE',
    grey300: '#E0E0E0',
    grey400: '#BDBDBD',
    grey500: '#9E9E9E',
    grey600: '#757575',
    grey700: '#616161',
    grey800: '#424242',
    grey850: '#323232',
    grey900: '#212121',
    tertiaryDark: '#FE7D07',
    tertiaryMain: '#FEA14A',
    tertiaryLight: '#FDB16A',
    tertiaryShade: '#FFEAD7',
    errorMain: '#DC3545',
    errorLight: '#FFEDEF',
    infoMain: '#20BC7A',
    infoLight: '#EDFFFF',
    successMain: '#20BC7A',
    successLight: '#E9FFF6',
    warningMain: '#FAC641',
    warningLight: '#FFF9EA',
    textBlack: '#111629',
    textDark: '#595D6B',
    textLight: '#979BA5',
    textWhite: '#F6F6FF',
    textSecondary: '#560322',
    textPrimary: '#13305D',
    textTertiary: '#99510D',
  },
  dark: {
    backgroundMain: '#EEEEEF',
    backgroundPaper: '#FEFEFF',
    primaryDark: '#153D76',
    primaryMain: '#1F56A3',
    primaryLight: '#7FA4D8',
    primaryShade: '#E2EEFF',
    primaryGray: '#435178',
    secondaryDark: '#931846',
    secondaryMain: '#CB1150',
    secondaryLight: '#FDB16A',
    secondaryShade: '#FFEAD7',
    grey50: '#FAFAFA',
    grey100: '#F5F5F5',
    grey200: '#EEEEEE',
    grey300: '#E0E0E0',
    grey400: '#BDBDBD',
    grey500: '#9e9e9e',
    grey600: '#757575',
    grey700: '#616161',
    grey800: '#424242',
    grey850: '#323232',
    grey900: '#212121',
    tertiaryDark: '#FE7D07',
    tertiaryMain: '#FEA14A',
    tertiaryLight: '#FDB16A',
    tertiaryShade: '#FFEAD7',
    errorMain: '#DC3545',
    errorLight: '#FFEDEF',
    infoMain: '#20BC7A',
    infoLight: '#EDFFFF',
    successMain: '#20BC7A',
    successLight: '#E9FFF6',
    warningMain: '#FAC641',
    warningLight: '#FFF9EA',
    textBlack: '#111629',
    textDark: '#595D6B',
    textLight: '#979BA5',
    textWhite: '#F6F6FF',
    textSecondary: '#560322',
    textPrimary: '#13305D',
    textTertiary: '#99510D',
  },
};
