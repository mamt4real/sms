import { useState, useEffect } from 'react'
import instance from './axios'

function useApidata(url, body = {}) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  // console.log(body)
  useEffect(() => {
    if (!url) return
    setError(false)
    setLoading(true)
    const getData = async () => {
      try {
        const res = await instance({
          method: 'GET',
          url,
          data: body,
        })
        if (res.data.status === 'success') {
          setData(res.data.data)
          setLoading(false)
        } else {
          setLoading(false)
          setError(res.data.message)
        }
      } catch (err) {
        console.log(err)
        setError(err.response?.data.message || err.message)
        setLoading(false)
      }
    }
    if (url) getData()
  }, [url])

  return [data, loading, error]
}

export default useApidata
