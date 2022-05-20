export function generateDays (){
    let daysArr = []
    const m = [30,31]
    const n = [1,2]
    m.forEach(day=>daysArr.push({
      id:`prev${day}`, data: [], active: true, day
    }))
    for (let i=1; i<=31;i++){
      daysArr.push({
        id:i, data: [], active: true, day:i
      })
    }
    n.forEach(day=>daysArr.push({
      id:`next${day}`, data: [], active: true, day
    }))

    return daysArr
}