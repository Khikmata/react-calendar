import { Button, DatePicker, Form, Input, Row, Select } from 'antd'
import React, { FC, useState } from 'react'
import { IEvent } from '../models/IEvent'
import { IUser } from '../models/IUser'
import { rules } from '../utils/rules'
import { Moment } from 'moment'
import * as moment from "moment/moment"
import { formatDate } from '../utils/date'
import { useTypedSelector } from '../hooks/useTypedSelector'

interface IEventFormProps {
    guests: IUser[],
    submit: (event: IEvent) => void,
}



const EventForm: FC<IEventFormProps> = (props) => {

    const [event, setEvent] = useState<IEvent>({
        author: '',
        date: '',
        description: '',
        guest: '',
    } as IEvent)

    const { user } = useTypedSelector(state => state.auth)

    const selectDate = (date: Moment | null | any) => {
        if (date) {
            setEvent({ ...event, date: formatDate(date.toDate()) })
        }
    }

    const submitForm = () => {
        props.submit({ ...event, author: user.username })
    }


    return (
        <Form onFinish={submitForm}>
            <Form.Item
                label="Описание события"
                name="description"
                rules={[rules.required()]}>
                <Input onChange={e => setEvent({ ...event, description: e.target.value })} value={event.description} />
            </Form.Item>
            <Form.Item label="Дата события"
                name="date"
                rules={[rules.required()]}>
                <DatePicker onChange={(date) => selectDate(date)} />
            </Form.Item>
            <Form.Item
                label="Имя гостя"
                name="guest"
                rules={[rules.required()]}>
                <Select onChange={(guest: string) => setEvent({ ...event, guest })}>
                    {props.guests.map(guest =>
                        <Select.Option key={guest.username} value={guest.username}>
                            {guest.username}
                        </Select.Option>
                    )}
                </Select>
            </Form.Item>
            <Row>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type='primary' htmlType='submit'> Создать </Button>
                </Form.Item>
            </Row>
        </Form >
    )
}

export default EventForm