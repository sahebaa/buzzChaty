import { useState } from 'react'
import { years,months,dates } from '../../../utils/years'

const index = ({onDateChange,onMonthChange,onYearChange}) => {

    const [selectedYear,setSelectedYear]=useState('2025');
    const [selectedMonth,setSelectedMonth]=useState("january");
    const [selectedDate,setSelectedDate]=useState("1");

    const handleYearChange=(e)=>{
        setSelectedYear(e.target.value);
        onYearChange(e.target.value);
    }
    const handleMonthChange=(e)=>{
        setSelectedMonth(e.target.value);
        const selectedIndex = event.target.options[event.target.selectedIndex].getAttribute('data-index');
        console.log("Here is your value ",e.target.index);
        onMonthChange(selectedIndex);
    }
    const handleDateChange=(e)=>{
        setSelectedDate(e.target.value);
        onDateChange(e.target.value);
    }

  return (
    <div className='flex items-center justify-between gap-2'>
      <select value={selectedYear} onChange={()=>handleYearChange(event)} className='border-2 border-b-amber-950 pb-1 pt-1 pr-2'>
        {
              years.map((year,index)=>(
                <option value={year}  key={index}>{year}</option>
              ))
        }
      
    </select>
      <select value={selectedMonth} onChange={()=>handleMonthChange(event)} className='border-2 border-b-amber-95 pb-1 pt-1 pr-2'>
        {
              months.map((month,index)=>(
                <option value={month} data-index={index+1} key={index+1}>{month}</option>
              ))
        }
      
    </select>

    <select value={selectedDate} onChange={()=>handleDateChange(event)} className='border-2 border-b-amber-95 pb-1 pt-1 pr-3'>
        {
              dates.map((date,index)=>(
                <option value={date} key={index+1}>{date}</option>
              ))
        }
      
    </select>
    
    </div>
  )
}

export default index
