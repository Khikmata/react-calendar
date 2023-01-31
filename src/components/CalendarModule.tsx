import { Calendar, CalendarProps } from 'antd'
import React, { FC } from 'react'
import { IEvent } from '../models/IEvent'
import { Moment } from "moment"
import { formatDate } from '../utils/date';

interface eventProps {
    events: IEvent[];
}

const CalendarModule: FC<eventProps> = (props) => {

    function dateCellRender(value: Moment | any) {
        const formatedDate = formatDate(value.toDate());
        const currentDayEvents = props.events.filter(event => event.date === formatedDate);
        return (
            <div>
                {currentDayEvents.map((e, index) =>
                    <div key={index}>
                        {e.description}
                    </div>)}
            </div>
        );
    };

    return (
        <Calendar dateCellRender={dateCellRender} />
    )
}

export default CalendarModule