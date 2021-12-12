import ImagePicker from 'react-native-image-crop-picker';
import { ImageOrVideo } from 'react-native-image-crop-picker';
import DocumentPicker from 'react-native-document-picker';
import {
  IDocumentPickerResponse,
  IFileAndImageService,
} from './FileAndImageService.interface';

export class FileAndImageService implements IFileAndImageService {
  async pickImage(
    crop: boolean = true,
    circular: boolean = true,
  ): Promise<ImageOrVideo> {
    try {
      return await ImagePicker.openPicker({
        width: 500,
        height: 500,
        cropping: crop,
        cropperCircleOverlay: circular,
        sortOrder: 'none',
        compressImageMaxWidth: 1000,
        compressImageMaxHeight: 1000,
        compressImageQuality: 1,
        compressVideoPreset: 'MediumQuality',
        includeExif: true,
        cropperStatusBarColor: 'white',
        cropperToolbarColor: 'white',
        cropperActiveWidgetColor: 'white',
        cropperToolbarWidgetColor: '#3498DB',
      });
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async takePicture(cropping: boolean = true): Promise<ImageOrVideo> {
    try {
      return await ImagePicker.openCamera({
        cropping: cropping,
        width: 500,
        height: 500,
        includeExif: true,
        mediaType: 'photo',
      });
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async pickFile(): Promise<IDocumentPickerResponse> {
    try {
      return await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      }
      return Promise.reject(err);
    }
  }

  async pickFiles(): Promise<IDocumentPickerResponse[]> {
    try {
      return await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.allFiles],
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      }
      return Promise.reject(err);
    }
  }
}

export const FileServiceClient = new FileAndImageService();
