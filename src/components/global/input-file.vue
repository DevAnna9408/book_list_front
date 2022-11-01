<template>
<div>
  <div
    :class="{'has-file': show}"
    class="c-file-input js-file-input">
    <div class="c-file-input__indicator">
      <span class="c-file-input__indicator__icon c-icon c-icon--attach"></span>
    </div>
    <ValidationProvider
      tag="div"
      :vid="id"
      :name="name"
      :rules="required ? 'required': ''"
      v-slot="{ errors, invalid }"
    >
      <label class="c-file-input__label js-file-input__label" :for=id>
        <span>{{ theFileName }}</span>
        <input
          :id=id
          type="file" @change="fileChangeHandler"
          :accept="accet"
          name="attachment" class="c-file-input__field js-file-input__field">
      </label>
      <div @click.stop="clearFileHandler" class="c-file-input__remove js-file-input__remove">
        <span class="c-file-input__remove__icon c-icon c-icon--remove-circle">x</span>
      </div>
      <div class="errors-msg" v-if="invalid" >{{ errors[0] }}</div>
    </ValidationProvider>
  </div>

  <div class="upload-btn">
    <slot v-bind="{ show, files }"></slot>
  </div>
</div>
</template>
<script>
import typeUtil from '@/utils/type'
import { uuid } from '@/utils/uuid'
import sweetAlert from '@/wrapper/sweet-alert'
import { i18n } from '@/plugins/i18n'
export default {
  name: 'input-file',
  props: {
    name: {
      type: String
    },
    uploadedFile: {
      type: Object,
      default: null
    },
    uploadUri: {
      type: String
    },
    uploadFileKey: {
      type: String
    },
    required: {
      type: Boolean,
      default: false
    },
    fileType: {
      type: Array,
      default: function () { return [] }
    },
    maxSize: {
      type: Number
    }
  },
  data () {
    return {
      files: [],
      show: false,
      id: 'input-' + uuid()
    }
  },
  computed: {
    theFileName () {
      if ((this.files.length > 0) && 'name' in this.files[0]) {
        return this.files[0].name
      }
      return i18n.t('appl.file.upload_file')
    },
    showRequiredMsg () {
      if (this.uploadFile === null) return false
      return this.required && typeUtil.isEmptyObject(this.uploadedFile)
    },
    accet () {
      return this.fileType.map(element => {
        return '.' + element
      })
    }
  },
  watch: {
    uploadedFile (val) {
      this.uploadFile = val
    }
  },
  methods: {
    fileChangeHandler (e) {
      const file = e.target.files[0]
      if (!typeUtil.isNullOrUndefined(file)) {
        let name = file.name
        let type = file.type
        type = type.substr(type.lastIndexOf('/') + 1, type.length)
        name = name.substr(0, name.lastIndexOf('.'))

        this.validFile(type, file.size, name, e.target.files)
      } else {
        this.files = []
      }
    },
    validFile (type, size, name, files) {
      if (!this.fileType.includes(type)) { // 확장자 체크
        sweetAlert.error(i18n.t('appl.file.file_ext'), this.fileType + i18n.t('appl.file.file_ext_msg'))
        this.clearFileHandler()
      } else if (size === 0) {
        sweetAlert.error(i18n.t('appl.file.file_size'), i18n.t('appl.file.file_size_0'))
        this.clearFileHandler()
      } else if (size > this.maxSize) { // 파일 사이즈 체크
        sweetAlert.error(i18n.t('appl.file.file_size'), ((this.maxSize / 1024) / 1024) + i18n.t('appl.file.file_size_msg'))
        this.clearFileHandler()
      } else if (this.isNotValidFileName(name)) { // 파일명 체크
        sweetAlert.error(i18n.t('appl.file.file_name'), i18n.t('appl.file.file_name_msg'))
        this.clearFileHandler()
      } else {
        this.files = Array.from(files)
        this.show = true
      }
    },
    isNotValidFileName (filename) {
      let rg = /[~!@#$%^&*+|<>?:{}/\\,]/
      return rg.test(filename) || filename.length > 40
    },
    clearFileHandler () {
      const el = this.$el.querySelector('.js-file-input__field')
      const wrapper = document.createElement('form')
      this.wrapInputAndReset(el, wrapper)
    },
    wrapInputAndReset (el, wrapper) {
      // wrap input with form tag
      el.parentNode.insertBefore(wrapper, el)
      wrapper.appendChild(el)

      // reset input with form.reset()
      wrapper.reset()

      // place childNodes in document fragment
      const docFrag = document.createDocumentFragment()
      while (wrapper.firstChild) {
        const child = wrapper.removeChild(wrapper.firstChild)
        docFrag.appendChild(child)
      }

      // replace wrapper with document fragment
      wrapper.parentNode.replaceChild(docFrag, wrapper)

      this.files = []
      this.show = false
    }
  },
  created () {
    this.uploadFile = this.uploadedFile
  }
}
</script>
<style>

</style>
