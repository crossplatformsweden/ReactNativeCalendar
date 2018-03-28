import * as types from '../../Types';
import React from 'react';
import { Agenda } from 'react-native-calendars';
import { View } from 'react-native';
import { Dispatch, connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Book } from '../actions/index';

export class AdBook extends React.Component<types.IProps> {
    render() {
      // this.state = {
      //   bookingLocal: new types.IProps.Book()
      // };
        return (

          <View style={{flex: 1}}>
             <Agenda style={{}}
          // the list of items that have to be displayed in agenda. If you want to render item as empty date
          // the value of date key kas to be an empty array []. If there exists no value for date key it is
          // considered that the date in question is not yet loaded
          items={
            {'2018-05-22': [{text: 'item 1 - any js object'}],
            '2018-05-23': [{text: 'item 2 - any js object'}],
            '2018-05-24': [],
            '2018-05-25': [{text: 'item 3 - any js object'}, {text: 'any js object'}],
            }}
            // specify how each item should be rendered in agenda
              />
          </View>

        );
      }
}

const mapStateToProps = (state: types.IApplicationState) => ({
    adbook: state.adbook,
});
const mapDispatchToProps = (dispatch: Dispatch<types.IProps>) => ({
    dispatch,
    Book: bindActionCreators(Book, dispatch),
});

export default connect<types.IApplicationState, types.IProps>(
  mapStateToProps,
  mapDispatchToProps)
  (AdBook);
