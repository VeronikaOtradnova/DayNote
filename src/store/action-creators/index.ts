import * as DayActionCreators from './day';
import * as CalendarActionCreators from './calendar';
import * as TaskActionCreators from './task';

export default {
  ...DayActionCreators,
  ...CalendarActionCreators,
  ...TaskActionCreators,
}