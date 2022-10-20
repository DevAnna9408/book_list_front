import {
  Image
} from '@/components/editor/image'
export class ImageDrop extends Image {
  constructor (quill, options = {}) {
    super(quill, options = {})

    this.handleDrop = this.handleDrop.bind(this)

    this.quill.root.addEventListener('drop', this.handleDrop, false)
  }
  handleDrop (evt) {
    evt.preventDefault()
    if (evt.dataTransfer && evt.dataTransfer.files && evt.dataTransfer.files.length) {
      if (document.caretRangeFromPoint) {
        const selection = document.getSelection()
        const range = document.caretRangeFromPoint(evt.clientX, evt.clientY)
        if (selection && range) {
          selection.setBaseAndExtent(range.startContainer, range.startOffset, range.startContainer, range.startOffset)
        }
      }
      let file = evt.dataTransfer.files[0]
      this.addImage(file)
    }

    // TODO: 에디터 안에서, 움직이는 경우 조정하기 https://github.com/quilljs/quill/issues/1089
  }
}
