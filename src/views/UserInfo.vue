<template>
  <div>
    <nav-bar />
    <img src="@/assets/bannerTop_new.png" alt="" class="bgImg" />
    <user-detail :userInfo="userInfo"></user-detail>
  </div>
</template>

<script>
import NavBar from "@/components/common/NavBar.vue";
import UserDetail from "@/components/userComponent/UserDetail.vue";

export default {
  name: "UserInfo",
  data() {
    return {
      userInfo: {},
    };
  },
  components: {
    NavBar,
    UserDetail,
  },
  methods: {
    requestUserInfo() {
      this.$http.get("/user/" + localStorage.getItem("id"), {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        }
      }).then((res) => {
          
          this.userInfo = res.data[0]
      })
    }
  },
  created() {
    this.requestUserInfo();
  },
};
</script>

<style scoped>
.bgImg {
  vertical-align: bottom;
  width: 100%;
  height: 25.278vw;
}
</style>
