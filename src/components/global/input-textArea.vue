<template>
  <div>
    <ValidationProvider
    :vid=id
    :name="name"
    :rules="rules"
    v-slot="{ errors, invalid }">
      <label :class="labelClass">{{label}}</label>
        <textarea
        class="textArea-resize"
        v-bind="textareaAttributes"
        v-model="val"
        :name="name"
        :class="{'has-error':errors[0]}"
        @input="countTextCnt">
        </textarea>

      <span :class="errorMsgClass" v-if="invalid" >{{ errors[0] }}</span>
      <span :class="textCntClass">
       {{currentTextCnt}} / {{maxlength}}
      </span>
    </ValidationProvider>
  </div>
</template>
<script>
import baseInput from '@/mixins/baseInput.js'
export default {
  name: 'input-text-area',
  props: {
    textCntClass: {
      type: [String, Object],
      default: ''
    }
  },
  mixins: [baseInput],
  computed: {
    textareaAttributes () {
      return {
        ...this.$attrs,
        name: this.name,
        disabled: this.disabled,
        placeholder: this.placeholder,
        readonly: this.readonly,
        class: this.inputClass,
        maxlength: this.maxlength
      }
    }
  },
  data () {
    return {
      currentTextCnt: 0
    }
  },
  methods: {
    countTextCnt () {
      var value = document.getElementsByName(this.name)[0].value
      this.currentTextCnt = value.length
      this.onInput()
    }
  },
  mounted () {
    this.countTextCnt()
  }
}
</script>
<style scoped>
.textArea-resize {
  resize: none
}

</style>
