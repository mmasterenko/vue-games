<template>
  <v-container grid-list-lg>
    <v-layout row wrap>

      <v-flex v-for="(card, index) in cards" :key="index"
              @click="openCard(card, index)"
              xs3>
        <v-card :color="getColor(card)" dark height="100px">
          <v-card-text class="text-xs-center">
            <v-icon size="70" v-text="card.open ? card.icon : 'home' "></v-icon>
          </v-card-text>
        </v-card>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'FindPair',
    created () {
      console.clear()
      this.cards = []
      const tmpCards = []
      const NPairs = 8
      for (let i = 0; i < NPairs; i++) {
        for (let j = 0; j < 2; j++) {
          tmpCards.push({
            icon: this.icons[i],
            open: false,
            paired: false
          })
        }
      }
      const tmpCardsLength = tmpCards.length
      for (let i = 0; i < tmpCardsLength; i++) {
        const randomId = Math.floor(Math.random() * tmpCards.length)
        const el = tmpCards.splice(randomId, 1)
        this.cards.push(el[0])
      }
    },
    data () {
      return {
        icons: [
          'bookmarks',
          'build',
          'favorite',
          'done_outline',
          'fingerprint',
          'euro_symbol',
          'face',
          'grade',
          'lock',
          'pan_tool',
          'room',
          'settings_voice',
          'delete',
          'explore',
          'language',
          'settings',
          'play_circle_outline',
          'call'
        ],
        previous_card: -1,
        cards: []
      }
    },
    methods: {
      openCard (card, index) {
        if (card.paired) {
          return
        }
        if (this.previous_card !== index) {
          card.open = !card.open
        }
        if (
          this.previous_card > -1 &&
          this.cards[this.previous_card].icon === card.icon &&
          this.previous_card !== index
        ) {
          card.paired = true
          this.cards[this.previous_card].paired = true
        }
        let totalPaired = 0
        for (let i in this.cards) {
          if (Number(i) !== index && !this.cards[i].paired) {
            this.cards[i].open = false
          }
          if (this.cards[i].paired) {
            totalPaired++
          }
        }
        if (totalPaired === this.cards.length && this.previous_card > -1) {
          setTimeout(function () {
            alert('Game Over')
          }, 150)
        }
        this.previous_card = Number(index)
      },
      getColor (card) {
        if (card.paired) {
          return ''
        }
        return card.open ? 'success' : 'primary'
      }
    }
  }
</script>

<style scoped>

</style>
