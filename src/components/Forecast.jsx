import React from 'react'

const Forecast = ({
    tittle,data
}) => {
  return (
    <div>
        <div className='flex items-center justify-start mt-6'>
            <p className='font-medium uppercase'>{tittle}</p>
        </div>
        <hr className='my-1'/>
        <div className='flex item-center justify-between'>
            {data.map((d,index)=>(
                <div key={index} className='flex flex-col items-center justify-center'>
                    <p className='font-light text-sm'>{d.tittle}</p>
                    <img src={d.icon} alt="weather icon" className='w-12 my-1'/>
                    <p className='font medium'>{`${d.temp.toFixed()}°`}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Forecast