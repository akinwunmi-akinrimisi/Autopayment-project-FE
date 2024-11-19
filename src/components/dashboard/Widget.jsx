import React from 'react'
import ReactApexChart from 'react-apexcharts'

const Widget = ({
  title,
  amount,
  series,
  colors
}) => {
  const options = {
    labels: ["success", "Return"],
    dataLabels: {
      enabled: false,
    },
    colors: colors,
    legend: {
      show: false,
      // itemMargin: {
      //   horizontal: 18,
      //   vertical: 0,
      // },
      labels: {
        // colors:  "#CBD5E1"
        show: false
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "65%",
        },
        stroke: {
          show: false,
        width: 0, 
        },
      },
    },
    stroke: {
      show: false, // Disable stroke globally
      width: 0, // Set stroke width to 0
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            show: false,
          },
        },
      },
    ],
  };
  return (
    <div className=' rounded-md bg-[#143869] py-3 px-4 w-full max-w-[350px]'>
      <div className="flex items-center">
        <div className='flex-1 text-white' >
          <div className="text-xl font-medium py-1">{title}</div>
          <div className='text-[28px] font-semibold'>{amount}</div>
        </div>
        <div className="flex-1">
          <div>
            <ReactApexChart
              type="donut"
              height="118"
              width="100%"
              options={options}
              series={series}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Widget