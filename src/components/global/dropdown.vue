<template>
  <div v-bind:class="['drop-down-container',containerClass]" v-click-outside="closeDropDown">
    <div v-bind:class="['drop-down-title',titleClass]" @click="toggleShow">
      <slot name="drop-down-title">
        <span>{{title}}</span>
      </slot>
    </div>
    <div v-show="active" v-bind:class="['drop-down-item',itemClass]">
      <slot name="drop-down-item"></slot>
    </div>
  </div>
</template>

<script>
import dropdown from '@/mixins/dropdown.js'
export default {
  name: 'drop-down',
  props: {
    autoClose: { type: Boolean, default: false },
    containerClass: {
      type: String
    },
    titleClass: {
      type: String
    },
    itemClass: {
      type: String
    }
  },
  mixins: [dropdown],
  methods: {
    toggleShow () {
      this.active = !this.active
    },
    closeDropDown () {
      if (this.autoClose) {
        this.active = false
      }
    }
  }
}
</script>

<style>
</style>
