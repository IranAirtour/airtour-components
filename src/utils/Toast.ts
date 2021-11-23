import { FontFamily } from 'airtour-components';
import { RNToasty } from 'react-native-toasty';
/**
 * // Toast duration constants
 *
 */

type IToastDuration = 0 | 1;
type IToastPosition = 'top' | 'center' | 'bottom';
interface IToastHandler {
  show(msg: string, duration: IToastDuration, position: IToastPosition): void;
}
class ToastProvider implements IToastHandler {
  show(
    msg: string,
    duration: IToastDuration = 1,
    position: IToastPosition = 'center',
  ): void {
    if (msg?.length < 2) {
      return;
    }
    RNToasty.Show({
      title: msg,
      fontFamily: FontFamily.Nunito,
      position: position,
      duration: duration,
    });
  }
}
export const ToastHandlerClient = new ToastProvider();
