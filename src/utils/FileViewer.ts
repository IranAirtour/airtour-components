import FileViewer from 'react-native-file-viewer';
import {ToastHandlerClient} from "./Toast";

interface IFileViewer {
    openFile(path: string): void;
}
class FileViewerHandler implements IFileViewer {
    openFile(path: string): void {
        FileViewer.open(path).catch(() => {
            ToastHandlerClient.show('format denied');
        });
    }
}
export const FileViewerClient = new FileViewerHandler();
