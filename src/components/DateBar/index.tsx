import React, { useCallback, useMemo } from 'react';
import { View, ViewStyle } from 'react-native';
import { Text } from '../Text';
import { flatten, GlobalStyles } from '../globalStyles';
import DateTimeFormatter from '../../utils/DateTimeUtils';
import { DATE_TIME_FORMATTERS } from '../../resources/strings';
import { styles } from './styles';

export const DateBar = (props: {
  date: number | string;
  prevDate: number | string;
  containerStyle: ViewStyle;
  hasLine?: boolean;
}) => {
  const { date, prevDate, containerStyle, hasLine } = props;
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
      return !DateTimeFormatter.isSameDay(prevDate, date);
    }
  }, [prevDate, date]);

  return showDateBar() ? (
    <View
      style={flatten([
        GlobalStyles.fullCenter,
        { borderBottomWidth: hasLine ? 1 : 0, borderColor: '#9E9E9E' },
        containerStyle,
      ])}>
      <Text h7 style={styles.dateTextStyle}>
        {formattedDate}
      </Text>
    </View>
  ) : null;
};
