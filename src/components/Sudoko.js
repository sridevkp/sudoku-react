import React from 'react'
import './Sudoko.css'
import Square from './Square/Square'
import Options from './Options/Options'
import Keyboard from './Keyboard/Keyboard'

const sleep = (ms = 0) => new Promise((resolve,reject) => setTimeout(resolve, ms));

class Sudoko extends React.Component{
    mobileScreen = false
    difficulty = "****"
    data = Array(9*9).fill(null)
    saved = Array(9*9).fill(null)
    count = Array(9)
    state = {
        invalidSquares : [],
        similarToFocus : [],
        range : [],
        dataLoaded : false,
        selected : null,
        pencil : false,
    }


    constructor(){
        super()
    }

    componentDidMount(){
        this.generatePuzzle() 
    }

    async generatePuzzle(){
        this.setState({dataLoaded:false})

        try{
            const res = await fetch("https://sudoku-api.vercel.app/api/dosuku")
            const jsonData = await res.json()
            this.difficulty = jsonData.newboard.grids[0].difficulty.toLowerCase()
         
            const grid = jsonData.newboard.grids[0].value
            for( let i = 0; i < 9; i++){
                for( let j = 0; j < 9; j++){
                    const index = i*9 + j
                    this.data[index] =  grid[i][j] === 0 ? null : grid[i][j]
                }   
            }
        }catch{
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
        }
        
        
        this.saved = [...this.data]
        this.check( true )
        this.setState({dataLoaded:true})
    }

    solve( start = 0 ){
        for( let i = start; i < 81; i++ ){
            if( this.data[i] !== null ){
                if( i == 80){
                    return true
                }
                continue
            }
            sleep(10)
            this.forceUpdate()
            for( let n = 1; n < 10; n++ ){
                if( this.isPossibleAtIndex( i, n )){
                    this.data[i] = n
                    if( this.solve() ){
                        return true
                    }else{
                        this.data[i] = null
                    }
                }
            }
            this.forceUpdate()
            return false
        }
    }

    focus( index, val ){
        var similarToFocus = []
        var range = []
        for( let i = 0; i < 81; i++ ){
            if( this.data[i] == val ){
                similarToFocus.push( i )
            }
            if( this.inRange( i, index) ){
                range.push( i )
            }
        }
        this.setState({ similarToFocus, range, selected : index })
    }

    check( val ){
        if( ! val ) return
        this.count = Array(9).fill(0)
        var invalidSquares = []
        for( let i = 0; i < 81; i++ ){
            if( this.data[i]){
                this.count[ this.data[i] -1 ] += 1
                if(! this.isPossibleAtIndex( i, this.data[i] ) ){
                    invalidSquares.push(i)
                }
            } 
        }
        this.count = this.count.map( i => {
            return Math.max( 0, 9 - i )
        })
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
        this.check( val )
        this.focus( index, val )
    }
    handleInput( val ){
        if( this.state.selected === null ) return
        if( this.saved[this.state.selected] ) return
        this.handleChange( this.state.selected, val )
    }

    quickPencil(){
        console.log("quick pencil")
    }
    hint(){

    }

    askConfirmation( q ){
        console.log( q )
        this.data = [...this.saved]
        this.solve()
        this.forceUpdate()
    }
    erase(){
        this.handleInput( false )
    }



    render(){
        return (
            <main>
                <h2>JUDOKO.{this.difficulty}</h2>
                <div className='container' >
                    {
                        [...this.data.keys()].map( (i) =>{ 
                            return <Square
                                        key = {i}
                                        index = {i}
                                        fixed = { this.saved[i] != null }
                                        onChange = {this.handleChange.bind(this)}
                                        _val = { this.saved[i] ? this.saved[i] : this.data[i] }
                                        invalid = { this.state.invalidSquares.includes(i) }
                                        highlight = { this.state.similarToFocus.includes(i)}
                                        inRange = { this.state.range.includes(i) }
                                        onFocus = { this.focus.bind(this) }
                                    ></Square>
                            })
                           
                    }
                    { ! this.state.dataLoaded && <div className='loading'>Loading...</div>  }
                    <div className='background'></div>
                </div>

                <Options 
                    onExit={ () => this.askConfirmation("Solve and Quit?") }
                    onErase={ this.erase.bind(this) }
                    onPencil={ (pencil) => this.setState({pencil}) }
                    onQuickPencil={ this.quickPencil.bind(this)}
                    onHint={ this.hint.bind(this) }
                ></Options>

                <Keyboard 
                    selected={this.state.selected!=null} 
                    left={this.count} 
                    onInput={this.handleInput.bind(this)}
                ></Keyboard>
            </main>
        )
    }
    
}

export default Sudoko