import React, {FC} from 'react';
import {StyleSheet, Animated} from 'react-native';
import Button from '../Button/Button';
import {withTheme} from '../Helpers/withTheme';
import {IFloatingActionButtonProps} from './interface';
import styles from './styles';

const FloatingActionButton: FC<IFloatingActionButtonProps> = props => {
  const {
    color,
    size = 'large',
    visible = true,
    disabled,
    upperCase,
    theme,
    style,
    titleStyle,
    buttonStyle,
    containerStyle,
    iconContainerStyle,
    placement,
    ...attributes
  } = props;

  const {current: animation} = React.useRef(
    new Animated.Value(Number(visible)),
  );

  React.useEffect(() => {
    Animated.timing(animation, {
      toValue: Number(visible),
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [animation, visible]);

  return (
    <Animated.View
      style={[
        {
          opacity: animation,
          transform: [{scale: animation}],
        },
        styles.content,
        placement && {
          [placement]: 0,
          position: 'absolute',
          margin: 16,
          bottom: 0,
        },
        style,
      ]}>
      <Button
        buttonStyle={StyleSheet.flatten([
          props.title
            ? styles.extendedLabel
            : size === 'small'
            ? styles.smallFAB
            : styles.largeFAB,
          {
            backgroundColor: color || theme?.colors?.primary,
          },
          buttonStyle,
        ])}
        iconContainerStyle={[
          props.title
            ? {}
            : size === 'small'
            ? styles.smallFAB
            : styles.largeFAB,
          iconContainerStyle,
        ]}
        containerStyle={StyleSheet.flatten([
          styles.container,
          disabled && styles.disabled,
          containerStyle,
        ])}
        titleStyle={[
          styles.label,
          {color: theme?.colors?.text},
          upperCase && styles.upperCaseLabel,
          titleStyle,
        ]}
        {...attributes}
        {...{disabled, theme}}
      />
    </Animated.View>
  );
};

// export default FloatingActionButton;
export default withTheme(FloatingActionButton);
