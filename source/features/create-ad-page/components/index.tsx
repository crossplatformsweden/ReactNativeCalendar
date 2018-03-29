// login/components/index
import React from 'react';
import { bindActionCreators } from 'redux';
import { View } from 'react-native';
import { connect, Dispatch } from 'react-redux';

import * as types from '../../../Types';
import { CreateAd } from '../actions';
// @ts-ignore
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import { ComponentBase } from '../../../utility';

let startDate = moment();
let stopDate = moment();

export class CreateAdBooking extends React.Component<types.IProps, {}> {
  constructor(props: types.IProps) {
    super(props);
    this.onDateChange = this.onDateChange.bind(this);
  }
  pickDate = async () => {
    await this.props.createAd;
  }
  onDateChange(date: moment.Moment, type: string) {
    if (type === 'END_DATE') {
      stopDate = date;
      console.log(stopDate, startDate);
      let localAd = this.props.createAd;
      localAd.createAd.fromDate = startDate;
      localAd.createAd.toDate = stopDate;
      this.props.CreateAd(localAd);
    } else {
      startDate = date;
    }
  }

  render() {
    return (
      <View style={{ marginTop: 100, flex: 1 }}>
        <CalendarPicker
          startFromMonday={true}
          allowRangeSelection={true}
          onDateChange={this.onDateChange}
          weekdays={['Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör', 'Sön']}
          selectedDayColor='#00bfff'
        />
      </View>
    );
  }
}

/**
 * Create component. Implements ComponentBase
 */
export const Create = ComponentBase(CreateAdBooking);

const mapStateToProps = (state: types.IApplicationState) => ({
  route: state.route,
  createAd: state.createAd,
});

const mapDispatchToProps = (dispatch: Dispatch<types.IProps>) => ({
  CreateAd: bindActionCreators(CreateAd, dispatch),
  dispatch,
});

export default connect<types.IApplicationState, types.IProps>(
  mapStateToProps,
  mapDispatchToProps
  // @ts-ignore - Redux base class issue
)(CreateAdBooking);