function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min // random number between min and max

}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth:100,
      currentRound: 0,
      winner: null,
    }
  },
  computed: {
    monsterBarStyles() {
      if (this.monsterHealth < 0) {
        return {width: '0'}
      }
      return {width: this.monsterHealth + '%'}
    },
    playerBarStyles() {
      if (this.playerHealth < 0) {
        return {width: '0'}
      }
      return {width: this.playerHealth + '%'}
    },
    mayUseSpecialAttack() {
      return this.currentRound % 3 !== 0
    }
  },
  methods: {
    attackMonster() {
      this.currentRound++
      const attackValue = getRandomValue(5, 12);
      this.monsterHealth -= attackValue;
      this.attackPlayer()

    },
    attackPlayer() {
      const attackValue = getRandomValue(8, 15);
      this.playerHealth -= attackValue;
    },
    specialAttackMonster() {
      this.currentRound++
      const attackValue = getRandomValue(10, 25);
      this.monsterHealth -= attackValue;
      this.attackPlayer()
    },
    healPlayer() {
      this.currentRound++
      const healValue = getRandomValue(5, 20)
      // healing should not be available when health is at its maximum
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100
      } else {
        this.playerHealth += healValue
      }
      this.attackPlayer()

    },

  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        // A draw
        this.winner = 'draw';
      } else if (value <= 0) {
        // Player loses
        this.winner = 'monster';
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        // A draw
        this.winner = 'draw';
      } else if (value <= 0) {
        // Player wins
        this.winner = 'player';
      }
    }
  }

})

app.mount('#game')
