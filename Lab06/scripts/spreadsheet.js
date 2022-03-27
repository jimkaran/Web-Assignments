$(document).ready(function(){

    for (let rows = 1; rows < 5; rows++){
        let row = $('tr:nth-child(' + rows + ') th')
        // IF THE STUDENT ID HEADER IS CLICKED ERASE THE HIGHLIGHTING
        if (rows == 1){
            row.click(function(){
                deselectAll()
            })
        }
        // IF STUDENT IDS ARE CLICKED, HIGHLIGHT THE ROWS
        else{
            row.click(function selectRow(){
                let r = $('tr:nth-child(' + rows + ') td')
                deselectAll()
                r.addClass('selected')
            })
        }
    }

    for (let columns = 2; columns < 5; columns++){
        // IF ASSIGNMENTS ARE CLICKED, HIGHLIGHT THE COLUMNS
        let column = $('tr th:nth-child(' + columns + ')')
        column.click(function selectColumn(){
            let c = $('tr td:nth-child(' + columns +')')
            deselectAll()
            c.addClass('selected')
        })
    }


    // REMOVE THE SELECTED CLASS FROM ALL TD
    function deselectAll(){
        $('#spreadsheet tr td').removeClass('selected')
    }




})