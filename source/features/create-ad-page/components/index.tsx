import React from 'react';
import { View, StyleSheet, Image, Button } from 'react-native';
import { IProps } from '../../../navigator/components/ModalBase';
import * as types from '../../../Types';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

// import { connect, Dispatch } from 'react-redux';
// import { bindActionCreators } from 'redux';

interface IState {}

export class CreateAd extends React.Component<types.IProps, IState> {

    pickDate = async () => {
      await this.props.();
    }

    render() {
        return (
          <View>
            <Button title='From' onPress={this.pickDate} />
            <Button title='To' onPress={this.pickEndDate} />
            <CalendarList>

            </CalendarList>
          </View>
        );
      }
    }
    const mapStateToProps = (state: types.IApplicationState) => ({
        createAdPage: state.createAd,
        // utility: state.utility,
      });

      const mapDispatchToProps = (dispatch: Dispatch<types.IProps>) => ({
        FacebookLogin: bindActionCreators(FacebookLogin, dispatch),
        GoogleLogin: bindActionCreators(GoogleLogin, dispatch),
        GetByKey: bindActionCreators(GetByKey, dispatch),
        dispatch,
      });

      export default connect<types.IApplicationState, types.IProps>(
        mapStateToProps,
        mapDispatchToProps
        // @ts-ignore - Redux base class issue
      )(Login);
