import React, { useCallback, useMemo } from 'react';
import { View, ViewStyle } from 'react-native';
import { Text } from '../Text';
import { flatten, GlobalStyles } from '../globalStyles';
import DateTimeFormatter from '../../utils/DateTimeUtils';
import { DATE_TIME_FORMATTERS } from '../../resources/strings';
import { useThemeColors } from '../Theme/ThemeProvider';

export const DateBar = (props: {
  date: string | number;
  prevDate: string | number;
  containerStyle: ViewStyle;
  hasLine?: boolean;
}) => {
  const { date, prevDate, containerStyle, hasLine = true } = props;
  const themeColors = useThemeColors();
  const formattedDate = useMemo(() => {
    return DateTimeFormatter.formatDate(
      date,
      false,
      DATE_TIME_FORMATTERS.fullDate,
    );
  }, [date]);

  const showDateBar = useCallback((): boolean => {
    if (!prevDate) {
      return true;
    } else {
      return !DateTimeFormatter.isSameDay(date, prevDate);
    }
  }, [prevDate, date]);

  return showDateBar() ? (
    <View
      style={flatten([
        GlobalStyles.fullCenter,
        {
          borderBottomWidth: hasLine ? 1 : 0,
          borderColor: themeColors.grey500,
        },
        containerStyle,
      ])}>
      <Text
        h8
        style={{
          borderWidth: 0.5,
          color: themeColors.grey500,
          borderColor: themeColors.grey500,
          paddingHorizontal: 10,
          backgroundColor: themeColors.backgroundMain,
          borderRadius: 15,
          zIndex: 1,
          position: 'absolute',
        }}>
        {formattedDate}
      </Text>
    </View>
  ) : null;
};
