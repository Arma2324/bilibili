<template>
  <div class="editCategory">
    <nav-bar></nav-bar>
    <div class="current">
      <van-divider
        :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
      >
        现有栏目
      </van-divider>
      <div class="currentCategory">
        <p v-for="(item, index) in currentCategory"
        @click="deleteItem(index)"
        :key="item.id">{{ item.title }}</p>
      </div>
    </div>
    <div class="deleted">
      <van-divider
        :style="{ color: '#ff0000', borderColor: '#ff0000', padding: '0 16px' }"
      >
        已删除栏目
      </van-divider>
      <div class="deletedCategory">
        <p v-for="(item, index) in deletedCategory"
        @click="addItem(index)"
        :key="item.id">{{ item.title }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/common/NavBar.vue";

export default {
  data() {
      return {
        currentCategory: [],
        deletedCategory: []
      }
  },
  components: {
    NavBar,
  },
  methods: {
      getCategory() {
          this.$http.get('/category').then((res) => {
              this.currentCategory = res.data
          })
      },
      deleteItem(index) {
        const deletedItem = this.currentCategory.splice(index, 1)
        this.deletedCategory.push(...deletedItem)
      },
      addItem(index) {
          const addItem = this.deletedCategory.splice(index, 1)
          this.currentCategory.push(...addItem)
      }
  },
  watch: {
    currentCategory() {
        localStorage.setItem('current', JSON.stringify(this.currentCategory));
        localStorage.setItem('deleted', JSON.stringify(this.deletedCategory));
    }
  },
  created() {
      if (localStorage.getItem('current') && localStorage.getItem('deleted')) {
          this.currentCategory = JSON.parse(localStorage.getItem('current')) 
          this.deletedCategory = JSON.parse(localStorage.getItem('deleted')) 
      } else {
          this.getCategory()
      }
      
  }
};
</script>

<style scoped>
.currentCategory,
.deletedCategory {
    display: flex;
    flex-wrap: wrap;
}
p {
    padding: 5px 20px;
    margin: 0 0 10px 10px;
    border: 1px solid #1989fa;
    color: #1989fa;
    border-radius: 5px;
}

.deletedCategory p {
    border: 1px solid #ff0000;
    color: #ff0000;
}
</style>