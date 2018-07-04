import Vue from 'vue'
import Router from 'vue-router'
import FindPair from '@/pages/FindPair'
import OtherGame from '@/pages/OtherGame'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/find-the-pair'
    },
    {
      path: '/find-the-pair',
      name: 'FindPair',
      component: FindPair
    },
    {
      path: '/other-game',
      name: 'OtherGame',
      component: OtherGame
    }
  ],
  mode: 'history'
})
