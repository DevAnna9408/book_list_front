<template>
  <div>
    <Verte
    display="widget"
    value="#000"
    v-model="color"
    @input="$emit('update:color',color)"
    model="hex"></Verte>
  </div>
</template>

<script>
import Verte from 'verte'
import 'verte/dist/verte.css'
export default {
  name: 'color-picker',
  props: {
    color: {
      type: String
    }
  },
  components: {
    Verte
  },
  data () {
    return {
    }
  },

  methods: {

  },
  created () {
  }
}
</script>

<style scoped>
</style>
