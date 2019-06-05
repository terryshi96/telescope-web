import moment from 'moment'

class Datahelper {
  dateCommonFormat (timeString) {
    return moment(timeString).format('YYYY-MM-DD')
  }
}

let dataHelper = new Datahelper()
export { dataHelper }
