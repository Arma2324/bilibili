<template>
    <div class="cover" @click="$router.push(`/article/${detailItem.id}`)">
         <img src="@/assets/videobanner.jpg" alt="">
         <p>{{ detailItem.name }}</p>
         <div class="popularity">
             <span><van-icon name="play-circle-o" />666</span>
             <span><van-icon name="chat-o" />{{ detailItem.commentlen }}</span>
         </div>
    </div>
</template>

<script>
export default{
    props: ['detailItem']
}
</script>

<style scoped>
.cover {
    position: relative;
    width: 172.001px;
    margin: 7.999px 0;
}
.cover img {
    width: 100%;
}
.popularity {
    position: absolute;
    top: 72px;
    left: 0;
    display: flex;
    justify-content: space-between;
    width: 162px;
    height: 15.001px;
    padding: 5px;
    color: #fff;
    background: linear-gradient(0deg, rgba(0,0,0,.85), transparent);
}
.popularity span {
    display: flex;
    align-items: center;
}
</style>