import { IDocumentPickerResponse } from '../../utils/FileAndImageService.interface';
import type {INullableId, INullableString} from "../../Interface/IBase";

export type IExtension = 'mp3' | 'mp4' | 'pdf' | 'png' | 'jpeg' | 'jpg';
export interface IFileModel
  extends Omit<IDocumentPickerResponse, 'fileCopyUri' | 'uri'> {
  extension?: IExtension | string;
  path?: string | null;
  uri: INullableString;
  id: INullableId;
  hash: INullableString;
  taskId?: INullableString;
}
export interface IImageAssetModel {
  path?: string | null;
  type: string | null;
  extension: string | null;
}
