import * as DayActionCreators from './day';
import * as CalendarActionCreators from './calendar';
import * as TaskActionCreators from './task';
import * as EventActionCreators from './event';

export default {
  ...DayActionCreators,
  ...CalendarActionCreators,
  ...TaskActionCreators,
  ...EventActionCreators,
}