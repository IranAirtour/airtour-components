import { Image, ImageOrVideo, Video } from 'react-native-image-crop-picker';

export interface IImageCropPicker {
  pickImage(crop: boolean, circular: boolean): Promise<ImageOrVideo>;

  takePicture(cropping: boolean): Promise<ImageOrVideo>;

  pickFile(
    cropping: boolean,
    mediaType: string,
  ): Promise<IDocumentPickerResponse>;

  pickFiles(
    cropping: boolean,
    mediaType: string,
  ): Promise<IDocumentPickerResponse[]>;
}

export interface IFileAndImageService extends IImageCropPicker {}

export interface IImage {
  uri: string;
  width: number;
  height: number;
  mime: string;
}

export type IMediaType<O> = O extends { mediaType: 'photo' }
  ? Image
  : O extends { mediaType: 'video' }
  ? Video
  : ImageOrVideo;

export interface IDocumentPickerResponse {
  uri: string;
  fileCopyUri: string;
  copyError?: string;
  type: string;
  name: string;
  size: number;
}

export type Types = {
  mimeTypes: {
    allFiles: '*/*';
    audio: 'audio/*';
    csv: 'text/csv';
    doc: 'application/msword';
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    images: 'image/*';
    pdf: 'application/pdf';
    plainText: 'text/plain';
    ppt: 'application/vnd.ms-powerpoint';
    pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
    video: 'video/*';
    xls: 'application/vnd.ms-excel';
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    zip: 'application/zip';
  };
  utis: {
    allFiles: 'public.item';
    audio: 'public.audio';
    csv: 'public.comma-separated-values-text';
    doc: 'ir.microsoft.word.doc';
    docx: 'org.openxmlformats.wordprocessingml.document';
    images: 'public.image';
    pdf: 'ir.adobe.pdf';
    plainText: 'public.plain-text';
    ppt: 'ir.microsoft.powerpoint.ppt';
    pptx: 'org.openxmlformats.presentationml.presentation';
    video: 'public.movie';
    xls: 'ir.microsoft.excel.xls';
    xlsx: 'org.openxmlformats.spreadsheetml.sheet';
    zip: 'public.zip-archive';
  };
  extensions: {
    allFiles: '*';
    audio: '.3g2 .3gp .aac .adt .adts .aif .aifc .aiff .asf .au .m3u .m4a .m4b .mid .midi .mp2 .mp3 .mp4 .rmi .snd .wav .wax .wma';
    csv: '.csv';
    doc: '.doc';
    docx: '.docx';
    images: '.jpeg .jpg .png';
    pdf: '.pdf';
    plainText: '.txt';
    ppt: '.ppt';
    pptx: '.pptx';
    video: '.mp4';
    xls: '.xls';
    xlsx: '.xlsx';
    zip: '.zip .gz';
    folder: 'folder';
  };
};
