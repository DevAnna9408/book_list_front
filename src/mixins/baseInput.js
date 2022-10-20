import { uuid } from '@/utils/uuid'
export default {
  props: {
    label: {
      type: String,
      defalut: ''
    },
    name: {
      type: String,
      default: ''
    },
    value: {},
    rules: {
      type: [Object, String],
      default: ''
    },
    labelClass: {
      type: [String, Object],
      default: 'input-title'
    },
    inputClass: {
      type: [String, Object],
      default: ''
    },
    errorMsgClass: {
      type: [String, Object],
      default: 'errors-msg'
    },
    errorMsgUsed: {
      type: Boolean,
      default: true
    },
    disabled: Boolean,
    readonly: Boolean,
    placeholder: String,
    maxlength: String,
    vid: {
      type: [String, Number]
    },
    required: {
      type: Boolean,
      default: false
    },
    tip: {
      type: String,
      default: ''
    }
  },
  watch: {
    value (newVal) {
      this.val = this.value
    }
  },
  data () {
    return {
      val: '',
      id: this.vid || 'input-' + uuid()
    }
  },
  methods: {
    onInput () {
      this.$emit('input', this.val) // 부모의  v-model에게 전달
    }
  },
  created () {
    this.val = this.value
  }
}
