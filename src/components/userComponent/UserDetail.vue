<template>
  <div class="userDetail">
    <div class="headimg">
      <img :src="userInfo.user_img" alt="" />
    </div>
    <div class="rightpart">
      <div class="userPopularity">
        <p>
          0 <br />
          <span>粉丝</span>
        </p>
        <p>
          54 <br />
          <span>关注</span>
        </p>
        <p>
          0 <br />
          <span>获赞</span>
        </p>
      </div>
      <div class="editBtn" @click="$router.push('/edit')">编辑资料</div>
    </div>
    <div class="userDescription">
      <h4>{{ userInfo.name }}</h4>
      <p v-if="userInfo.user_desc">{{ userInfo.user_desc }}</p>
      <p v-else>这个人很懒，什么都没留下......</p>
      <span class="id">uid:{{ userInfo.id }}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: ['userInfo'],
  data() {
    return {
    }
  }
}
</script>

<style scoped>
.userDetail {
  position: relative;
  background-color: #fff;
}
.headimg {
  position: absolute;
  top: -2.222vw;
  left: 2.222vw;
  width: 19.444vw;
  height: 19.444vw;
  border-radius: 9.722vw;
  overflow: hidden;
}
.headimg img {
  width: 100%;
  height: 100%;
}
.rightpart {
  float: right;
  width: 55.556vw;
  height: 19.444vw;
  margin: 1.389vw 2.778vw;
}
.userPopularity {
  display: flex;
  justify-content: space-around;
}
.userPopularity p {
  margin: 0;
  font-size: 3.333vw;
  text-align: center;
}
.userPopularity span {
  color: #999;
}
.editBtn {
  height: 6.667vw;
  font-size: 4.444vw;
  color: #ff829d;
  text-align: center;
  margin: 2.778vw 0;
  border: 0.278vw solid #ff829d;
  border-radius: 0.833vw;
}
.userDescription {
  padding: 19.444vw 2.778vw 2.778vw;
}
.userDescription h4 {
  margin: 2.778vw 0;
  font-weight: 400;
}
.userDescription p {
  margin: 0;
  font-size: 3.889vw;
  color: #acabad;
}
.userDescription .id {
  margin: 2.222vw 0;
  font-size: 2.222vw;
  color: #9d9c9d;
  background-color: #f4f3f5;
}
</style>