<template>
  <div class="pagination">
    <button
      @click="changePage"
      v-for="page in pages"
      :class="{active:page===currentPage}"
    >{{ page }}</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  data() {
    return {
      pages: ["首页", "<<", 1, 2, 3, 4, 5, "...", ">>"],
      currentPage: 1,
      maxPage: 10
    };
  },
  methods: {
    changePage: function(event) {
      var page = parseInt(event.target.innerHTML);

      if (page) {
        this.currentPage = page;
      } else {
        switch (event.target.innerHTML) {
          case "首页":
            {
              this.currentPage = 1;
              this.pages = ["首页", "<<", 1, 2, 3, 4, 5, "...", ">>"];
            }
            break;
          case "&lt;&lt;":
            {
              this.currentPage -= 1;
            }
            break;
          case "&gt;&gt;": {
            this.currentPage += 1;
          }
        }
      }

      if (this.currentPage < 1) {
        this.currentPage = 1;
      } else if (this.currentPage > this.maxPage) {
        this.currentPage = this.maxPage;
      } else {
        if (
          this.currentPage === parseInt(this.pages[6]) &&
          this.currentPage != this.maxPage
        ) {
          // 下一页
          this.pages.splice(7, 0, this.pages[6] + 1);
          this.pages.splice(2, 1);
          if (this.currentPage === this.maxPage - 1) {
            this.pages.splice(7, 1);
          }
        } else if (
          this.currentPage === parseInt(this.pages[2]) &&
          this.currentPage != 1
        ) {
          if (this.pages.length < 9) {
            this.pages.splice(7, 0, "...");
          }
          // 上一页
          this.pages.splice(6, 1);
          this.pages.splice(2, 0, this.pages[2] - 1);
        }
      }

      this.$emit('changePage',this.currentPage)
    }
  }
};
</script>

<style scoped>
.pagination {
  padding: 10px 20px 20px;
}
button {
  background: #fff;
  color: #666;
  font-size: 14px;
  margin: 0;
  border: 1px solid #ccc;
  padding: 5px 12px;
  border-right: none;
  transition: all 0.5s;
}
button:hover {
  cursor: pointer;
  background: rgb(231, 230, 230);
}
button.active {
  background: rgb(128, 189, 1);
  color: white;
}
button:last-child {
  border-right: 1px solid #ccc;
  border-radius: 0 5px 5px 0;
}
button:first-child {
  border-radius: 5px 0 0 5px;
}
</style>
