import {
  REGEXP
} from '@/utils/valid'
import sweetAlert from '@/wrapper/sweet-alert'
import Swal from 'sweetalert2'
export class Video {
  constructor (quill, options = {}) {
    this.quill = quill
    this.options = options
    // 툴바 선택
    this.quill.getModule('toolbar').addHandler('video', this.selectVideo.bind(this))
  }
  selectVideo () {
    let _index = (this.quill.getSelection() || {}).index || this.quill.getLength()
    let position = this.quill.getBounds(_index)

    Swal.fire({
      input: 'text',
      title: 'youtube동영상',
      onBeforeOpen: function () {
        let element = Swal.getContainer().children[0]
        element.style.left = `${Number(position.left) - 370}px` /* 에티터 동영상 클릭시 alert css  FIXME: 드림앤비전 */
        element.style.top = `${position.top}px`
      },
      showCancelButton: true,
      customClass: 'swal-youtube',
      confirmButtonText: '업로드',
      cancelButtonText: '취소'
    }).then((result) => {
      if (result.value) {
        let url = result.value
        this.clickSave(url, _index)
      }
    })
  }

  clickSave (url, index) {
    let match = url.match(REGEXP.YOUTUBE) || url.match(REGEXP.YOUTUBE2)
    if (match) {
      let reUrl = `${match[1] || 'https'}://www.youtube.com/embed/${
        match[2]
      }?showinfo=0`
      this.insertToEditor(reUrl, index)
    } else {
      sweetAlert.error('', 'youtube url만 가능합니다')
    }
  }
  insertToEditor (source, index) {
    this.quill.insertEmbed(index, 'video', source)
    this.quill.focus()
  }
}
