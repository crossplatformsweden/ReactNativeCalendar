import * as types from '../../Types';
import React from 'react';
// @ts-ignore - Redux base class issue
import { Agenda } from 'react-native-calendars';
import { View, Text } from 'react-native';
import { Dispatch, connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Book } from '../actions/index';
import Theme from '../../styles/index';
import { ComponentBase } from '../../utility';

interface ICool {
  name: String;
  info: String;
  date: String;
}

export class AdBookBase extends React.Component<types.IProps, {}> {
  render() {
    // this.state = {
    //   bookingLocal: new types.IProps.Book()
    // };
    return (
      <View style={[Theme.container, Theme.paddingDefault]}>
        <Agenda
          // the list of items that have to be displayed in agenda. If you want to render item as empty date
          // the value of date key kas to be an empty array []. If there exists no value for date key it is
          // considered that the date in question is not yet loaded
          items={{
            '2018-03-28': new Array<ICool>({
              name: 'slsl',
              info: 'ssa',
              date: '989',
            }),
          }}
          // specify how each item should be rendered in agenda
          renderItem={(item: ICool) => (
            <View>
              <Text>{item.date}</Text>
            </View>
          )}
          onDayPress={(day: Date) => {
            console.log('day pressed');
          }}
          // specify your item comparison function for increased performance
          rowHasChanged={(r1: any, r2: any) => {return r1.text !== r2.text; }}
        />
      </View>
    );
  }
}
/**
 * AdBook component. Implements ComponentBase
 */
export const AdBook = ComponentBase(AdBookBase);

const mapStateToProps = (state: types.IApplicationState) => ({
  adbook: state.adbook,
  login: state.login,
  utility: state.utility,
});
const mapDispatchToProps = (dispatch: Dispatch<types.IProps>) => ({
  dispatch,
  Book: bindActionCreators(Book, dispatch),
});

export default connect<types.IApplicationState, types.IProps>(
  mapStateToProps,
  mapDispatchToProps
  // @ts-ignore - Redux base class issue
)(AdBook);
