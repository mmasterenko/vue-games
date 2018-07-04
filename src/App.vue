<template>
  <v-app>

    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      clipped
      v-model="drawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
          :to="item.url"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <!-- minificator -->
        <v-list-tile id="minificator" @click="miniVariant = !miniVariant">
          <v-list-tile-action>
            <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>

    <v-footer fixed app>
      <v-spacer></v-spacer>
      <span><a href="https://github.com/mmasterenko" target="_blank">Author's GitHub</a></span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      drawer: true,
      miniVariant: false,
      items: [
        {
          icon: 'bubble_chart',
          title: 'Find the Pair',
          url: 'find-the-pair'
        },
        {
          icon: 'bubble_chart',
          title: 'Other game',
          url: 'other-game'
        }
      ],
      title: 'Games'
    }
  }
}
</script>

<style>
  #minificator {
    position: absolute;
    bottom: 30px;
    width: 100%;
  }
</style>
