import React from 'react';
import {View} from "react-native";
import styles from './styles'

export const Spacer: React.FC<{}> = ({children}) => {
    return <View style={styles.spacer}/>
}

export default Spacer;
