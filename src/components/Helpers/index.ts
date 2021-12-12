import ScreenUtils from './ScreenUtils';
import {ThemeProps} from '../config/ThemeProvider';
export {ScreenUtils};
export {renderNode} from './renderNode';
export {FontFamily} from './fonts';

export type RneFunctionComponent<T> = React.FunctionComponent<
  T & Partial<ThemeProps<T>>
>;
