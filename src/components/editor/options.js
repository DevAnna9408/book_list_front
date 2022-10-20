import Quill from 'quill'

export default {
  theme: 'snow',
  modules: {
    /* Video: true, */
    imageUpload: true,
    imageDrop: true,
    imageResize: {
      modules: ['Resize', 'DisplaySize', 'Toolbar'],
      parchment: Quill.import('parchment')
    },
    VideoResize: {
      modules: [ 'Resize', 'DisplaySize', 'Toolbar' ],
      tagName: 'iframe'
    },
    toolbar: [
      [{ header: [1, 2, 3, 4, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ align: ['', 'center', 'right', 'justify'] }],
      ['image', 'video']
    ]
  },
  placeholder: '내용을 입력하세요.'
}
