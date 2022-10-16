module.exports = async (request, response) => {
  const payload = JSON.parse(request.payload)

  response.json({
    result: payload.numbers.reduce((previousValue, currentValue) => previousValue + currentValue)
  })
}