<template>
    <div class="btn" @click="$emit('handleClick')">
        <slot></slot>
    </div>
</template>

<style scoped>
.btn {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3.889vw;
    color: #333;
    padding: 2.778vw 0;
    background-color: #fff;

}
</style>