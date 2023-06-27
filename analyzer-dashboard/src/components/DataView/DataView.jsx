import './DataView.css'
import moment from 'moment';

export const TIME_FORMAT = 'HH:mm:ss';
export const DAY_OF_WEEK_FORMAT = 'dddd';
export const DAY_OF_LAST_WEEK_FORMAT = `[El pasado] ${DAY_OF_WEEK_FORMAT}`;
export const DATE_FORMAT_BEAUTIFIED = 'DD/MM/YY';
export const MONTH_FORMAT = 'MMMM';
export const YEAR_FORMAT = 'YYYY';
export const EVENT_CALENDAR = 'YYYY-MM-DD';
export const EVENT_CALENDAR_YEAR_AND_MONTH = 'YYYY-MM';

export const CALENDAR_FORMATS = {
  sameDay: TIME_FORMAT,
  lastDay: '[Ayer]',
  lastWeek: DAY_OF_WEEK_FORMAT,
  sameElse: DATE_FORMAT_BEAUTIFIED,
};

export const EVENT_DATE_FORMATS = {
  sameDay: '[Hoy]',
  lastDay: '[Ayer]',
  nextDay: '[Mañana]',
  nextWeek: DAY_OF_WEEK_FORMAT,
  lastWeek: DAY_OF_LAST_WEEK_FORMAT,
  sameElse: DATE_FORMAT_BEAUTIFIED,
};

const formatStartAndEndTime = (startTimeAndDate, endTimeAndDate) => {
    const startData = moment(startTimeAndDate);
    const endData = moment(endTimeAndDate);
  
    const startDate = startData.calendar(DATE_FORMAT_BEAUTIFIED);
    const endDate = endData.calendar(DATE_FORMAT_BEAUTIFIED);
  
    const startTime = startData.format(TIME_FORMAT);
    const endTime = endData.format(TIME_FORMAT);
  
    // const formattedDate = `${startDate} ${startTime} -${
    //   startDate !== endDate ? ` ${endDate}` : ''
    // } ${endTime}`;
    const formattedDate = `${startDate} - ${startTime}`;
  
    return formattedDate;
  };

const DataView = (props) => {
    const {data} = props;
    return (
        <div>
            {data.map((item, index) => {
                return (
                    <div>
                        <div style={{textAlign:'right', color:'grey'}}>{formatStartAndEndTime(item.received_datetime,item.returned_datetime)}</div>
                        <button className="json-btn" key={index}>
                            {`${JSON.stringify(item.cmcd_data, null, 2)?.slice(0,50)}...`}
                        </button>
                    </div>
                )
            })}
        </div>
    )
}

export default DataView;