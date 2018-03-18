// profile/components/index
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import { Actions } from 'react-native-router-flux';

import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Avatar, Button } from 'react-native-elements';
import _ from 'lodash';
import { RemoveKey } from '../../storage';
import * as ProfileTypes from '../types';
import * as types from '../../Types';
import { StorageConstants } from '../../storage/types';
import { NavigationConstants } from '../../navigator/types';
import { IUser } from '../../login/types';
import { ComponentBase } from '../../utility';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    padding: 10,
  },
  logout: {
    margin: 10,
  },
});

interface IState {}

/**
 * Allows the user to edit their details and settings
 * @param {module:TypesModule.DefaultReducer} storage
 */
export class ProfileBase extends React.Component<ProfileTypes.IProfileProps, IState> {
  valueAsUser(): IUser {
    return this.props.storage.value as IUser;
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView testID='scrollView'>
          <View>
            {
              !_.isNil(this.valueAsUser()) &&
              !_.isNil(this.valueAsUser().picture) ? (
                <View>
                  <Text>{this.valueAsUser().name}</Text>
                  <Avatar
                    large
                    rounded
                    source={{ uri: this.valueAsUser().picture }}
                    activeOpacity={0.7}
                  />
                </View>
              ) :
                null
            }
            <Button
            // @ts-ignore
              medium
              style={styles.logout}
              icon={{ name: 'sign-out', type: 'font-awesome' }}
              title='Sign out'
              onPress={this.props.Logout}
            />
          </View>
        </ScrollView>
      </View>);
  }
}

export const Profile = ComponentBase(ProfileBase);

const mapStateToProps = (state: types.IApplicationState) => ({
  storage: state.storage,
  login: state.login,
  utility: state.utility,
});

const mapDispatchToProps = (dispatch: Dispatch<ProfileTypes.IProfileProps>) => ({
  Logout: async () => {
    await RemoveKey(StorageConstants.STORAGE_USER_KEY);
    dispatch({ type: NavigationConstants.LOGOUT });
    Actions.LoginScreen();
  },
  Login: () => dispatch(NavigationActions.navigate({ routeName: NavigationConstants.LOGIN })),
  RemoveKey: bindActionCreators(RemoveKey, dispatch),
  dispatch,
});

export default connect<ProfileTypes.IProfileProps, IState>(
  mapStateToProps,
  mapDispatchToProps
  // @ts-ignore - Redux base class issue
)(Profile);
