import React, {  useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setActiveDay } from '../../actions';
import { RemainderModal } from '../modal';
import styles from './styles.module.scss'

export const CalendarComponent = () => {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const {days} = useSelector(state=> state.days)
  const dispatch = useDispatch()
  const handleClick =(day) =>{
    setIsModalVisible(true)
    dispatch(setActiveDay(day.id))
  }

  return (
    <div className={styles.calendar}>
       <RemainderModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}  />
      <div className={styles.calendar__header}>
        <h2>April 2021</h2>
      </div>

      <div className={styles.calendar__table}>
        <ul className={styles.calendar__weekday__row}>
          <li>Mo</li>
          <li>Tu</li>
          <li>We</li>
          <li>Th</li>
          <li>Fr</li>
          <li>Sa</li>
          <li>Su</li>
        </ul>
        <ul className={styles.calendar__days__area}>
 {days.map(day=>(
   <li key={day.id}
   onClick={()=> handleClick(day)}
   >{day.day}</li>
 ))}
        </ul>
      </div>
    </div>
  )
}
