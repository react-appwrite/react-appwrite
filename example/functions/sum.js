module.exports = async (request, response) => {
  const payload = JSON.parse(request.payload)
  const result = payload.reduce((previousValue, currentValue) => previousValue + currentValue)

  if (result === null) {
    throw new Error('Failed to parse.')
  }

  return void response.json(result)
}