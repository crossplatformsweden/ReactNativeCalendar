// profile/components/index
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import { Actions } from 'react-native-router-flux';

import { View, ScrollView, StyleSheet, Switch } from 'react-native';
import { Avatar, Button, FormLabel, FormInput } from 'react-native-elements';
import _ from 'lodash';
import * as ProfileTypes from '../types';
import * as types from '../../Types';
import * as login from '../../login';
import * as storage from '../../storage';
import * as nav from '../../navigator';
import { ComponentBase } from '../../utility';
import Theme from '../../styles';

const styles = StyleSheet.create({
  logout: {
    margin: 10,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});

interface IState {
  userLocal: login.LoginTypes.IUser;
}

/**
 * Allows the user to edit their details and settings
 * @param {module:TypesModule.DefaultReducer} storage
 */
export class ProfileBase extends React.Component<
  ProfileTypes.IProfileProps,
  IState
> {
  constructor(props: ProfileTypes.IProfileProps) {
    super(props);
    this.state = {
      userLocal: new login.LoginTypes.User(null, null, null, null),
    };

    // Ensure methods have "this" context
    this.saveUserLocalToStorage = this.saveUserLocalToStorage.bind(this);
    this.userLocalFromStorage = this.userLocalFromStorage.bind(this);
    this.userPropertyChanged = this.userPropertyChanged.bind(this);
    this.autologinChanged = this.autologinChanged.bind(this);
  }

  /**
   * Cast local storage to {@see login.LoginTypes.IUser} instance
   *
   * @returns {login.LoginTypes.IUser}
   * @memberof ProfileBase
   */
  storageValueToUser(): login.LoginTypes.IUser {
    return this.valueIsUser(this.props.storage.value)
      ? (this.props.storage.value as login.LoginTypes.IUser)
      : null;
  }

  /**
   * Determines if the value is an {@see login.LoginTypes.IUser} instance
   *
   * @param {*} value
   * @returns {value is login.LoginTypes.IUser}
   * @memberof ProfileBase
   */
  valueIsUser(value: any): value is login.LoginTypes.IUser {
    return !_.isNil(value) && !_.isNil(value.type);
  }

  /**
   * Set local state from storage
   *
   * @memberof ProfileBase
   */
  userLocalFromStorage() {
    if (
      !_.isNil(this.props.storage) &&
      this.valueIsUser(this.props.storage.value)
    ) {
      const storageUser = this.storageValueToUser();
      const newUserLocal = Object.assign({}, this.state.userLocal, storageUser);
      this.setState({ userLocal: newUserLocal });
    }
  }

  /**
   * Update user object in local state
   * @param newValue new user value
   * @memberof ProfileBase
   */
  async userPropertyChanged(newValue: any) {
    const newUserLocal = Object.assign({}, this.state.userLocal, newValue);
    // Update local user
    this.setState({
      userLocal: newUserLocal,
    });
  }

  /**
   * Save local state to isolated storage
   *
   * @memberof ProfileBase
   */
  async saveUserLocalToStorage() {
    // Update user in storage
    await this.props.SaveByKey(
      storage.StorageTypes.StorageConstants.STORAGE_USER_KEY,
      this.state.userLocal
    );

    // Update local object
    this.userLocalFromStorage();
  }

  async componentWillMount() {
    // Get user from storage
    this.userLocalFromStorage();
    if (_.isNil(this.state.userLocal) || _.isNil(this.state.userLocal.name)) {
      await this.props.GetByKey(
        storage.StorageTypes.StorageConstants.STORAGE_USER_KEY
      );
      this.userLocalFromStorage();
    }

    if (typeof super.componentWillMount === 'function') {
      super.componentWillMount();
    }
  }

  async autologinChanged() {
    let user = this.state.userLocal;
    user.autologin = !user.autologin;
    this.setState({userLocal: user});
    await this.saveUserLocalToStorage();
  }

  render() {
    return (
      <View style={[Theme.container, Theme.paddingDefault]}>
        <ScrollView testID='scrollView'>
          <View style={[Theme.container, Theme.paddingDefault]}>
            {!_.isNil(this.state.userLocal) &&
            !_.isNil(this.state.userLocal.picture) ? (
              <View>
                <View style={[styles.imageContainer, Theme.paddingDefault]}>
                  <Avatar
                    large
                    rounded
                    source={{ uri: this.state.userLocal.picture }}
                    activeOpacity={0.7}
                  />
                </View>
                <FormLabel>Namn</FormLabel>
                <FormInput
                  placeholder='Namn'
                  autoCapitalize='words'
                  value={this.state.userLocal.name}
                  onBlur={this.saveUserLocalToStorage}
                  onChangeText={val => this.userPropertyChanged({ name: val })}
                />
                <FormLabel>Användarnamn</FormLabel>
                <FormInput
                  placeholder='Användarnamn'
                  value={this.state.userLocal.username}
                  autoCapitalize='none'
                  onBlur={this.saveUserLocalToStorage}
                  onChangeText={val =>
                    this.userPropertyChanged({ username: val })
                  }
                />
                <FormLabel>Lösenord</FormLabel>
                <FormInput
                  placeholder='Lösenord'
                  secureTextEntry
                  autoCapitalize='none'
                  value={this.state.userLocal.password}
                  onBlur={this.saveUserLocalToStorage}
                  onChangeText={val =>
                    this.userPropertyChanged({ password: val })
                  }
                />
                <FormLabel>E-postadress</FormLabel>
                <FormInput
                  placeholder='E-postadress'
                  keyboardType='email-address'
                  autoCapitalize='none'
                  value={this.state.userLocal.email}
                  onBlur={this.saveUserLocalToStorage}
                  onChangeText={val => this.userPropertyChanged({ email: val })}
                />
                <FormLabel>Autologin</FormLabel>
                <Switch
                  style={{ marginLeft: 15, marginTop: 5, marginBottom: 10 }}
                  value={this.state.userLocal.autologin}
                  onValueChange={this.autologinChanged}
                />
              </View>
            ) : null}
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
      </View>
    );
  }
}

export const Profile = ComponentBase(ProfileBase);

const mapStateToProps = (state: types.IApplicationState) => ({
  storage: state.storage,
  login: state.login,
  utility: state.utility,
});

const mapDispatchToProps = (
  dispatch: Dispatch<ProfileTypes.IProfileProps>
) => ({
  Logout: async () => {
    // Remove user from storage
    await dispatch(
      storage.RemoveKey(storage.StorageTypes.StorageConstants.STORAGE_USER_KEY)
    );
    // Set state to logged out
    dispatch({ type: login.LoginTypes.LoginConstants.LOGGED_OUT });
    // Display login screen
    Actions.LoginScreen();
  },
  Login: () =>
    dispatch(
      NavigationActions.navigate({
        routeName: nav.NavigatorTypes.NavigationConstants.LOGIN,
      })
    ),
  RemoveKey: bindActionCreators(storage.RemoveKey, dispatch),
  SaveByKey: bindActionCreators(storage.SaveByKey, dispatch),
  GetByKey: bindActionCreators(storage.GetByKey, dispatch),
  dispatch,
});

export default connect<ProfileTypes.IProfileProps, {}>(
  mapStateToProps,
  mapDispatchToProps
  // @ts-ignore - Redux base class issue
)(Profile);
