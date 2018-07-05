<template>
  <v-container grid-list-lg>
    <v-layout row wrap>

      <v-flex xs6>
        <v-card>
          <v-card-title><h3>Battle Field</h3></v-card-title>
          <v-card-media>
            <table class="battle-field">
              <tr class="tr-x">
                <td></td>
                <td v-for="i in 10" v-text="i"></td>
              </tr>
              <tr v-for="(row, Y) in enemyField">
                <td v-for="(item, X) in row"
                    v-text="X === 0 ? item : ''"
                    :class="getClass(item, Y, X)"
                    @click="shot(item, Y, X)"
                ></td>
              </tr>
            </table>
          </v-card-media>
          <v-card-text>
            <div>Blocks left: {{ shipBlocks }}</div>
            <div>Last shot: {{ lastShot }}</div>
          </v-card-text>
        </v-card>
      </v-flex>

    </v-layout>

  </v-container>
</template>

<script>
  export default {
    name: 'BattleSea',
    data () {
      return {
        shipBlocks: 20,
        lastShot: '',
        enemyField: [
          ['A', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'S'],
          ['B', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'S', ' ', ' '],
          ['C', 'S', ' ', ' ', 'S', ' ', 'S', ' ', ' ', ' ', 'S'],
          ['D', 'S', ' ', ' ', 'S', ' ', 'S', ' ', ' ', ' ', ' '],
          ['E', 'S', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
          ['F', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'S'],
          ['G', ' ', 'S', 'S', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
          ['H', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
          ['I', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
          ['J', 'S', 'S', 'S', 'S', ' ', ' ', ' ', 'S', 'S', 'S']
        ],
        myShots: [
          'A1', 'A2', 'B5', 'B6'
        ]
      }
    },
    methods: {
      checkShip (X, Y, direction, shipCoord) {
        let isAlive = false
        while (true) {
          if (direction === 'up') {
            Y--
          } else if (direction === 'down') {
            Y++
          } else if (direction === 'left') {
            X--
          } else if (direction === 'right') {
            X++
          }

          if (Y < 0 || Y > 9 || X < 1 || X > 10) {
            break
          }

          if (this.enemyField[Y][X] === 'x') {
            shipCoord.push(`${X}:${Y}`)
          } else if (this.enemyField[Y][X] === 'S') {
            isAlive = true
          } else {
            break
          }
        }
        return isAlive
      },
      shot (item, Y, X) {
        if (X === 0) {
          return
        }
        const alpha = this.enemyField[Y][0]
        this.lastShot = `${alpha}${X}`

        if (this.enemyField[Y][X] === ' ') {
          this.enemyField[Y][X] = 'o'
        } else if (this.enemyField[Y][X] === 'S') {
          this.enemyField[Y][X] = 'x'
          this.shipBlocks--
          let isAlive = false
          const shipCoord = []
          shipCoord.push(`${X}:${Y}`)

          isAlive = this.checkShip(X, Y, 'up', shipCoord) || isAlive
          isAlive = this.checkShip(X, Y, 'down', shipCoord) || isAlive
          isAlive = this.checkShip(X, Y, 'left', shipCoord) || isAlive
          isAlive = this.checkShip(X, Y, 'right', shipCoord) || isAlive

          if (!isAlive) {
            for (let i in shipCoord) {
              const coord = shipCoord[i].split(':')
              const X = Number(coord[0])
              const Y = Number(coord[1])
              this.enemyField[Y][X] = 'X'
            }
          }
        }
        if (this.shipBlocks < 1) {
          setTimeout(function () {
            alert('Game Over')
          }, 150)
        }
      },
      getClass (item, Y, X) {
        if (X === 0) {
          return 'td-y'
        }
        const classes = {
          ' ': '',
          'S': '',
          'x': 'hit-hurt',
          'X': 'ship-sinked',
          'o': 'hit-missed'
        }
        return classes[item]
      }
    }
  }
</script>

<style scoped>
  .battle-field {
    border: none;
  }

  .battle-field td {
    border: gray solid 1px;
    height: 33px;
    width: 33px;
    text-align: center;
    border-radius: 2px;
    background-color: #2196f3;
  }

  .tr-x td {
    border: none;
    color: darkgray;
    background-color: transparent !important;
  }

  td.td-y {
    border: none !important;
    color: darkgray;
    background-color: transparent !important;
  }

  td.ship {
    background-color: #323232;
  }

  td.ship-sinked {
    background-color: darkorange;
  }

  td.hit-missed::after {
    content: '+';
  }

  td.hit-hurt {
    background-color: red;
  }
</style>
