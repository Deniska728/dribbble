<template>
  <div class="nav-container">
    <div class="logo">
      <img :src="logo" alt="">
    </div>
    <el-menu 
      :default-active="$route.path" 
      class="el-menu-demo menu" 
      mode="horizontal" 
      :router="true"
    >
      <el-menu-item 
        v-for="page in pages"
        :key="page.to"
        :index="page.to"
      >
      {{ page.name }}</el-menu-item>
      <el-menu-item v-if="authorized" :index="'/upload-img'">Upload image</el-menu-item>
      <el-menu-item v-if="authorized" @click="handleClick">Logout</el-menu-item>
      <el-menu-item v-if="!authorized" :index="'/login'">Login</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import logo from '@/assets/images/logo.png';

export default {
  name: 'navbar',
  data() {
    return {
      activeIndex: '1',
      logo,
      pages: [
        {
          to: '/new',
          name: 'New'
        },
        {
          to: '/popular',
          name: 'Popular'
        }
      ]
    };
  },
  mounted(){
      this.$store.dispatch('CHECK_AUTHORIZED')
  },
  methods: {
    handleClick() {
      this.authorized = false
      this.$store.dispatch('LOGOUT')
      this.$router.push('login')
    }
  },
  computed: {
    authorized: {
        get() { return this.$store.getters.GET_AUTHORIZATION },
        set(authorized) { return authorized }
    }
  }
}
</script>

<style lang="scss">
.nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;

  .menu {
    width: 70%;

    .el-menu-item.is-active {
      border-bottom-color: #ED5992;
      color: #ED5992;
    }

    .el-menu-item:not(.is-disabled):hover {
      color: #ED5992;
    }
  }
}

.logo {
  margin-top: 30px;

  img {
    width: 122px;
  }
}
</style>

