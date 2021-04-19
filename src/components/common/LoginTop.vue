<template>
  <div class="loginTop">
    <div class="left" @click="$emit('leftClick')">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right" @click="$emit('rightClick')">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginTop',
  methods: {
    test() {
      console.log('work');
    }
  }
}
</script>

<style scoped>
.loginTop {
  display: flex;
  height: 12.5vw;
  font-size: 4.444vw;
  background-color: #fff;
}
.left,
.center,
.right {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.right {
  font-size: 3.889vw;
}
</style>