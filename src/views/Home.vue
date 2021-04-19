<template>
  <div class="home">
    <nav-bar></nav-bar>
    <div class="category" v-if="category">
      <van-tabs v-model="active" swipeable animated>
        <van-tab
          v-for="(item, index) in category"
          :title="item.title"
          :key="item._id"
        >
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <div class="content">
              <cover
                v-for="(categoryitem, categoryindex) in item.list"
                :detailItem="categoryitem"
                :key="categoryitem.id"
              >
              </cover>
            </div>
          </van-list>
        </van-tab>
      </van-tabs>
      <div class="setting" @click="$router.push('/editcategory')">
        <van-icon name="setting-o" />
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/common/NavBar.vue";
import Cover from "@/components/common/Cover.vue";

export default {
  name: "Home",
  data() {
    return {
      category: null,
      active: 0,
      loading: false,
      finished: false,
    };
  },
  components: {
    NavBar,
    Cover,
  },
  activated() {
    if (localStorage.getItem("current") && localStorage.getItem("deleted")) {
      this.changeCategory(JSON.parse(localStorage.getItem("current")));
      this.active = 0
      this.getActiveContent();
    }
  },
  methods: {
    getCategory() {
      if (
        !localStorage.getItem("current") &&
        !localStorage.getItem("deleted")
      ) {
        this.$http.get("/category").then((res) => {
          // -------------1
          this.changeCategory(res.data);
        });
      }
    },
    changeCategory(data) {
      const changedCategory = data.map((item, index) => {
        item.list = [];
        item.page = -1;
        item.pagesize = 10;
        return item;
      });
      this.category = changedCategory;
    },
    getActiveContent() {
      let categoryitem = this.categoryItem();
        this.$http
          .get("/detail/" + categoryitem._id, {
            // -------------2
            params: {
              page: (categoryitem.page += 1),
              pagesize: categoryitem.pagesize,
            },
          })
          .then((res) => {
            if (res.data.length < categoryitem.pagesize) this.finished = true;
            categoryitem.list.push(...res.data);
          });
    },
    categoryItem() {
      const categoryitem = this.category[this.active];
      return categoryitem;
    },
    onLoad() {
      this.getActiveContent();
      this.loading = false;
    },
  },
  watch: {
    active() {
      this.finished = false;
      this.getActiveContent();
    },
  },
  created() {
    this.getCategory();
  },
};
</script>

<style scoped>
.home {
  background-color: #fff;
}
.content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 2.778vw;
}
.category {
  position: relative;
}
.setting {
  position: absolute;
  top: 0;
  right: 0;
  padding: 14px;
  background-color: #fff;
}
</style>