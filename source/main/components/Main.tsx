import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Theme from '../../styles';

const styles = StyleSheet.create({
    padding: { padding: 20 },
});

const main = () => {
    const getText = (text) => {
        return text;
    };

    return (
        <View style={[Theme.horizontalTopCenter, styles.padding]}>
            <Text>{getText('Welcome')}</Text>
        </View>
    );
};

export default main;