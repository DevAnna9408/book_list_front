<template>
  <div>
    <ValidationProvider
    :name="name"
    :rules="rules"
    v-slot="{ errors, invalid }">
      <div class="apexFW-checkbox">
        <label>
          <input v-model="val" type="checkbox" @change.prevent="onInput">
          <div class="pseudo-checkbox" />{{ label }}
        </label>
      </div>
      <span :class="errorMsgClass" v-if="errorMsgUsed && invalid">{{ errors[0] }}</span>
    </ValidationProvider>
  </div>
</template>
<script>
import baseInput from '@/mixins/baseInput.js'
export default {
  name: 'input-checkbox',
  mixins: [baseInput],
  props: {
    trueValue: {
      type: [Boolean, String],
      default: true
    },
    falseValue: {
      type: [Boolean, String],
      default: false
    }
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
