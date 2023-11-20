import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AppContext } from '../../../../context/AppContextProvider'

import classes from "./UserEvents.module.css"
import EventCard from '../../../Events/components/EventCard/EventCard'
import { EventType } from '../../../../utils/types'

const UserEvents = () => {

  const {id} = useParams()

  const context = useContext(AppContext)

  const [events,setEvents] = useState<EventType[]>([])
  const fetchEvents = async () => {
    try {
      const response = await context.request!.get(`/user/${id}/events`)

      const responses = await Promise.allSettled(
        response.data.events.map(async (id: number) => await context.request!.get(`/event/${id}`))
      );

      const fulfilledResponses = responses
        .filter((r): r is PromiseFulfilledResult<any> => r.status === "fulfilled")
        .map((r) => r.value)
        .filter((v) => v);

      setEvents(fulfilledResponses.map(({ data }) => data))

    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  return (
    <div>
      <div className={classes.events}>
        {events.map(event => <EventCard key={event.id} event={event} />)}
      </div>
    </div>
  )
}

export default UserEvents