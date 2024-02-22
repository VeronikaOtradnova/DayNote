import * as DayActionCreators from './day';
import * as CalendarActionCreators from './calendar';

export default {
  ...DayActionCreators,
  ...CalendarActionCreators,
}