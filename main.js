const vm = new Vue({
  'el': '#app',
  'data': {
    error: '',
    getBallButtonText: 'Start Game',
    calledNumber: '',
    letters: [
      "B","I","N","G","O"
    ],
    B: [],
    I: [],
    N: [],
    G: [],
    O: [],
    allNumbers: [],
    numbersCalled: [],
  },
  methods: {
    makePick() {
      if (!this.letters.length) {
        this.error = 'Game Over';
        return;
      }
      let randNum = Math.floor(Math.random() * this.letters.length);
      let letter = this.letters[randNum];
      let count = this[letter].length;
      let numIndex = Math.floor(Math.random() * count);
      let number = this[letter][numIndex];
      if (!count) {
        this.letters.splice(randNum,1);
        this.error = `All ${letter} numbers have been picked`;
        this.calledNumber = '';
        return;
      }
      this[letter].splice(numIndex,1);
      this.calledNumber = letter + number;
      this.numbersCalled.push(this.calledNumber);
      this.error = '';
      this.allNumbers[number-1].isPicked = true;
      if (this.numbersCalled.length) {
        this.getBallButtonText = 'Get BINGO Ball'
      }
    },
    populateData() {
      this.letters = ["B", "I", "N", "G", "O"];
      for (let i = 0; i < this.letters.length; i++) {
        var total = (i + 1) * 15;
        let j = i === 0 ? 1 : i * 15 + 1;
        this[this.letters[i]] = [];
        for (j; j <= total; j++) {
          this[this.letters[i]].push(j);
        }
      }
      this.error = '';
      this.numbersCalled = [];
      this.calledNumber = '';
      this.allNumbers.forEach(function(item,index) {
        item.isPicked = false;
      })
    },
    populateAllNumbers() {
      for (let i = 1; i <= 75; i++) {
        this.allNumbers.push({num: i, isPicked: false});
      }
    }
  },
  created() {
    this.populateAllNumbers();
    this.populateData();
  }
});