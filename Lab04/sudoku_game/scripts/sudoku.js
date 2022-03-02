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
            td.attr('id', ' ' + rows + columns)
            td.text(numbers[rows][columns] == -1 ? "" : numbers[rows][columns])
            tr.append(td)
        }
        board.append(tr);
        }
    
    //generating the palette
    let palette = $('#palette');
    let undo_img = $('<td><img src="./images/undo.png" alt="undo" id="undo"></td>')
    for (let items = 1; items < 10; items++){
        let td = $('<td>')
        td.text(items)
        palette.append(td)
    }

    palette.append(undo_img)
})