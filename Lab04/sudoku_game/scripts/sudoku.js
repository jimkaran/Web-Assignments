$(document).ready(function(){

    //2d array of the initial numbers for the sudoku board
    numbers = [
        [-1,1,-1,-1,-1,-1,-1,9,-1],
        [-1,-1,4,-1,-1,-1,2,-1,-1],
        [-1,-1,8,-1,-1,5,-1,-1,-1], 
        [-1,-1,-1,-1,-1,-1,-1,3,-1],
        [2,-1,-1,-1,4,-1,1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1,-1], 
        [-1,-1,1,8,-1,-1,6,-1,-1], 
        [-1,3,-1,-1,-1,-1,-1,8,-1],
        [-1,-1,6,-1,-1,-1,-1,-1,-1]   
     ]

     //generating the board
    let board = $('#board')
    for (let rows = 0; rows < 9; rows++){
        let tr = $('<tr>')
        for (let columns = 0; columns < 9; columns++){
            let td = $('<td>')
            td.attr('id', 'cell' + rows + columns)
            td.text(numbers[rows][columns] == -1 ? "" : numbers[rows][columns])
            td.click(boardClick)
            tr.append(td)
        }
        board.append(tr);
        }
    
    //generating the palette
    let palette = $('#palette');
    for (let items = 1; items < 11; items++){
        let td = $('<td>')
        td.attr('id', ' ' + items)

        //last table data should be undo image
        if (td.attr('id') == 10){
            td.append('<img src="./images/undo.png" alt="undo" id="undo">')
        }
        else{
            td.text(items)
        }
        td.click(paletteClick)
        palette.append(td)
    }

    var paletteValue = ''
    var boardValue = ''
    var boardTdData = ''

    function paletteClick(){
        //if undo button is clicked, undo the last move.
        if($(this).attr('id') == 10){
            $('#board').find('td#'+boardTdData).text(boardValue)
        } else{
            paletteValue = $(this).text()
        }
    }
    // save the board value, and board td data to variables and change the board with the palette value
    function boardClick(){
        boardValue = $(this).text()
        boardTdData = $(this).attr('id')
        $(this).text(paletteValue)
    }
})