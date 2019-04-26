<template>
  <div :class="{'preloader-container': loading}">
    <Loading v-if="loading"/>
    <div v-else class="gallary-container">
      <div class="gallary">
        <div 
          class="gallary-item" 
          v-for="(img, idx) in images"
          :key="idx"
          @click="() => handleClick(img)"
        >
          <img :src="`http://gallery.dev.webant.ru/media/${img.image.contentUrl}`" class="item-img" alt="">
        </div>
      </div>
      <el-pagination
        class="pagination"
        background
        layout="prev, pager, next"
        :page-count="countOfPages"
        @current-change="handleChange"
        :current-page.sync="currentPage"
      >
      </el-pagination>
      <el-dialog v-if="currentImage" :visible.sync="dialogVisible" class="modal">
        <img 
          :src="`http://gallery.dev.webant.ru/media/${currentImage.image.contentUrl}`" 
          :alt="currentImage.name"
          class="modal-img"
        >
        <p class="modal-heading">{{currentImage.name}}</p>
        <p class="modal-description">{{currentImage.description}}</p>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Loading from '@/components/Loading'

export default {
  name: 'gallery',
  components: {
    Loading
  },
  data(){
    return {
      images: [],
      totalItems: 0,
      countOfPages: 0,
      loading: false,
      currentImage: '',
      currentPage: 1,
      dialogVisible: false
    }
  },
  props: {
    category: {
      type: String,
      default: 'new'
    }
  },
  methods: {
    getPhotos() {
      this.loading = true
      this.$store.dispatch('GET_PHOTOS', {
        page: this.currentPage,
        limit: '15',
        category: this.category
      })
      .then(({ images, totalItems, countOfPages }) => {
        this.images = images
        this.totalItems = totalItems
        this.countOfPages = countOfPages
        this.loading = false
      })
      .catch(err => console.error(err))
    },
    handleClick(img){
      this.currentImage = img,
      this.dialogVisible = true
    },
    handleChange(page){
      this.currentPage = page
      this.getPhotos()
    }
  },
  mounted() {
    this.getPhotos()
  },
  watch: {
    category() {
      this.currentPage = 1
      this.getPhotos()
    }
  }
}
</script>

<style lang="scss">
.gallary {
  width: 95%;
  margin: auto;
  margin-top: 47px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(3, 190px);
  grid-gap: 25px;

  .gallary-item {
    border-radius: 7px;
    overflow: hidden;
    box-shadow: 1px 1px 9px 1px rgba(197, 197, 197, 0.9);

    .item-img {
      width: 100%;
      height: 100%;
      cursor: pointer;
      object-fit: cover;
    }
  }

  @media screen and (min-width: 1800px){
    grid-template-rows: repeat(3, 220px);
    grid-gap: 30px;
  }
}

.modal {
  text-align: left;
  width: 100%;

  .el-dialog__header {
    display: none;
  }

  .modal-img {
    display: block;
    margin: auto;
    max-width: 95%;
    max-height: 50vh;
    height: auto;
  }

  .modal-heading {
    font-size: 18px;
    line-height: 18px;
    color: #2F1767;
  }

  .modal-description {
    font-size: 14px;
    line-height: 24px;
    color: #606266
  }
}

.pagination {
  margin-top: 20px;

  .el-pager li:not(.disabled):hover {
    color: #ED5992;
  }

  .el-pager li:not(.disabled).active {
    background-color: #ED5992 
  } 
}

.preloader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 100px);
}
</style>
