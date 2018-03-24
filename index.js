
const rx = /(X..\n.X.\n..X|..X\n.X.\nX|XXX|\nXXX|\n\nXXX|X..\nX..\nX..|.X.\n.X.\n.X.|..X\n..X\n..X)/
const ro = /(O..\n.O.\n..O|..O\n.O.\nO|OOO|\nOOO|\n\nOOO|O..\nO..\nO..|.O.\n.O.\n.O.|..O\n..O\n..O)/


// Uses http://en.wikipedia.org/wiki/Minimax to make sure you never win
class JerkAi {
    constructor() {
        this.me = " "
        this.enemy = " "
        this.step = -1
    }

    decide(symbol, step, board) {
        if ( this.me == " " ) {
            this.me = symbol
            this.enemy = symbol=="X"?"O":"X"
        }
        //console.log(step)
        this.step = step
        let mm = this.minimax(step, board, symbol)
        //console.log(mm)
        return this.intpos(mm)
    }

    intpos(i) {
        if(i==0) return [0, 0]
        if(i==1) return [1, 0]
        if(i==2) return [2, 0]
        if(i==3) return [0, 1]
        if(i==4) return [1, 1]
        if(i==5) return [2, 1]
        if(i==6) return [0, 2]
        if(i==7) return [1, 2]
        if(i==8) return [2, 2]
    }

    minimax(depth, board, symbol) {
        let flat   = [].concat.apply([], board)
        let values = flat.map((c, i) => c==" "?""+i:c)
        let avail  = values.filter(v => v.match(/[0-8]/))
        //console.log(board)
        if ( this.winning(board, this.me) )
            return 10
        else if ( this.winning(board, this.enemy) )
            return -10
        else if ( avail.length == 0 )
            return 0
        else if ( depth > 9 )
            throw Error("max depth exceeded")

        let scores = []
        avail.forEach(move => {
            flat[parseInt(move)] = symbol
            //console.log(symbol, depth, move)
            scores.push(
                    this.minimax(
                        depth+1,
                        [flat.slice(0,3), flat.slice(3,6), flat.slice(6,9)],
                        symbol=="X"?"O":"X"
                    ))
            flat[parseInt(move)] = move
        })

        if ( symbol == this.me ) {
            let max_score = Math.max.apply(Math, scores)
            let max_index = scores.indexOf(max_score)
            let ava = avail[max_index]
            //choice = avail[max_index]
            //console.log(depth, "max", max_index, scores, this.intpos(max_index))
            if ( depth == this.step )
                return ava
            return scores[max_index]
        }
        else {
            let min_score = Math.min.apply(Math, scores)
            let min_index = scores.indexOf(min_score)
            let ava = avail[min_index]
            //console.log(depth, "min", this.intpos(min_index))
            if ( depth == this.step )
                return ava
            return scores[min_index]
        }
        console.log(avail)
    }

    winning(board, symbol) {
        let as_string = board.map(r => r.join("")).join("\n")
        if ( symbol === "X" )
            return (as_string.match(rx)!=null)
        if ( symbol === "O" )
            return (as_string.match(ro)!=null)
        else
            return false

    }

    name() {
        return "Jerk"
    }
}

module.exports = JerkAi

