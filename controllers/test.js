function between(min, max) {  
    return Math.floor(
      Math.random() * (max - min) + min
    )
  }
  
  let otp=between(1000, 9999)
export default otp

//   console.log()