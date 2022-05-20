import { TYPES } from "../types"
import { generateDays } from "../utils"

const initialState = {
    days: generateDays(),
    activeDay: null
}
export const remindersReducer = (state=initialState,action) =>{
    switch (action.type) {
        case TYPES.SET_ACTIVE_DAY:
            return {
                ...state,
                activeDay: action.payload
            }
        case TYPES.ADD_REMINDER:
            return {
                ...state,
                days: state.days.map(day =>{
                    if(day.id === action.payload.id){
                        return {
                            ...day,
                            data: [...day.data,action.payload.data]
                        }
                    }
                    return day
                })
            }
        case TYPES.REMOVE_REMINDER:
            return {
                ...state,
                days: state.days.map(day =>{
                    if(day.id === action.payload.dayId){
                        return {
                            ...day,
                            data: day.data.filter(item=> item.id !== action.payload.reminderId)
                        }
                    }
                    return day
                })
            }
        case TYPES.UPDATE_REMINDER:
            return {
                ...state,
                days: state.days.map(day =>{
                    if(day.id === action.payload.dayId){
                        return {
                            ...day,
                            data: day.data.map(reminder=> {
                                if(reminder.id === action.payload.updatedData.data.id){
                                    return action.payload.updatedData.data
                                }
                                return reminder
                            }
                                )
                        }
                    }
                    return day
                })
            }
        default:
            return state
    }
}