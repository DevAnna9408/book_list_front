import apxAlert from '@/wrapper/apex-alert'
import store from '@/store'
import { s3 } from '@/wrapper/s3'
import Constants from '@/Constants'
import { validUtil } from '@/utils/valid'
import { pathUtil } from '@/utils/uploadFilePath'
export class Image {
  constructor (quill, options = {}) {
    this.quill = quill
    this.options = options
  }
  addImage (file) { // TODO:중복코드 정리 효숙
    if (this.checkBeforeAdd(file)) {
      this.saveToServer(file)
    }
  }
  checkBeforeAdd (file) {
    return validUtil.imageAndSize(file.type, file.size, Constants.IMAGE_LIMIT_SIZE, '6MB 이하의 이미지만 올릴 수 있습니다.') // FIXME: 용량제한 수정
  }
  async saveToServer (file) {
    try {
      let filePath = pathUtil.getFilePath()
      let fileResult = await s3.upload(filePath, file, 'public-read')
      this.insertToEditor(fileResult.fullURL)
    } catch (err) {
      store.commit('errors/SET_ERROR', err)
      apxAlert.error('', '6MB 이하의 이미지만 올릴 수 있습니다.') // FIXME: 메세지 수정필요
    }
  }
  insertToEditor (url) {
    const index = (this.quill.getSelection() || {}).index || this.quill.getLength()
    this.quill.insertEmbed(index, 'image', url)
  }
}
