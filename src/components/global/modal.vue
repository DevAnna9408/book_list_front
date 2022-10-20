<template>
  <transition name="modal">
    <div>
      <div>
        <div v-click-outside="closeModal">
          <div>
            <span class="close-modal" @click="closeModal">X</span>
            <slot name="header"></slot>
          </div>

          <div>
            <slot name="body"></slot>
          </div>

          <div>
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'modal',
  methods: {
    closeModal (event) {
      if (event.target.tagName !== 'BUTTON') this.$emit('close')
    }
  }
}
</script>

<style lang="scss">
</style>
