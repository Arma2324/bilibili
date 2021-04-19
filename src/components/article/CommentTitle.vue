<template>
  <div class="commentHead">
    <p>评论<span>({{ len }})</span></p>
    <div class="userComment">
      <img
        v-if="userInfo.user_img"
        class="userImg"
        :src="userInfo.user_img"
        alt=""
      />
      <img v-else class="userImg" src="@/assets/default_img.jpg" alt="" />
      <p class="editPart" @click="$emit('comment')">说点什么吧</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['len'],
  data() {
    return {
      userInfo: {},
    };
  },
  methods: {
    requestUserInfo() {
      this.$http
        .get("/user/" + localStorage.getItem("id"), {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          this.userInfo = res.data[0];
        });
    },
  },
  created() {
    if (localStorage.getItem('token')) this.requestUserInfo();
  },
};
</script>

<style scoped>
.commentHead {
  margin-top: 50px;
  padding: 0 10px;
}
p span {
  color: #999;
}
.userComment {
  display: flex;
  align-items: center;
  padding: 20px 0;
}
.userImg {
  width: 40px;
  height: 40px;
  margin-right: 15px;
  border-radius: 50%;
}
.editPart {
  flex: 1;
  padding: 7px;
  color: #999;
  border-radius: 20px;
  background-color: #f5f4f6;
}
</style>