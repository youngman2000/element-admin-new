<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse"></logo>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu :active-text-color="variables.menuActiveText" :background-color="variables.menuBg" :collapse="isCollapse" :collapse-transition="false" :default-active="activeMenu" :text-color="variables.menuText" :unique-opened="false" mode="vertical">
        <sidebar-item v-for="route in permission_routes" :key="route.path" :base-path="route.path" :item="route"></sidebar-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script>
import Logo from './Logo.vue'
import variables from '@/styles/variables.scss'
import SidebarItem from './SidebarItem'
import { mapGetters } from 'vuex'

export default {
  components: { Logo, SidebarItem },
  name: 'sidebar',
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar'
    ]),
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    isCollapse() {
      return !this.sidebar.opened
    },
    variables() {
      return variables
    }
  },
  created() {
    console.log(this.permission_routes)
  }
}
</script>
