<template>
<div>
  <div class="input-title"> {{ label }}</div>
  <div class="apexsoft-select input-group">
    <v-select
      v-model="selected" :name="name"
      :options="options"
      :reduce="reduce" :label="reduceLabel"
      @input="input"
    >
      <template #no-options>
        - 없음 -
      </template>
    </v-select>
  </div>
</div>
</template>

<script>
import 'vue-select/dist/vue-select.css'
import vSelect from 'vue-select'
export default {
  name: 'input-select',
  props: {
    value: {
      type: String
    },
    options: {
      type: Array
    },
    name: {
      type: String
    },
    label: {
      type: String
    },
    reduce: {
      type: Function,
      default: value => value.code
    },
    reduceLabel: {
      type: String,
      default: 'value'
    }
  },
  components: { vSelect },
  data () {
    return {
      selected: this.value || ''
    }
  },
  watch: {
    value (newVal) {
      this.selected = newVal
    }
  },
  methods: {
    input () {
      this.$emit('input', this.selected)
    }
  }
}
</script>
