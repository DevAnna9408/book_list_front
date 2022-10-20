import { Image } from '@/components/editor/image'

export class ImageUpload extends Image {
  constructor (quill, options = {}) {
    super(quill, options = {})
    // 툴바 선택 이미지
    this.quill.getModule('toolbar').addHandler('image', this.selectLocalImage.bind(this))
  }

  selectLocalImage () {
    const input = document.querySelector('#image-file-input')

    input.setAttribute('type', 'file')
    input.click()

    input.onchange = () => {
      const file = input.files[0]

      this.addImage(file)
      input.value = '' // 업로드 후 초기화 필요 ie에서 이슈
    }
  }
}
