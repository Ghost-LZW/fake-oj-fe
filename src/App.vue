<template>
  <div id="app">
    <el-container>
      <el-header>
        <HeaderBar/>
      </el-header>
      <el-main>
        <router-view style="margin-bottom: 80px" />
      </el-main>
      <el-footer :style="{ height }">
        <footer-bar />
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import HeaderBar from "./components/HeaderBar";
import FooterBar from "./components/FooterBar";

export default {
  name: 'App',
  props: {
    height: {
      type: String,
      default: '10px'
    }
  },
  components: {
    FooterBar,
    HeaderBar
  },
  created() {
    this.getRequest('/loginStatue').then(resp => {
      //console.log(resp)
      if (resp === null) return
      if (resp.statue === 0) {
         this.$store.commit('login', resp.data);
      } else {
        this.$store.commit('logout')
      }
    })
    //if (window.screen.width > 1000) {
    //  document.write('<body style="zoom: 125%">')
    //}
  }
}
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
