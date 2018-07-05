import Vue from 'vue'
import Router from 'vue-router'
import FindPair from '@/pages/FindPair'
import BattleSea from '@/pages/BattleSea'

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
      path: '/battle-sea',
      name: 'BattleSea',
      component: BattleSea
    }
  ],
  mode: 'history'
})
