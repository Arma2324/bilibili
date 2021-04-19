<template>
  <div v-if="commentData">
    <div
      class="comment"
      v-for="(item, index) in commentData"
      v-if="item.userinfo"
      :key="item.comment_id"
    >
      <div class="userImg">
        <img v-if="item.userinfo.user_img" :src="item.userinfo.user_img" alt="">
        <img v-else src="@/assets/default_img.jpg" alt="" />
      </div>
      <div class="commentMain">
        <div class="title">{{ item.userinfo.name }}<span>{{ item.comment_date }}</span></div>
        <div class="content">
          <p>{{ item.comment_content}}</p>
          <span @click="$emit('subComment', item.comment_id)">回复</span>
        </div>
        <sub-comment :commentChild="item.child" @comment2last="$emit('comment2last', $event)" />
      </div>
      
    </div>
  </div>
</template>

<script>
import SubComment from '@/components/article/SubComment.vue'

export default {
  props: ['commentData'],
  components: {
    SubComment
  },
};
</script>

<style scoped>
.comment {
  display: flex;
  margin: 0 8px;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
}
.userImg img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.commentMain {
  padding: 0 10px;
  flex: 1;
}
.title {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 15px;
  color: #777;
}
.content {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.content span {
  flex-shrink: 0;
  color: red
}
</style>