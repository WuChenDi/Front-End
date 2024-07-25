<script>
export default {
  name: 'InputNumber',
  props: {
    value: {
      type: [String, Number],
      default: null,
    },
    placeholder: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    maximum: {
      type: Number,
      default: 999999999.99,
    },
    appendText: {
      type: String,
      default: '元',
    },
  },
  emits: ['input'],
  data() {
    return {
      localMovieCost: this.value,
    }
  },
  watch: {
    value(newVal) {
      this.localMovieCost = newVal
    },
  },
  methods: {
    handleInput(event) {
      let temp = event.toString()
      temp = temp.replace(/。/g, '.')
      temp = temp.replace(/[^\d.]/g, '')
      temp = temp.replace(/^\./g, '')
      temp = temp.replace(/\.{2,}/g, '')
      temp = temp.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
      temp = temp.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3')

      // 限制最大值
      if (Number.parseFloat(temp) > this.maximum) {
        temp = this.maximum.toString()
      }

      this.$emit('input', temp)
      this.localMovieCost = temp
    },
  },
}
</script>

<template>
  <el-input
    :value="localMovieCost"
    :placeholder="placeholder"
    :disabled="disabled"
    @input="handleInput"
  >
    <template slot="append">{{ appendText }}</template>
  </el-input>
</template>
