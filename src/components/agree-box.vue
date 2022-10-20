<template>
  <div>
    <input-checkbox
      :label-class="labelClass"
      :label="label"
      :name="name"
      v-model="val"
      :rules="rules"
      :error-msg-used="errorMsgUsed"
      :false-value="null"
    ></input-checkbox>
    <div class="more-space" @click="openModal">
      <div class="expand-agrmnt">&gt;</div>
    </div>
    <modal class="agree-modal" v-if="isShow" @close="closeModal">
      <template #body>
        <h3 class="top-heading">{{ label }}</h3>
        <div class="external-content" v-html="content"></div>
      </template>
    </modal>
    <div class="backdrops" v-if="isShow" @close="closeModal"></div>
  </div>
</template>
<script>
let myBody = document.getElementsByTagName('body')[0]
export default {
  name: 'agree-box',
  props: {
    labelClass: {
      type: [String, Object],
      default: ''
    },
    label: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    value: {
      required: true
    },
    rules: {
      type: [String, Object],
      default: ''
    },
    content: {
      type: String
    },
    errorMsgUsed: {
      type: Boolean
    }
  },
  data: () => ({
    val: ' ',
    isShow: false
  }),
  watch: {
    val (newVal) {
      this.$emit('input', newVal)
      this.$emit('change', newVal)
    },
    value (newValue) {
      this.val = newValue
    }
  },
  methods: {
    openModal () {
      this.isShow = true
      myBody.classList.add('html-overflow')
    },
    closeModal () {
      this.isShow = false
      myBody.classList.remove('html-overflow')
    }
  },
  created () {
    this.val = this.value
  }
}
</script>
