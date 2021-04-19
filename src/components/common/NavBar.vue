<template>
  <div class="navBar">
    <div class="logo" @click="go2main">
      <img src="@/assets/logo.png" alt="" />
    </div>
    <div class="search"><van-icon name="search" /> 请输入搜索内容</div>
    <div class="headImg" @click="$router.push('/userinfo')">
      <img v-if="userInfo.user_img" :src="userInfo.user_img" alt="" />
      <img v-else src="@/assets/default_img.jpg" alt="" />
    </div>
    <div class="download">下载APP</div>
  </div>
</template>

<script>
export default {
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
    go2main() {
      if (this.$route.path != '/') this.$router.push('/')
    }
  },
  created() {
    if (localStorage.getItem('token')) this.requestUserInfo();
  },
};
</script>

<style scoped>
.navBar {
  display: flex;
  align-items: center;
  height: 12.5vw;
  background-color: #fff;
}
.logo {
  display: flex;
  justify-content: center;
  width: 30.556vw;
  height: 12.5vw;
}
.logo img {
  height: 100%;
}
.headImg {
  width: 6.667vw;
  height: 6.667vw;
  margin: 0 8px;
  border-radius: 50%;
  overflow: hidden;
}
.headImg img {
  width: 100%;
  height: 100%;
}
.download {
  font-size: 2.778vw;
  padding: 1.389vw 2.778vw;
  border-radius: 0.833vw;
  background-color: #fb7299;
  color: #fff;
}
.search {
  display: flex;
  align-items: center;
  width: 33.333vw;
  height: 6.944vw;
  font-size: 2.222vw;
  color: #999;
  border-radius: 4.167vw;
  padding: 0 1.389vw;
  background-color: #f4f4f4;
}
</style>