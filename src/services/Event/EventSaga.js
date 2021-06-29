import { put, takeLatest, all } from 'redux-saga/effects'
import Api from '../../common/Api/Api'
import { stringToJson } from '../../common/utilities/stringToJson'
import { event as eventActions } from './EventActions'
import moment from 'moment'
import { deleteLink, getLink } from '../../common/utilities/eventLinks'

function* getAll() {
  const response = yield Api.get(`/event`, undefined, true)

  if (response.ok) {
    let newEvents = []
    const now = new Date()

    for (const event of response.payload) {
      const { repetitionDays, start, end, eventNotifications, description } = event

      if (!description?.includes('vimeo.com'))
        continue

      if (repetitionDays) {
        let maxDate = moment(now).add('2', 'month')
        let auxDate = moment(`${moment(now).format("YYYY-MM-DD")} ${moment(start).format("HH:mm:ss")}`).subtract('6', 'days')
        const hour = moment(end).format("HH:mm:ss")

        while (maxDate > auxDate) {
          if (repetitionDays.includes((auxDate.day() == 0) ? 7 : auxDate.day())) {
            newEvents.push({
              ...event,
              start: auxDate.format(),
              end: moment(`${auxDate.format('YYYY-MM-DD')} ${hour}`).format(),
              eventNotifications: eventNotifications.map(noti => ({
                ...noti,
                date: moment(`${auxDate.format('YYYY-MM-DD')} ${moment(noti.date).format('HH:mm:ss')}`).format()
              }))
            })
          }
          auxDate = auxDate.add('1', 'day')
        }
      } else
        newEvents.push(event)
    }

    const data = newEvents.map(event => ({
      ...event,
      title: stringToJson(event.title),
      description: stringToJson(deleteLink(event.description)),
      link: getLink(event.description),
      start: new Date(event.start),
      end: new Date(event.end),
    }))


    yield put(eventActions.getAllResponse(data))
  } else {
    const err = new TypeError(response?.payload?.error || 'ERROR_GET_EVENTS')
    yield put(eventActions.getAllResponse(err))
  }
}

function* ActionWatcher() {
  yield takeLatest(eventActions.getAll, getAll)
}

export default function* rootSaga() {
  yield all([
    ActionWatcher(),
  ]);
}