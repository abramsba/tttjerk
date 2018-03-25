
const ttt = require('tiktaktoe')
const jerk = require('./index.js')

function play(c, px, po) {
    var xwins = 0;
    var owins = 0;
    var draws = 0;
    var games = []
    for(var i = 0; i < c; i++) {
        console.log("Starting game ", i)
        let start_time = new Date().getTime()
        let game = ttt.game.play(px, po)
        let end_time = new Date().getTime()
        if ( game.victory == " " ) draws++
        else if ( game.victory == "X" ) xwins++
        else if ( game.victory == "O" ) owins++
        game.duration = (end_time-start_time)
        games.push(game)
        console.log("Duration: ", game.duration)
    }
    return {
        count: c,
        playerx: px,
        playero: po,
        games: games,
        xwins: xwins,
        owins: owins,
        draws: draws
    }
}

// Test 1: AI can only win or draw against Test AI
function test1(count) {
    console.log("Test 1: Jerk vs Random. Can't lose any matches. Count: "+count)
    let randomai = ttt.game.testai
    var asx = []
    var aso = []
    console.log("  Testing as 'X'")
    for(var gi = 0; gi < count; gi++) {
        let s = new Date().getTime()
        let game = ttt.game.play(new jerk(), randomai())
        let e = new Date().getTime()
        game.duration = (e-s)
        console.log("    "+gi+"\tVictory: "+game.victory+", "+game.duration+"ms")
        console.log(ttt.format.summary(game.summary))
        asx.push(game)
    }
    console.log("  Testing as 'O'")
    for(var gi = 0; gi < count; gi++) {
        let s = new Date().getTime()
        let game = ttt.game.play(randomai(), new jerk())
        let e = new Date().getTime()
        game.duration = (e-s)
        console.log("    "+gi+"\tVictory: "+game.victory+", "+game.duration+"ms")
        console.log(ttt.format.summary(game.summary))
        aso.push(game)
    }
    return { x: asx, o: aso }
}

// Test 2: AI can only draw against itself
function test2(count) {
    console.log("Test 2: Jerk vs Jerk. Should only draw against itself.")
    var games = []
    console.log("  Testing Jerk vs Jerk")
    for(var gi = 0; gi < count; gi++) {
        let s = new Date().getTime()
        let game = ttt.game.play(new jerk(), new jerk())
        let e = new Date().getTime()
        game.duration = (e-s)
        console.log("    "+gi+"\tVictory: "+game.victory+", "+game.duration+"ms")
        console.log(ttt.format.summary(game.summary))
        games.push(game)
    }
    return games
}

function test1_check(output) {
    let lost_x = output.x.filter(g => g.victory == "O")
    let lost_o = output.o.filter(g => g.victory == "X")
    if ( lost_x.length > 0 || lost_x.length > 0 )
        console.log("  FAILED! Jerk lost against RandomAI")
    else
        console.log("  PASSED! Jerk won or drew all matches")
}

function test2_check(output) {
    let lost_x = output.filter(g => g.victory == "O")
    let lost_o = output.filter(g => g.victory == "X")
    if ( lost_x.length > 0 || lost_o.length > 0 )
        console.log("  FAILED! Jerk lost a match.")
    else
        console.log("  PASSED! Jerk can't defeat itself.")
}

test1_check(test1(200))
test2_check(test2(200))



