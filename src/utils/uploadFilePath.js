import store from '@/store'
import dateUtil from '@/utils/date'

const getUserId = () => store.getters['users/loggedInUser'].userId
const getBasePath = () => `${getUserId()}/${dateUtil.getNowDateTime()}`

export const PATH_TYPE = {
  IMAGE: 'image'
}
export const pathUtil = {
  getFilePath () {
    let filePath = getBasePath()
    return filePath
  }

}
