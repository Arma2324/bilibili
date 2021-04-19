<template>
  <div>
    <LoginTop @rightClick="$router.push('/login')"
    @leftClick="$router.push('/')">
      <template v-slot:left><img class="left" src="@/assets/logo.png"></template>
      <template v-slot:center>注册bilibili</template>
      <template v-slot:right>切换到登录</template>
    </LoginTop>
    <LoginText
      style="margin: 4.167vw 0"
      label="姓名"
      placeholder="请输入姓名"
      @getInput="registerInfo.name = $event"
    ></LoginText>
    <LoginText
      label="账号"
      placeholder="请输入账号"
      @getInput="registerInfo.username = $event"
    ></LoginText>
    <LoginText
      label="密码"
      type="password"
      placeholder="请输入密码"
      @getInput="registerInfo.password = $event"
    ></LoginText>
    <LoginBtn @click.native="handleLogin">注册</LoginBtn>
  </div>
</template>

<script>
import LoginTop from "@/components/common/LoginTop.vue";
import LoginText from "@/components/common/LoginText.vue";
import LoginBtn from "@/components/common/LoginBtn.vue";

export default {
  name: "Register",
  data() {
    return {
      registerInfo: {
        name: "",
        username: "",
        password: "",
      },
    };
  },
  methods: {
    handleLogin() {
      let registerRule = /^.{6,16}$/;
      if (
        registerRule.test(this.registerInfo.name) &&
        registerRule.test(this.registerInfo.username) &&
        registerRule.test(this.registerInfo.password)
      ) {
        this.$http.post("/register", this.registerInfo).then((res) => {
          this.$msg.fail(res.data.msg)
          if (res.data.code === 200) {
            localStorage.setItem("id", res.data.id)
            localStorage.setItem("token", res.data.objtoken)
            setTimeout(() => {
              this.$router.push("/userinfo")
            }, 1000)
          }
        });
      } else {
        this.$msg.fail("格式不正确，请重新输入！")
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