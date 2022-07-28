
function hours(){

  const date = new Date()

  const hour = date.getHours()

  let grettings

  if(hour > 4 && hour < 12){
    grettings = 'Good morning' 
  } else if(hour > 12 && hour < 18){
    grettings = 'Good afternoon' 
  } else if(hour > 18 && hour < 22){
    grettings = 'Good evening' 
  } else {
    grettings = 'Good nigth' 
  }

  return grettings
}

export default hours
