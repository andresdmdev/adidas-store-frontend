
function hours(){

  const date = new Date()

  const hour = date.getHours()

  let grettings

  if(hour > 3 && hour < 12){
    grettings = 'Good morning' 
  } else if(hour > 11 && hour < 18){
    grettings = 'Good afternoon' 
  } else if(hour > 17 && hour < 22){
    grettings = 'Good evening' 
  } else {
    grettings = 'Good nigth' 
  }

  return grettings
}

export default hours
