import instance from '../axios'
import { useStateValue } from '../StateProvider'

export const formatDate = (date, withTime = false) => {
  const inTwoDigit = (x) => (x < 10 ? `0${x}` : x)
  date = date ? new Date(date) : new Date()
  const datePart = `${date.getFullYear()}-${inTwoDigit(
    date.getMonth() + 1
  )}-${inTwoDigit(date.getDate())}`
  var timePart = ''
  if (withTime)
    timePart = ` ${inTwoDigit(date.getHours())}:${inTwoDigit(
      date.getMinutes()
    )}`
  return datePart + timePart
}

export const addEditSubmit = (url, model, action, setMessage, callback) => {
  // const { setNotify } = useStateValue()[0]

  // setMessage = setNotify
  const getName = () =>
    url[1].toUpperCase() + url.split('/')[1].substring(1, url.length - 2)
  instance({
    method: action === 'edit' ? 'PATCH' : 'POST',
    url:
      action === 'edit' && !url.endsWith('updateme')
        ? `${url}/${model._id || model.get('_id')}`
        : url,
    data:
      model instanceof FormData
        ? model
        : {
            ...model,
            _id: undefined,
            active: undefined,
          },
  })
    .then((res) => {
      if (res.data.status === 'success') {
        setMessage({
          message: `${getName()} ${
            action === 'edit' ? 'Updated' : 'Created'
          } Successfully`,
          type: 'success',
        })
        callback && callback(res.data.data)
      } else setMessage({ message: res.data.message, type: 'error' })
    })
    .catch((err) => {
      setMessage({
        message: err.response?.data.message || err.message,
        type: 'error',
      })
    })
}

export const deleteData = (url, setMessage, callback, data = {}) => {
  instance({
    method: 'DELETE',
    url,
    data,
  })
    .then((res) => {
      const message =
        res.status === 204 ? 'Deleted Successfully' : res.data.message
      setMessage({ message, type: 'error' })
      res.status === 204 && callback && callback()
    })
    .catch((err) =>
      setMessage({
        message: err.response?.data.message || err.message,
        type: 'error',
      })
    )
}

export const toTwoDecString = (value) => {
  const strValue = value + ''
  const index = strValue.indexOf('.')
  if (index === -1) return strValue + '.00'

  const decimalPart = strValue.substring(index + 1)
  if (decimalPart.length === 1) return strValue + '0'
  return strValue
}
