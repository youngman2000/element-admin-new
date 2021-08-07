<template>
  <div v-if="!item.hidden">
    <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children
    || onlyOneChild.noShowingChildren ) && !item.alwaysShow">
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :class="{'submenu-title-noDropdown':!isNest}"
                      :index="resolvePath(onlyOneChild.path)"
        >
          <item :icon="onlyOneChild.meta.icon || (item.meta&&item.meta.icon)"
                :title="onlyOneChild.meta.title"
          ></item>
        </el-menu-item>
      </app-link>
    </template>
    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template v-slot:title>
        <item v-if="item.meta" :icon="item.meta&&item.meta.icon" :title="item.meta.title">

        </item>
      </template>
      <sidebar-item v-for="child in item.children"
                    :key="child.path"
                    :base-path="resolvePath(child.path)"
                    :is-nest="true"
                    :item="child"
                    class="nest-menu"
      >
      </sidebar-item>

    </el-submenu>
  </div>
</template>
<script>
import Item from './Item'
import path from 'path'
import AppLink from './Link'
import FixiOSBug from './FixiOSBug'
import {isExternal} from '@/utils/validate'

export default {
  name: 'SidebarItem',
  components: {Item, AppLink},
  mixins: [FixiOSBug],
  props: {
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    this.onlyOneChild = null
    return {}
  }
  , methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          this.onlyOneChild = item
          return true
        }
      })
      if (showingChildren.length === 1) {
        return true
      }
      if (showingChildren.length === 0) {
        this.onlyOneChild = {
          ...parent, path: '', noShowingChildren: true
        }
        return true
      }
      return false
    }
    , resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resovle(this.basePath, routePath)
    }
  }
}

</script>
