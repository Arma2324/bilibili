<template>
  <div class="editPart" @click="$emit('handleEdit', type)">
    <div class="type">
      {{ type }}
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
    props: ['type']
};
</script>

<style scoped>
.editPart {
  display: flex;
  justify-content: space-between;
  font-size: 3.889vw;
  padding: 2.778vw 2.222vw;
  margin-bottom: 0.278vw;
  background-color: #fff;
}
.content {
    color: #999
}
.type {
    display: flex;
    align-items: center;
    color: #333
}
</style>