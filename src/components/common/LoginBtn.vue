<template>
    <div class="btnParent">
        <div class="button">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
.btnParent {
    padding: 4.167vw 2.778vw;
}
.button {
    height: 12.5vw;
    background-color: #ff9db5;
    font-size: 4.444vw;
    color: #fff;
    line-height: 12.5vw;
    text-align: center;
    border-radius: 6.25vw;
}
</style>