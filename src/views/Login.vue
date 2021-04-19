<template>
  <div>
    <LoginTop @rightClick="$router.push('/register')"
    @leftClick="$router.push('/')">
      <template #left><img class="left" src="@/assets/logo.png"></template>
      <template #center>登录bilibili</template>
      <template #right>切换到注册</template>
    </LoginTop>
    <LoginText
      style="margin: 4.167vw 0"
      label="账号"
      placeholder="请输入账号"
      @getInput="loginInfo.username = $event"
    ></LoginText>
    <LoginText
      label="密码"
      type="password"
      placeholder="请输入密码"
      @getInput="loginInfo.password = $event"
    ></LoginText>
    <LoginBtn @click.native="handleLogin">登录</LoginBtn>
  </div>
</template>

<script>
import LoginTop from "@/components/common/LoginTop.vue";
import LoginText from "@/components/common/LoginText.vue";
import LoginBtn from "@/components/common/LoginBtn.vue";

export default {
  name: "Login",
  data() {
    return {
      loginInfo: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    handleLogin() {
      let loginRule = /^.{6,16}$/;
      if (
        loginRule.test(this.loginInfo.username) &&
        loginRule.test(this.loginInfo.password)
      ) {
        this.$http.post("/login", this.loginInfo).then((res) => {
          this.$msg.fail(res.data.msg);
          if (res.data.code === 200) {
            localStorage.setItem("id", res.data.id);
            localStorage.setItem("token", res.data.token);
            setTimeout(() => {
              this.$router.push("/userinfo");
            }, 1000);
          }
        });
      } else {
        this.$msg.fail("格式不正确，请重新输入！");
      }
    },
  },
  components: {
    LoginTop,
    LoginText,
    LoginBtn,
  },
};
</script>

<style scoped>
.left {
  width: 100%;
  height: 100%;
}
</style>