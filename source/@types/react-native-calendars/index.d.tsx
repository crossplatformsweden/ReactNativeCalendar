declare module 'react-native-calendars' {
  import * as React from 'react';
  import { View } from 'react-native';

  export interface ICalendarProps {
    style?: React.CSSProperties;
    items: any;
    renderItem: Function;
    onDayPress: Function;
    rowHasChanged: Function;
  }

  export class Calendar extends React.Component<ICalendarProps, {}> {}
  export class CalendarList extends React.Component<ICalendarProps, {}> {}
  export class Agenda extends React.Component<ICalendarProps, {}> {}
  export const LocaleConfig: React.Component;
}
