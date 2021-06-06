<template>
  <div class="checkbox-slider">
    <input type="checkbox" v-model="checked" @change="onChange" id="checkbox">
    <label for="checkbox" class="slider"></label>
    <label for="checkbox"><slot></slot></label>
  </div>
</template>

<script>
export default {
  props: {
    defaultChecked: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      checked: this.defaultChecked
    }
  },
  methods: {
    onChange(){
      this.$emit('input', this.checked)
    }
  }
}
</script>

<style>

</style>