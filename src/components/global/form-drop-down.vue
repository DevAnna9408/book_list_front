<template>
  <div :id="id">
    <drop-down :show.sync="active" :class="toggleIcon"
     container-class="application-tab" title-class="top-accordion-title" item-class="accordions">
      <template #drop-down-title>
        <span>{{title}}</span>
        <slot name="form-drop-down-sub"></slot>
        <div v-bind:class="['exapnd-collapse-arrow',toggleIcon]"></div>
      </template>
      <template #drop-down-item>
        <slot name="form-drop-down-item"></slot>
      </template>
    </drop-down>
  </div>
</template>

<script>
import dropdown from '@/mixins/dropdown.js'
export default {
  name: 'form-drop-down',
  props: {
    id: {
      type: String
    }
  },
  components: { },
  mixins: [dropdown],
  computed: {
    toggleIcon () {
      return this.active ? 'expanded' : 'collapsed'
    }
  }

}
</script>

<style>
</style>
