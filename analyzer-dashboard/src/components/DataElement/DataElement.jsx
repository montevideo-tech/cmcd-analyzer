import './DataElement.css'
import warningImg from '../../assets/warning.svg'
import errorImg from '../../assets/error.svg'
import successImg from '../../assets/success.svg'
import moment from 'moment';
import Button from 'react-bootstrap/esm/Button';
import Placeholder from 'react-bootstrap/Placeholder';

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
  
    const formattedDate = `${startDate} - ${startTime}`;
  
    return formattedDate;
};

const renderImage = (type) => {
    switch (type) {
        case 'warning':
            return (
                <img width="27" className='pe-2' src={warningImg}/>
            );
        case 'danger':
            return (
                <img width="27" className='pe-2' src={errorImg}/>
            );
        default:
            return (
                <img width="27" className='pe-2' src={successImg}/>
            );
    };
}

const DataElement = ({ data, handleClick }) => {
    console.log(data)
    return (
        <div>
            {data.length? data.map((item, index) => {
                const type = item?.valid? item?.warnings != []? 'success' : 'warning' : 'danger';
                console.log(type)
                return (
                    <div key={index}>
                        <div style={{textAlign:'right', color:'grey'}}>{formatStartAndEndTime(item.received_datetime,item.returned_datetime)}</div>
                        <Button className="btn data-btn" variant={type} onClick={() => handleClick(item)}> 
                            {renderImage(type)}
                            {item?.cmcd_data}
                        </Button>
                    </div>
                )
            }): [...Array(10)].map((e, i) => 
                <div className='mb-3' key={i}>
                    <p className="d-flex justify-content-end mb-2">
                        <Placeholder xs={4} />
                    </p>
                    <Placeholder size="lg" xs={12}/>
                </div>
            )}
        </div>
    )
}

export default DataElement;