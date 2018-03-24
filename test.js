
const ttt = require('tiktaktoe')
const jerk = require('./index.js')

let game = ttt.game.play(new jerk(), ttt.game.ai.random())
//console.log(game)
ttt.format.recap(game)
