// login/components/index
import * as React from 'react';
import { bindActionCreators } from 'redux';
import { View } from 'react-native';
import { connect, Dispatch } from 'react-redux';

import * as types from '../../../Types';
import { CreateAd, UpdateAd } from '../actions';
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
    await this.props.createAdPage;
  }
  onDateChange(date: moment.Moment, type: string) {
    if (type === 'END_DATE') {
      stopDate = date;
      console.log(stopDate, startDate);
      let localAd = this.props.createAdPage.createAd;
      localAd.fromDate = startDate;
      localAd.toDate = stopDate;
      this.props.UpdateAd(localAd);
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
  login: state.login,
  utility: state.utility,
  route: state.route,
  createAdPage: state.createAdPage,
});

const mapDispatchToProps = (dispatch: Dispatch<types.IProps>) => ({
  CreateAd: bindActionCreators(CreateAd, dispatch),
  UpdateAd: bindActionCreators(UpdateAd, dispatch),
  dispatch,
});

export default connect<types.IApplicationState, types.IProps>(
  mapStateToProps,
  mapDispatchToProps
  // @ts-ignore - Redux base class issue
)(Create);