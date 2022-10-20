<template>
  <ValidationProvider
    :vid="id"
    :name="name"
    :rules="rules"
    v-slot="{ errors, invalid }">
    <vue-datepicker
      :language="lang"
      :format="format"
      v-model="date"
      @input="onInput"
      @selected="selected"
      :clear-button="true"
      :disabled-dates="disabledDates"
      :inline="inline"
      :input-class="{'has-error':errors[0], inputClass} "
      wrapper-class="wrapper"
      calendar-class="calendar"
      :placeholder="placeholderText"
      :maximumView="maximumView"
      :minimumView="minimumView"
      :initialView="initialView"
      :use-utc="true"
    ></vue-datepicker>
  <span :class="errorMsgClass" v-if="invalid" >{{ errors[0] }}</span>
  </ValidationProvider>
</template>
<script>
import VueDatepicker from 'vuejs-datepicker'
import { en, ko } from 'vuejs-datepicker/dist/locale/index'
import { uuid } from '@/utils/uuid'
export default {
  name: 'datepicker',
  components: { VueDatepicker },
  props: {
    value: {
      type: [Date, String]
    },
    disabledDates: {
      type: Object
    },
    inline: {
      type: Boolean,
      default: false
    },
    inputClass: {
      type: [String, Object],
      default: ''
    },
    placeholderText: {
      type: String,
      default: ''
    },
    errorMsgClass: {
      type: [String, Object],
      default: 'errors-msg'
    },
    name: {
      type: String,
      default: ''
    },
    rules: {
      type: [Object, String],
      default: ''
    },
    format: {
      type: String,
      required: false,
      default: 'yyyy-MM-dd'
    },
    minimumView: {
      type: String,
      required: false
    },
    maximumView: {
      type: String,
      required: false
    },
    initialView: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      date: this.value || '',
      id: 'input-' + uuid()
    }
  },
  watch: {
    value (val) {
      this.date = val || ''
    }
  },
  computed: {
    lang () {
      return this.$i18n.locale === 'ko' ? ko : en
    }
  },
  methods: {
    onInput () {
      this.$emit('input', this.date)
    },
    selected (val) {
      this.$emit('selected', val)
    }
  },
  created () {
    this.date = this.value || ''
  }
}
</script>
<style scoped>
</style>
