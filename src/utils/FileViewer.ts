import FileViewer from 'react-native-file-viewer';
import {ToastHandlerClient} from "./Toast";

interface IFileViewer {
    openFile(path: string): void;
}
export class FileViewerClient implements IFileViewer {
    static async openFile(path: string): Promise<void> {
        FileViewer.open(path).catch(() => {
            ToastHandlerClient.show('format denied');
        });
    }
}
