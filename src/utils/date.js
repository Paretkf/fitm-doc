import moment from 'moment'
const formatDate = (date, format = 'dd-mm-yyyy') => {
  const dateArray = date.split('-')
  console.log(date)
  const result = new Date(parseInt(dateArray[2]), parseInt(dateArray[1]) - 1, parseInt(dateArray[0]))
  console.log(result)
  return result
}

const localDate = (date, format = 'dd-mm-yyyy') => {
  const jsDate = formatDate(date)
  return moment(jsDate).format(format)
}

export {
  formatDate,
  localDate
}
