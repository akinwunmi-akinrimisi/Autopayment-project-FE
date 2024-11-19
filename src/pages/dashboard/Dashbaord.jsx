import React from 'react'
import { widgetsData } from '../../components/dashboard/data'
import Widget from '../../components/dashboard/Widget'
import Table from '../../components/dashboard/Table'
import BarChart from '../../components/dashboard/BarChart'


const Dashbaord = () => {
  return (
    <div className=''>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {widgetsData.map((widget, index) => (
          <Widget
            key={index}
            title={widget.title}
            amount={widget.amount}
            colors={widget.colors} // Pass dynamic colors
            series={widget.series} // Pass dynamic series
          />
        ))}
      </div>
      <div className='my-10 bg-primary-dark'>
        <BarChart/>
      </div>
      <Table />
    </div>
  )
}

export default Dashbaord
