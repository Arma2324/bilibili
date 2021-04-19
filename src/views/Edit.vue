<template>
  <div>
    <nav-bar class="navBar"></nav-bar>
    <div class="uploadHeadImg">
      <van-uploader
        class="upload"
        preview-size="100vw"
        :after-read="afterRead"
      />
      <edit-part type="头像">
        <img
          v-if="userInfo.user_img"
          :src="userInfo.user_img"
          alt=""
          class="headImg"
        />
        <img v-else src="@/assets/default_img.jpg" alt="" class="headImg" />
      </edit-part>
    </div>
    <edit-part type="昵称" @handleEdit="handleEdit">
      {{ userInfo.name }}
    </edit-part>
    <edit-part type="UID">
      {{ userInfo.id }}
    </edit-part>
    <edit-part type="性别" @handleEdit="handleGenderEdit">
      {{ userInfo.gender === '1' ? '男' : '女' }}
    </edit-part>
    <edit-part type="出生日期"> 1999-07-18 </edit-part>
    <edit-part type="个性签名" @handleEdit="handleEdit">
      <p v-if="userInfo.user_desc">{{ userInfo.user_desc }}</p>
      <p v-else>这个人很神秘，什么都没留下...</p>
    </edit-part>
    <exit-btn class="exitBtn" @handleClick="handleExit">退出登录</exit-btn>
    <exit-btn @handleClick="handleReturn">返回空间</exit-btn>
    <van-dialog
      v-model="show"
      :title="popTitle"
      @confirm="confirmClick"
      show-cancel-button
    >
      <van-field v-model="value" autofocus />
    </van-dialog>
    <van-action-sheet
      v-model="genderShow"
      :actions="actions"
      cancel-text="取消"
      close-on-click-action
      @select="onSelect"
    />
  </div>
</template>

<script>
import NavBar from "@/components/common/NavBar.vue";
import EditPart from "@/components/common/EditPart.vue";
import ExitBtn from "@/components/common/ExitBtn.vue";

export default {
  name: 'Edit',
  data() {
    return {
      userInfo: {},
      show: false,
      genderShow: false,
      value: "",
      popTitle: "",
      actions: [
          { name: '男', val: '1' }, 
          { name: '女', val: '0' }
          ]
    };
  },
  components: {
    NavBar,
    EditPart,
    ExitBtn,
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
    afterRead(file) {
      const fromdata = new FormData();
      fromdata.append("file", file.file);
      this.$http.post("/upload", fromdata).then((res) => {
        this.userInfo.user_img = res.data.url;
        this.userUpdate();
      });
    },
    userUpdate() {
      this.$http
        .post("/update/" + localStorage.getItem("id"), this.userInfo)
        .then((res) => {
          if (res.data.code === 200) {
            this.$msg.fail("修改成功!");
          }
        });
    },
    handleEdit(type) {
      this.show = true;
      this.popTitle = type;
      switch (this.popTitle) {
        case "昵称":
          this.value = this.userInfo.name;
          break;
        case "个性签名":
          this.value = this.userInfo.user_desc;
          break;
        default:
          break;
      }
    },
    confirmClick() {
      let changed = true;
      switch (this.popTitle) {
        case "昵称":
          changed = this.userInfo.name === this.value;
          this.userInfo.name = this.value;
          break;
        case "个性签名":
          changed = this.userInfo.user_desc === this.value;
          this.userInfo.user_desc = this.value;
          break;
        default:
          break;
      }
      if (!changed) this.userUpdate();
    },
    handleGenderEdit() {
        this.genderShow = true
    },
    onSelect(item) {
        let changed = this.userInfo.gender === item.val
        this.userInfo.gender = item.val;
        if (!changed) this.userUpdate();
    },
    handleReturn() {
      this.$router.push("/userinfo");
    },
    handleExit() {
        localStorage.clear();
        this.$router.push('/login')
    }
  },
  created() {
    this.requestUserInfo();
  },
};
</script>

<style scoped>
.navBar {
  margin-bottom: 2.778vw;
}
.exitBtn {
  margin-top: 4.167vw;
}
.headImg {
  width: 12.778vw;
  height: 12.778vw;
  border-radius: 50%;
}
.uploadHeadImg {
  position: relative;
  overflow: hidden;
}
.upload {
  position: absolute;
  opacity: 0;
}
</style>