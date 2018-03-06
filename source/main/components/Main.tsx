import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Theme from '../../styles';

const styles = StyleSheet.create({
    padding: { padding: 20 },
});

class Main extends React.Component<{}, {}> {
    componentDidMount() {
        Actions.push('login');
    }

    render() {
        return (
            <View style={[Theme.container, styles.padding]}>
                <Text>Home</Text>
            </View>
        );
    }
}

export default Main;