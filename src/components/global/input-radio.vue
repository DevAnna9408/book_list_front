<template>
  <div class="apexFW-radio">
    <ValidationProvider tag="span" :vid="id" :name="name" :rules="rules" v-slot="{ errors, invalid }">
      <div :class="labelClass">{{label}}<span v-if="required" class="required"></span></div>
      <label :class="labelClass" style="margin:10px" v-for="radio of options" :key="radio.code">
        <input
          v-bind="radioAttributes"
          @change="onInput"
          v-model="val"
          :value="radio.code"
          type="radio"
        />
        <span class="apexFW-radio-label"> {{ radio.value }}</span>
      </label>
      <span :class="errorMsgClass" v-if="invalid">{{ errors[0] }}</span>
    </ValidationProvider>
  </div>
</template>
<script>
import baseInput from '@/mixins/baseInput.js'
export default {
  name: 'input-radio',
  props: {
    options: {
      type: Array
    }
  },
  mixins: [baseInput],
  computed: {
    radioAttributes () {
      return {
        ...this.$attrs,
        name: this.name,
        class: this.inputClass
      }
    }
  },
  data () {
    return {}
  },
  methods: {}
}
</script>
