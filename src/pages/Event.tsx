import { Button, Layout, Modal, Row } from 'antd';
import React, { FC, useState, useEffect } from 'react'
import CalendarModule from '../components/CalendarModule';
import EventForm from '../components/EventForm';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { IEvent } from '../models/IEvent';

const Event: FC = () => {

    const [modalOpen, setModalOpen] = useState(false)

    const { guests, events } = useTypedSelector(state => state.event)

    const { user } = useTypedSelector(event => event.auth)
    const { fetchGuests, createEvent, fetchEvents } = useActions();
    useEffect(() => {
        fetchGuests()
        fetchEvents(user.username);
    }, [])

    const addNewEvent = (event: IEvent) => {
        setModalOpen(false);
        createEvent(event);
    }

    return (
        <Layout>

            <CalendarModule events={events} />
            <Row justify="center">
                <Button onClick={() => setModalOpen(true)}> Добавить событие </Button>
            </Row>
            <Modal title="Добавить событие" open={modalOpen} footer={null} onCancel={() => setModalOpen(false)}>
                <EventForm guests={guests} submit={addNewEvent} />
            </Modal>
        </Layout>
    )
}

export default Event;