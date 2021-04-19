<template>
  <div class="article" v-if="articleData">
    <nav-bar></nav-bar>
    <video controls="controls" src="@/assets/leslievideo.mp4"></video>
    <div class="videoInfo">
      <p>
        <span class="category">{{ articleData.category.title }}</span>
        <span class="videoTitle">{{ articleData.name }}</span>
      </p>
      <p>
        <span class="author">{{ articleData.userinfo.name }}</span
        >13342万次观看 4242弹幕 04-01
      </p>
      <div class="operation">
        <div :class="{ collect: collectionActive }" @click="handleCollect">
          <van-icon name="star-o" class="icon" />收藏
        </div>
        <div><van-icon name="down" class="icon" />缓存</div>
        <div><van-icon name="share-o" class="icon" />分享</div>
      </div>
    </div>
    <div class="recommendation">
      <cover
        v-for="(item, index) in recommendationList"
        :key="item.id"
        :detailItem="item"
      />
    </div>
    <comment-title :len="commentLen" @comment="show = true"></comment-title>
    <comment
      :commentData="commentData"
      @subComment="postSubComment"
      @comment2last="postComment2Last"
    ></comment>
    <van-action-sheet v-model="show" title="发表评论">
      <div class="content">
        <van-field
          style="font-size: 18px"
          v-model="postParams.comment_content"
          rows="5"
          autosize
          autofocus
          type="textarea"
          placeholder="请输入留言"
        />
        <login-btn @click.native="postComment">发布</login-btn>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import NavBar from "@/components/common/NavBar.vue";
import Cover from "@/components/common/Cover.vue";
import CommentTitle from "@/components/article/CommentTitle.vue";
import Comment from "@/components/article/Comment.vue";
import LoginBtn from "@/components/common/LoginBtn.vue";

export default {
  name: "Article",
  data() {
    return {
      articleData: null,
      recommendationList: null,
      commentData: [],
      commentLen: 0,
      show: false,
      collectionActive: null,
      postParams: {
        comment_content: "",
        comment_date: this.getDateStr(),
        parent_id: null,
        article_id: this.$route.params.id,
      },
    };
  },
  components: {
    NavBar,
    Cover,
    CommentTitle,
    Comment,
    LoginBtn,
  },
  methods: {
    getArticleData() {
      this.$http.get("/article/" + this.$route.params.id).then((res) => {
        this.articleData = res.data[0];
      });
    },
    getCommendation() {
      this.$http.get("/commend").then((res) => {
        this.recommendationList = res.data;
      });
    },
    getCommentData() {
      this.$http.get("/comment/" + this.$route.params.id).then((res) => {
        this.commentLen = res.data.length;
        this.commentData = this.handleCommentData(res.data);
      });
    },
    handleCommentData(data) {
      function fn(temp) {
        let arr = [];
        for (var i = 0; i < data.length; i++) {
          if (data[i].parent_id == temp) {
            arr.push(data[i]);
            data[i].child = fn(data[i].comment_id);
          }
        }
        return arr;
      }
      return fn(null);
    },
    getDateStr() {
      const date = new Date();
      let m = date.getMonth() + 1;
      let d = date.getDate();
      m = m < 10 ? "0" + m : m;
      d = d < 10 ? "0" + d : d;
      return m + "-" + d;
    },
    postComment() {
      this.$http
        .post("/comment_post/" + localStorage.getItem("id"), this.postParams, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          this.postParams.comment_content = "";
          if (res.status === 200) {
            this.$msg.fail("评论发表成功！");
          }
          this.getCommentData();
        });
      this.show = false;
    },
    postSubComment(parent_id) {
      this.show = true;
      this.postParams.parent_id = parent_id;
    },
    postComment2Last(parent_id) {
      this.show = true;
      this.postParams.parent_id = parent_id;
    },
    handleCollect() {
      if (localStorage.getItem("token")) {
        this.$http
          .post("/collection/" + localStorage.getItem("id"), {
            article_id: this.$route.params.id,
          })
          .then((res) => {
            this.$msg.fail(res.data.msg);
            if (res.data.msg === "收藏成功") this.collectionActive = true;
            else this.collectionActive = false;
          });
      } else {
        this.$msg.fail("请先登录！");
      }
    },
    collectionInit() {
      if (localStorage.getItem("token")) {
        this.$http
          .get("/collection/" + localStorage.getItem("id"), {
            params: {
              article_id: this.$route.params.id,
            },
          })
          .then((res) => {
            this.collectionActive = res.data.success;
          });
      }
    },
  },
  watch: {
    $route() {
      this.getArticleData();
      this.getCommendation();
    },
  },
  created() {
    this.getArticleData();
    this.getCommendation();
    this.getCommentData();
    this.collectionInit();
  },
};
</script>

<style scoped>
.article {
  background-color: #fff;
}
video {
  width: 100%;
  vertical-align: bottom;
}
.videoInfo {
  padding: 4.167vw 5.556vw;
}
.videoInfo p {
  font-size: 4.444vw;
  margin-bottom: 2.778vw;
}
.videoInfo p:nth-child(2) {
  font-size: 3.889vw;
  color: #999;
}

.category {
  padding: 0.556vw 2.222vw;
  border-radius: 2.778vw;
  margin-right: 0.556vw;
  color: #f6809f;
  background-color: #ddd;
}
.author {
  padding-right: 4.167vw;
  color: #000;
}
.operation {
  display: flex;
}
.operation div {
  display: flex;
  align-items: center;
  font-size: 3.889vw;
  color: #999;
}
.icon {
  font-size: 6.944vw;
  margin: 0 1.389vw;
}
.recommendation {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 2.778vw;
}
.content {
  padding: 16px 16px 160px;
}
.operation .collect {
  color: #f6809f;
}
</style>