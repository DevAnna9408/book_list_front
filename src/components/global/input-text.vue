<template>
  <div>
    <ValidationProvider
    :vid=id
    :name="name"
    :rules="rules"
    v-slot="{ errors, invalid }">
      <div v-if="label" :class="labelClass">{{ label }}<span v-if="required" class="required"></span>
      </div>
      <input
        v-bind="textAttributes"
        v-model="val"
        :type="inputType"
        :name="name"
        :class="{'has-error':errors[0]}"
        v-focus="inputFocus.focused"
        @focus="focus"
        @blur="blur"
        @input="onInput">

      <span :class="errorMsgClass" v-if="invalid" >{{ errors[0] }}</span>
    </ValidationProvider>
  </div>
</template>
<script>
import baseInput from '@/mixins/baseInput.js'
export default {
  name: 'input-text',
  props: {
    inputType: {
      type: String,
      required: false,
      default: 'text'
    },
    inputFocus: {
      type: Object,
      required: false,
      default: function () {
        return {
          focused: false,
          isUse: false
        }
      }
    },
    autoComplete: {
      type: String,
      defaultf: 'on'
    }
  },
  mixins: [baseInput],
  computed: {
    textAttributes () {
      return {
        ...this.$attrs,
        type: this.type,
        name: this.name,
        disabled: this.disabled,
        placeholder: this.placeholder,
        readonly: this.readonly,
        class: this.inputClass,
        maxlength: Number(this.maxlength),
        autocomplete: this.autoComplete
      }
    }
  },
  data () {
    return {
    }
  },
  methods: {
    focus () {
      this.inputFocus.focused = true
      this.$emit('focus', true)
    },
    blur () {
      this.inputFocus.focused = false
      this.$emit('focus', false)
    }
  },
  created () {

  }
}
</script>
