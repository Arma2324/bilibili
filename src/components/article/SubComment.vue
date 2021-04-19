<template>
  <div>
    <div v-for="(item, index) in commentChild" :key="item.comment_id">
      <div class="comment">
        <div class="userImg">
          <img
            v-if="item.userinfo.user_img"
            :src="item.userinfo.user_img"
            alt=""
          />
          <img v-else src="@/assets/default_img.jpg" alt="" />
        </div>
        <div class="commentMain">
          <div class="title">
            {{ item.userinfo.name }}<span>{{ item.comment_date }}</span>
          </div>
          <div class="content">
            <p>
              <span v-if="comment2"
                >回复 <i style="color: #f6809f">@{{ comment2 }}</i
                >：</span
              >
              {{ item.comment_content }}
            </p>
            <span class="commentTrigger" @click="$emit('comment2last', item.comment_id)">回复</span>
          </div>
        </div>
      </div>
      <sub-sub-comment
        :commentChild="item.child"
        :comment2="item.userinfo.name"
        @comment2last="$emit('comment2last', $event)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "SubSubComment",
  props: ["commentChild", "comment2"],
};
</script>

<style scoped>
.comment {
  display: flex;
  margin: 0 8px;
  padding: 10px 0;
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
.commentMain .title {
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
.content .commentTrigger {
  flex-shrink: 0;
  color: red;
}
</style>