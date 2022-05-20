import { Form, Input, Modal } from 'antd';
import React, { useState } from 'react'
import { TimePicker } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addReminderAction, removeReminderAction, updateReminderAction } from '../../actions';
import moment from 'moment';

export const RemainderModal = ({isModalVisible, setIsModalVisible}) => {

    const [form] = Form.useForm();  
    const {activeDay, days} = useSelector(state=> state.days)
    const dispatch = useDispatch();
    const day =  days?.find(item=> item.id === activeDay)
    const [editingReminderId, setIsEditing] = useState(null);
    const format = 'HH:mm';

     const handleOk = () => {
      setIsEditing(null)
      setIsModalVisible(false);
    };
  
    const handleCancel = () => {
      setIsEditing(null)
      setIsModalVisible(false);
    };

    const onFinish = (values) =>{
        if(!!editingReminderId){
          dispatch(updateReminderAction(activeDay, {
            id:activeDay,
            data: {
              id: editingReminderId,
              ...values,
              hour: moment(values.hour).format(format)
            }
          })) 
          setIsEditing(null)      
        }else{
          dispatch(addReminderAction({
            id:activeDay,
            data: {
              id: Date.now(),
              ...values,
              hour: moment(values.hour).format(format)
            }
          }))
        }
       
        form.resetFields();
    }

    const handleRemove = (day, reminderId) =>{
      dispatch(removeReminderAction(day, reminderId))
    } 

    const handleUpdate = (reminder) =>{
      setIsEditing(reminder.id)
      console.log(day.data[0])
      const editingItem =  day.data[0]
      form.setFieldsValue({
        text:editingItem.text,
        city:editingItem.city,
        hour: moment(Date(editingItem.hour))
      });
    }

  return (
    <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
      <h1>Day {activeDay}</h1>
        <Form
        form={form}
         onFinish={onFinish}>
        <Form.Item
        name="text"
        label="Text"
        rules={[{ required: true, message: 'Please you have to enter a text!' }]}
      >
        <Input  name="text"  placeholder="input a reminder"  />
      </Form.Item>
      <Form.Item
        name="city"
        label="City"
        rules={[{ required: true, message: 'Please you have to enter a city!' }]}
      >
        <Input  name="city"  placeholder="input a city"  />
      </Form.Item>
      <Form.Item
        name="hour"
        label="Hour"
        rules={[{ required: true, message: 'Please you have to enter an hour!' }]}
      >
        <TimePicker    format={format} />
      </Form.Item>
        <button type="submit">{!!editingReminderId ? 'Finish Edit' : 'Add'}</button>
        </Form>
     {day &&   <div>
          {
            day.data.map(item =>(
              <div key={item.id} style={{display:'flex', justifyContent:'space-between'}}>
                <div><p>{item.text}</p>
                <span>{item.hour}</span>
</div>
              <div>  <button
              onClick={()=>handleRemove(activeDay, item.id)}
              >X</button>
                <button
                disabled={!!editingReminderId}
                onClick={()=>handleUpdate(item)}
                >Edit</button></div>
              </div>
            ))
          }
        </div>}
  </Modal>
  )
}
