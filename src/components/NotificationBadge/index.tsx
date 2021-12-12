import { StyleSheet, View } from 'react-native';
import React from 'react';
import { styles } from './styles';
import {Text} from "../Text";

const NotificationBadge = (props: any): JSX.Element | null => {
  const { count, containerStyle } = props;
  return count ? (
    <View>
      <View
        style={StyleSheet.flatten([
          styles.notificationBadgeContainer,
          containerStyle ?? {},
        ])}>
        <Text style={styles.notificationText}>{count || ''}</Text>
      </View>
    </View>
  ) : null;
};

export default NotificationBadge;
