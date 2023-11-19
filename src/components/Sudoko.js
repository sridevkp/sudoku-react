import React from 'react'
import './Sudoko.css'
import bg from './bg.png'
import Square from './Square/Square'

class Sudoko extends React.Component{
    data = Array(9*9).fill(null)
    saved = [...this.data]
    state = {
        highlights : []
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
        console.log( this.saved )
        // for( i = 1; i < 10; i++){
        //     const index = Math.floor(Math.random() * 81)

        // }
    }

    solve(){
        for( let i = 0; i < 81; i++ ){
            if( this.saved[i] != null ) continue 
            console.log( i )
            for( let n = 1; n < 10; n++ ){
                if( this.isPossibleAtIndex( i, n )){
                    this.saved[i] = n
                    if( this.solve() ){
                        return true
                    }else{
                        this.saved[i] = null
                    }
                }
            }
            return false
        }
    }

    isPossibleAtIndex( index, num ){
        const { row, col } = this.indexToCord(index)
        return this.isPossible( row, col )
    }

    isPossible( row, col, num ){ 
        for( let i = 0; i < 9; i++ ){//check row
            if( row == i){ continue }
            const index = this.cordToIndex( i, col ) 
            if( this.data[index] == num ){ return false }
        }
        for( let j = 0; j < 9; j++ ){//check column
            if( col == j){ continue }
            const index = this.cordToIndex( row, j ) 
            if( this.data[index] == num ){ return false }
        }
        //check boxes
        const offset = {
            x : Math.floor( row /3 ),
            y : Math.floor( col /3 )
        }
        for( let i = 0; i < 3; i++ ){
            for( let j = 0; j < 3; j++){
                const x = offset.x + i
                const y = offset.y + j 
                if( x == row && y == col){ continue }
                const index = this.cordToIndex( x, y )
                if( this.data[index] == num){
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
        this.data[index] = val
    }

    render(){
        this.generatePuzzle()
        return (
            <div className='container' >
                <div className='background'></div>
                {
                    [...this.data.keys()].map( (i) =>{ 
                        return <Square
                                    key = {i}
                                    index = {i}
                                    fixed = { this.data[i] != null }
                                    parent = {this}
                                    _val = { this.data[i] == null ? "" : this.data[i] }
                                    highlight = { i in this.state.highlights }
                                ></Square>
                        })
                }
            </div>
        )
    }
    
}

export default Sudoko