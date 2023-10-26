import React from 'react'
import './Chart.css'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

function Chart({ title, data, datakey, grid }) {
  return (
    <div className='chart'>
      <h3 className='chart__title'>{title}</h3>
      <ResponsiveContainer width={'100%'} aspect={4 / 1}>
        <LineChart data={data}>
          <XAxis dataKey={'name'} stroke='#5550bd' />
          <YAxis />
          <Tooltip />
          {grid && <CartesianGrid stroke='#e0dfdf' strokeDasharray={'5 5'} />}
          {/* <Legend /> */}
          <Line type={'monotone'} dataKey={datakey} stroke='#5550bd' />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Chart
