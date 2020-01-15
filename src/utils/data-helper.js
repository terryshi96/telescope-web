import moment from 'moment'

class DataHelper {
  dateCommonFormat (timeString) {
    return moment(timeString).format('YYYY-MM-DD')
  }

  deleteEmptyQueryParams (params) {
    for (let item in params) {
      if (typeof (params[item]) === 'string') {
        if (params[item] === '') {
          delete params[item]
        }
      }
      if (Array.isArray(params[item])) {
        if (params[item].length === 0) {
          delete params[item]
        }
      }
    }
    return params
  }
}

let dataHelper = new DataHelper()
export { dataHelper }
