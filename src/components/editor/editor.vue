<template>
  <div>
    <div class="content" id="editor-container" ref="editor" @keyup="_emoticonCheck"></div>
     <input type="file" id="image-file-input" />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import apxAlert from '@/wrapper/apex-alert'
import emojiRegex from 'emoji-regex'
import defaultOptions from '@/components/editor/options'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import Quill from 'quill'

import { ImageUpload } from '@/components/editor/image-upload'
import { ImageDrop } from '@/components/editor/image-drop'
import { Video } from '@/components/editor/video'
import ImageResize from 'apexsoft-quill-image-resize-module'
import VideoResize from 'quill-video-resize-module2'
Quill.register('modules/VideoResize', VideoResize)
Quill.register('modules/Video', Video, true)
Quill.register('modules/imageUpload', ImageUpload, true)
Quill.register('modules/imageDrop', ImageDrop, true)
Quill.register('modules/imageResize', ImageResize)
export default {
  name: 'editor',
  props: {
    value: {
      type: String,
      default: ''
    },
    initContent: {
      type: String,
      default: ''
    },
    options: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },
  data () {
    return {
      defaultOptions,
      editor: null,
      editorOptions: {}
    }
  },
  computed: {
    ...mapGetters({})
  },
  methods: {
    ...mapMutations({}),
    _emoticonCheck () {
      if (emojiRegex().test(this.editor.getText())) {
        apxAlert.error('', this.$t('emojiMessage'))
        this.editor.history.undo()
      }
    },
    _changeTooltipPosition () {
      Array.prototype.forEach.call(
        document.querySelectorAll('.ql-video, .ql-link'),
        e => this._adjustTooltipPosition(e)
      )
    },

    _adjustTooltipPosition (e) {
      const tooltipWidthMargin = 10 // tooltip 이 등장하는 경우 에디트 영역 내에 width margin
      const tooltipHeightMargin = 30 // tooltip 이 등장하는 경우 에디트 영역 내에 height margin

      e.addEventListener('click', function (e) {
        // 사이즈 조정 값 가져오기
        const editorWidth = document.querySelector('.ql-editor').clientWidth

        const tooltipWidth = document.querySelector('.ql-tooltip').clientWidth
        const tooltipTop = document.querySelector('.ql-tooltip').clientHeight

        // tooltip 위치 조정
        document.querySelectorAll('.ql-tooltip').forEach(element => {
          const offsetLeft = element.style.left.replace('px', '')

          // 좌우 조정
          if (offsetLeft < tooltipWidthMargin) {
            element.style.left = tooltipWidthMargin + 'px'
          } else if (
            offsetLeft >
            editorWidth - tooltipWidth - tooltipWidthMargin
          ) {
            element.style.left =
              editorWidth - tooltipWidth - tooltipWidthMargin + 'px'
          }

          // 상하 조정 (상은 기본으로 처리되어 있고 하를 조정) : 스크롤값을 가져와서 처리 해야 함
          if (
            element.style.top.replace('px', '') >
            document.querySelector('.ql-editor').scrollHeight -
              tooltipTop -
              tooltipHeightMargin
          ) {
            document.querySelector(
              '.ql-editor'
            ).scrollTop = document.querySelector('.ql-editor').scrollHeight
            element.style.top =
              document.querySelector('.ql-editor').scrollHeight -
              tooltipTop -
              tooltipHeightMargin +
              'px'
          }
        })
      })
    },
    _initialize () {
      this.editorOptions = Object.assign({}, this.defaultOptions, this.options)
      this.editor = new Quill(this.$refs.editor, this.editorOptions)
      this._changeTooltipPosition()

      this.editor.on('editor-change', () => {
        let html = this.editor.root.innerHTML
        this.$emit('input', html)
      })
    }
  },
  watch: {
    initContent (newVal, oldVal) {
      // 기존데이터 있을경우에 넣는다.
      if (this.editor) {
        this.editor.root.innerHTML = newVal
      }
    }
  },
  mounted () {
    this._initialize()
  },
  beforeDestroy () {
    this.$refs.editor = null
  }
}
</script>
<i18n>
{
  "en": {
    "emojiMessage": "이모티콘을 사용할수 없습니다."
  },
  "ko": {
    "emojiMessage": "이모티콘을 사용할수 없습니다."
  }
}
</i18n>
<style scoped>
#editor-container {
  height: 400px; /* TODO: drag-drop시 큰 이미지 이슈 */
  overflow: auto;
}
#image-file-input {
  display: none;
}
</style>
