import * as types from '../../Types';
import React from 'react';
// @ts-ignore - Redux base class issue
import { Agenda } from 'react-native-calendars';
import {
  View,
  Text,
  TouchableNativeFeedback,
// @ts-ignore
  TouchableHighlight,
  Platform,
} from 'react-native';
import { Dispatch, connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Book } from '../actions/index';
import Theme from '../../styles/index';
import { ComponentBase } from '../../utility';
import { Card } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import * as bookingTypes from '../types';
import Moment from 'moment';
import { ParkingAction } from '../types/index';

interface IAdSlot {
  name: String;
  info: String;
  date: bookingTypes.ITimePeriod;
}

const RenderCard = ({ item }: { item: IAdSlot }) => (
  <Card
    // @ts-ignore
    title={item.name}
  >
    <Text>{item.date.timeStart.format('HH:mm')} - {item.date.timeEnd.format('HH:mm')}</Text>
  </Card>
);

export class AdBookBase extends React.Component<types.IProps, {}> {
  constructor(props: types.IProps) {
    super(props);
    this.onSelected = this.onSelected.bind(this);
  }

  /**
   * Update the booking with time period from selected slot
   *
   * @param {IAdSlot} item selected slot
   * @memberof AdBookBase
   */
  onSelected(item: IAdSlot) {
    // Update booking with new date
    let localBooking = this.props.adbook.booking;
    localBooking.timeperiod = item.date;
    // TODO: skriv action creator funktion som används för att initiera IBooking
    this.props.Book(localBooking, bookingTypes.ParkingConstants.BOOKING_ADDED);
  }

  render() {
    // this.state = {
    //   bookingLocal: new types.IProps.Book()
    // };
    const today = Moment('2018-03-28');
    const items = {
            '2018-03-28': new Array<IAdSlot>({
              name: 'Name here',
              info: 'Info here',
              date: {
                timeStart: today,
                timeEnd: today.add(6, 'h'),
              },
            }),
          };
    return (
      <View style={[Theme.container, Theme.paddingDefault]}>
        <Agenda
          // the list of items that have to be displayed in agenda. If you want to render item as empty date
          // the value of date key kas to be an empty array []. If there exists no value for date key it is
          // considered that the date in question is not yet loaded
          items={items}
          // specify how each item should be rendered in agenda
          renderItem={(item: IAdSlot) => {
            return (<View>
           {Platform.OS === 'ios' ? (
                <TouchableHighlight onPress={() => this.onSelected(item)}>
                  <RenderCard item={item} />
                </TouchableHighlight>
              ) : (
                <TouchableNativeFeedback onPress={() => this.onSelected(item)}>
                  <RenderCard item={item} />
                </TouchableNativeFeedback>
              ) }
            </View>);
          }}
          onDayPress={(day: Date) => {
            console.log('day pressed');
          }}
          // specify your item comparison function for increased performance
          rowHasChanged={(r1: any, r2: any) => {
            return r1.text !== r2.text;
          }}
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
