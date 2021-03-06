import { BaseScreenView, IBaseViewProps } from './BaseScreenView';
import { BottomSheetButton, Button, IButtonProps } from './Button';
import {
  FloatingActionButton,
  IFloatingActionButtonProps,
} from './FloatingActionButton';
import {
  IHeaderSubComponent,
  Header,
  IHeaderChildrenProps,
  IHeaderProps,
  IPlacement,
} from './Header';
import { FileBottomSheet, BottomSheetButtonComponent } from './BottomSheet/FileBottomSheet';
import { useFileSheet } from './BottomSheet/useFileSheet';
import { ScreenUtils, renderNode, FontFamily } from './Helpers';
import { Icon, IIconProps, IIconType } from './Icon';
import { Input, IInputProps } from './Input';
import { Avatar, AvatarProps } from './Avatar';

import { Modal, IModalAnimationType, IModalProps } from './Modal';
import { Image, IImageProps } from './Image';
import { Text, ITextProps } from './Text';
import { Divider, IDividerProps } from './Divider';
import { ProcessNotifier } from './ProcessNotifier';
import { ImageBlur } from './ImageBlur';
import { ListBottomFooter } from './ListBottomFooter';
import { NetworkFailure } from './NetworkFailure';
import { LoadingLottie } from './LoadingLottie/LoadingLottie';
import { ILoadingLottieProps } from './LoadingLottie/interface';
import { AirtourLogo } from './AirtourLogo/AirtourLogo';
import {GlobalStyles, flatten} from './globalStyles'
import {DateBar} from "./DateBar";
import ThemeProvider from './Theme/ThemeProvider'
import {useThemeColors, useThemeContext} from './Theme/ThemeProvider';
import {withUploadProgressPercent} from './withUploadProgressPercent'
import NotificationBadge from './NotificationBadge'

export {
  BaseScreenView,
  Button,
  FloatingActionButton,
  Header,
  ScreenUtils,
  renderNode,
  Icon,
  Input,
  Avatar,
  Modal,
  Image,
  Text,
  Divider,
  ProcessNotifier,
  FontFamily,
  ImageBlur,
  ListBottomFooter,
  NetworkFailure,
  LoadingLottie,
  BottomSheetButton,
  BottomSheetButtonComponent,
  FileBottomSheet,
  useFileSheet,
  DateBar,
  AirtourLogo,
  GlobalStyles,
  flatten,
  ThemeProvider,
  useThemeColors,
  useThemeContext,
  withUploadProgressPercent,
  NotificationBadge,
};

export type {
  ITextProps,
  IImageProps,
  IModalAnimationType,
  IModalProps,
  IBaseViewProps,
  IButtonProps,
  IFloatingActionButtonProps,
  IHeaderProps,
  IHeaderChildrenProps,
  IHeaderSubComponent,
  IPlacement,
  IInputProps,
  AvatarProps,
  IIconType,
  IIconProps,
  IDividerProps,
  ILoadingLottieProps,
};
