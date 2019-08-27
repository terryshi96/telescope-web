import moment from 'moment'

class DataHelper {
  dateCommonFormat (timeString) {
    return moment(timeString).format('YYYY-MM-DD')
  }

  deleteEmptyQueryParams (params) {
    for (let item in params) {
      if (params[item] === '') {
        delete params[item]
      }
    }
    return params
  }
}

let dataHelper = new DataHelper()
export { dataHelper }
