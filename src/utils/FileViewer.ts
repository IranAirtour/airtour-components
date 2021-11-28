import FileViewer from 'react-native-file-viewer';
import {ToastHandlerClient} from "./Toast";

interface IFileViewer {
    openFile(path: string): void;
}
class FileViewerClient implements IFileViewer {
    static openFile(path: string): void {
        FileViewer.open(path).catch(() => {
            ToastHandlerClient.show('format denied');
        });
    }
}
