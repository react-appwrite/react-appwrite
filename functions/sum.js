const payload = JSON.parse(process.env.APPWRITE_FUNCTION_DATA)

console.log(JSON.stringify({
  result: payload.numbers.reduce((previousValue, currentValue) => previousValue + currentValue)
}))