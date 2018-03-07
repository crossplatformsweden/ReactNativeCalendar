import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Actions } from 'react-native-router-flux';

import * as Navigator from '../../navigator';
import Theme from '../../styles';

class Main extends React.Component<{}, {}> {

    render() {
        return (
            <Navigator.ModalBase hideClose>
                <View style={[Theme.alignCentered, Theme.paddingDefault]}>
                    <Text style={[Theme.alignTop, Theme.paddingDefault]}>Login</Text>
                    <TextInput
                        style={[Theme.alignTop, Theme.paddingDefault, {width: 200}]}
                        placeholder='Username'
                        autoFocus
                        keyboardType='email-address' />
                    <TextInput
                        style={[Theme.alignTop, Theme.paddingDefault, {width: 200}]}
                        placeholder='Password'
                        secureTextEntry
                        onChangeText={(name) => this.onTextChanged(name)} />
                </View>
            </Navigator.ModalBase>
        );
    }

    onTextChanged = (text: string) => {
        this.userName = text;
        if (text && text.length > 5) { Actions.pop(); }
    }

    userName: string = 'unknown';

}

export default Main;