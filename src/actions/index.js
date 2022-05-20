import { TYPES } from "../types"
import axios from 'axios'
import { API_KEY, API_URL } from "../constants"

export const setActiveDay = (dayId) => {
    return {
        type: TYPES.SET_ACTIVE_DAY ,
        payload: dayId
    }
}

export const addReminderSuccess = (data, cityData) => {
    return {
        type: TYPES.ADD_REMINDER ,
        payload: {
            ...data,
            city: cityData
        }
    }
}

export const addReminderAction = (data) => async (dispatch) => {
    console.log(data)
    const actualDay =  data.id <10 ? `0${data.id}` : data.id.toString()
    try {
        const {data: cityData} = await axios.get(`${API_URL}/${data.data.city}?unitGroup=metric&key=${API_KEY}&contentType=json`)
        const day = cityData?.days?.find(day=> day.datetime.split('-')[2]===actualDay)
        console.log(day, day?.icon, day?.description)
        const res = await dispatch(addReminderSuccess(data, cityData))     
    } catch (error) {
       console.log(error) 
    }
}

export const removeReminderAction = (dayId, reminderId) => {
    return {
        type: TYPES.REMOVE_REMINDER ,
        payload: {
            dayId, reminderId 
        }
    }
}

export const updateReminderAction = (dayId, updatedData) => {
    return {
        type: TYPES.UPDATE_REMINDER ,
        payload: {
            dayId, updatedData 
        }
    }
}