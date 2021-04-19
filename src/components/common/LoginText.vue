<template>
  <div>
    <van-field
      class="loginText"
      v-model="content"
      :label="label"
      :type="type"
      :placeholder="placeholder"
    />
  </div>
</template>

<script>
export default {
  props: ["label", "type", "placeholder"],
  data() {
    return {
      content: "",
    };
  },
  methods: {
    emitContent() {
      this.$emit("getInput", this.content)
    },
  },
  watch: {
    content() {
      this.emitContent()
    },
  },
};
</script>

<style scoped>
.loginText {
  font-size: 3.889vw;
}
</style>