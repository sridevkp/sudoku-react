import React from 'react'
import './Sudoko.css'
import Square from './Square/Square'

class Sudoko extends React.Component{
    data = Array(9*9).fill(null)
    saved = Array(9*9).fill(null)
    state = {
        invalidSquares : [],
        focused : [],
        range : []
    }

    constructor(){
        super()
        this.generatePuzzle()
    }

    generatePuzzle(){
        var n = null
        this.data = [
            1, 4, n,  n, n, n,  n, n, 6,
            n, n, n,  n, 2, n,  n, n, n,
            3, n, n,  1, n, 7,  9, n, n,

            n, n, n,  n, 5, n,  8, n, n,
            2, n, n,  n, 9, n,  n, n, n,
            n, 3, n,  8, n, 2,  n, 4, n,

            7, n, n,  3, n, 8,  1, n, n,
            n, n, 1,  n, n, n,  n, 9, n,
            n, n, n,  5, n, n,  n, n, n 
        ]
        this.saved = [...this.data]

        this.solve()

        // console.log( this.data )
        // this.data = [...this.saved]
        // for( i = 1; i < 10; i++){
        //     const index = Math.floor(Math.random() * 81)

        // }
    }

    solve( start = 0 ){
        if( start == 0 ){
            this.data = [...this.saved]
        }
        for( let i = start; i < 81; i++ ){
            if( this.data[i] != null ){
                if( i == 80) return true
                continue
            }
            for( let n = 1; n < 10; n++ ){
                if( this.isPossibleAtIndex( i, n )){
                    this.data[i] = n
                    if( this.solve( i ) ){
                        return true
                    }else{
                        this.data[i] = null
                    }
                }
            }
            return false
        }
    }

    focus( index, val ){
        var focused = []
        var range = []
        for( let i = 0; i < 81; i++ ){
            if( this.data[i] == val ){
                focused.push( i )
            }
            if( this.inRange( i, index) ){
                range.push( i )
            }
        }
        // console.log( range )
        this.setState({ focused, range })
    }

    check(){
        var invalidSquares = []
        for( let i = 0; i < 81; i++ ){
            if( this.data[i] && ! this.isPossibleAtIndex( i, this.data[i] ) ){
                invalidSquares.push(i)
            }
        }
        this.setState({ invalidSquares })
        if( invalidSquares.length == 0 ) return true
        
    }

    getBoxCord( x, y ){
        return { x : Math.floor(x/3), y : Math.floor(y/3) }
    }

    inRange( index1, index2 ){
        const checkCord = this.indexToCord( index1 )
        const { x, y } = this.indexToCord( index2 )
    
        const box1 = this.getBoxCord( checkCord.x, checkCord.y )
        const box2 = this.getBoxCord( x, y )

        if( checkCord.x == x || checkCord.y == y || (box1.x == box2.x && box1.y == box2.y)){
            return true 
        }
        return false
    }

    isPossibleAtIndex( index, num, data = this.data ){
        const { x, y } = this.indexToCord(index)
        return this.isPossible( x, y, num, data )
    }

    isPossible( row, col, num, data = this.data ){ 
        for( let i = 0; i < 9; i++ ){//check row
            if( row == i){ continue }
            const index = this.cordToIndex( i, col ) 
            if( data[index] == num ){ return false }
        }
        for( let j = 0; j < 9; j++ ){//check column
            if( col == j){ continue }
            const index = this.cordToIndex( row, j ) 
            if( data[index] == num ){ return false }
        }
        // check boxes
        const offset = {
            x : Math.floor( row /3 ) * 3,
            y : Math.floor( col /3 ) * 3
        }
        for( let i = 0; i < 3; i++ ){
            for( let j = 0; j < 3; j++){
                const x = offset.x + i
                const y = offset.y + j 
                if( x == row && y == col){ continue }
                const index = this.cordToIndex( x, y )
                if( data[index] == num){
                    return false
                }

            }
        }
        return true
    }

    cordToIndex( x, y ){
        return y * 9 + x
    }

    indexToCord(index){
        return {
            x : index%9,
            y : Math.floor( index /9 )
        }
    }

    handleChange( index, val ){
        this.data[index] = parseInt(val)
        this.check()
    }

    render(){
        return (
            <main>
                <div className='container' >
                    {
                        [...this.data.keys()].map( (i) =>{ 
                            return <Square
                                        key = {i}
                                        index = {i}
                                        fixed = { this.saved[i] != null }
                                        parent = {this}
                                        _val = { this.data[i] }
                                        invalid = { this.state.invalidSquares.includes(i) }
                                        inFocus = { this.state.focused.includes(i)}
                                        inRange = { this.state.range.includes(i) }
                                    ></Square>
                            })
                    }
                    <div className='background'></div>
                </div>
                <div className='options'>

                </div>
                <div className='keyboard'>
                    {
                        [...Array(10).keys()].map( (i) => {
                            
                        })
                    }
                    
                </div>
            </main>
        )
    }
    
}

export default Sudoko