import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

const { height: deviceHeight, width: deviceWidth } = Dimensions.get('window');

export interface IProps {
  children: any;
  verticalPercent?: number;
  horizontalPercent?: number;
  hideClose: boolean;
}

const BaseModal = ({
  children,
  verticalPercent,
  horizontalPercent,
  hideClose,
}: IProps) => {
  const height = verticalPercent
    ? deviceHeight * verticalPercent
    : deviceHeight;
  const width = horizontalPercent
    ? deviceHeight * horizontalPercent
    : deviceWidth;

  const renderClose = () => {
    if (!hideClose) {
      return (
        <View style={styles.closeBtnContainer}>
          <TouchableOpacity onPress={Actions.pop}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };

  return (
    <View style={[styles.container, { height, width }]}>
      {renderClose()}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
  },
  closeBtnContainer: {
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
  },
});

export default BaseModal;
