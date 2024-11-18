import React from 'react'
import { widgetsData } from './components/data'
import Widget from './components/Widget'
import Table from './components/Table'


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
      <Table/>
    </div>
  )
}

export default Dashbaord
