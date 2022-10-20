<template>
<div class="daum-postcode" v-show="styleDisplay">
  <slot  name="close-btn" :close="_closePostCode" >
     <img class="closeBtn" src="@/assets/img/addr-close.png"  @click="_closePostCode()">
   </slot>
   <div class="daum-postcode-container" ref='container' :style="styles">
   </div>
 </div>
</template>
<script>
export default {
  name: 'daum-postcode',
  props: {
    q: {
      type: String,
      default: ''
    },
    animation: {
      type: Boolean,
      default: false
    },
    noAutoMapping: {
      type: Boolean,
      default: false
    },
    noShorthand: {
      type: Boolean,
      default: false
    },
    pleaseReadGuide: {
      type: Number,
      default: 0
    },
    pleaseReadGuideTimer: {
      type: Number,
      default: 1.5
    },
    maxSuggestItems: {
      type: Number,
      default: 10
    },
    showMoreHName: {
      type: Boolean,
      default: false
    },
    hideMapBtn: {
      type: Boolean,
      default: false
    },
    hideEngBtn: {
      type: Boolean,
      default: false
    },
    alwaysShowEngAddr: {
      type: Boolean,
      default: false
    },
    zonecodeOnly: {
      type: Boolean,
      default: false
    },
    theme: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    styleHeight: 0,
    styleDisplay: false
  }),
  mounted () {
    this.$loadScript('https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js')
      .then(() => {
        new window.daum.Postcode({
          width: '100%',
          height: '100%',
          animation: this.animation,
          autoMapping: !this.noAutoMapping,
          shorthand: !this.noShorthand,
          pleaseReadGuide: this.pleaseReadGuide,
          pleaseReadGuideTimer: this.pleaseReadGuideTimer,
          maxSuggestItems: this.maxSuggestItems,
          showMoreHName: this.showMoreHName,
          hideMapBtn: this.hideMapBtn,
          hideEngBtn: this.hideEngBtn,
          alwaysShowEngAddr: this.alwaysShowEngAddr,
          zonecodeOnly: this.zonecodeOnly,
          theme: this.theme,
          oncomplete: (data) => {
            let fullAddr = data.address // 최종 주소 변수
            let extraAddr = '' // 조합형 주소 변수
            // 기본 주소가 도로명 타입일때 조합한다.
            if (data.addressType === 'R') {
              // 법정동명이 있을 경우 추가한다.
              if (data.bname !== '') {
                extraAddr += data.bname
              }
              // 건물명이 있을 경우 추가한다.
              if (data.buildingName !== '') {
                extraAddr += (extraAddr !== '' ? `, ${data.buildingName}` : data.buildingName)
              }
              // 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
              fullAddr += (extraAddr !== '' ? ` (${extraAddr})` : '')
            }
            data.fullAddr = fullAddr
            this.$emit('complete', data)
            this._closePostCode()
          },
          onresize: (size) => {
            this.styleHeight = size.height < 100 ? '500px' : `${size.height}px`
          }
        }).embed(this.$refs.container, {
          q: this.q,
          autoClose: false
        })
      })
      .catch(() => {
      })
  },
  computed: {
    styles () {
      const styles = {}
      styles.height = this.styleHeight
      return styles
    }
  },
  methods: {
    _closePostCode () {
      this.styleDisplay = false
    },
    showPostCode () {
      this.styleDisplay = true
    }
  }
}
</script>
<style scoped>

</style>
