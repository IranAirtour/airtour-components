import {IProcessStatus} from '../../navigation/processNotifierHandler';

export interface IProcessNotifier {
  visible: boolean;
  source: any;
  title?: string | null;
  description?: string | null;
  closeNotifier?: Function;
  status: IProcessStatus;
}
