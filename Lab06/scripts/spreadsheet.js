$(document).ready(function(){
    //STORE COUNT OF GRADES
    var aCount = 0
    var bCount = 0
    var cCount = 0
    var dCount = 0
    var fCount = 0
    //STORE COUNT OF FREQUENCIES
    var aFreq = 0
    var bFreq = 0
    var cFreq = 0
    var dFreq = 0
    var fFreq = 0
    //DATA OBJECT FOR D3
    var data = [
        {"grade": 'A', "frequency": 0},
        {"grade": 'B', "frequency": 0},
        {"grade": 'C', "frequency": 0},
        {"grade": 'D', "frequency": 0},
        {"grade": 'F', "frequency": 0},
    ]

    for (let rows = 1; rows < 11; rows++){
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
                deselectAll()
                let r = $('tr:nth-child(' + rows + ') td')
                let gradeRow = []
                r.each(function(e){gradeRow[e] = parseFloat($(this).text())})
                let letterGrade = []
                for(let i = 0; i < gradeRow.length; i++){
                    letterGrade[i] = (getGrade(gradeRow[i]))
                }
                
                countGrades(letterGrade)

                aFreq = aCount / letterGrade.length
                bFreq = bCount / letterGrade.length
                cFreq = cCount / letterGrade.length
                dFreq = dCount / letterGrade.length
                fFreq = fCount / letterGrade.length

                data[0].frequency = aFreq
                data[1].frequency = bFreq
                data[2].frequency = cFreq
                data[3].frequency = dFreq
                data[4].frequency = fFreq
               
                barChart(data)
                r.addClass('selected')
            })
        }
    }

    for (let columns = 2; columns < 11; columns++){
        // IF ASSIGNMENTS ARE CLICKED, HIGHLIGHT THE COLUMNS
        let column = $('tr th:nth-child(' + columns + ')')
        column.click(function selectColumn(){
            deselectAll()
            let c = $('tr td:nth-child(' + columns +')')
            let gradeColumn = []
            c.each(function(e){gradeColumn[e] = parseFloat($(this).text())})
            let letterGrade = []
            for(let i = 0; i < gradeColumn.length; i++){
                letterGrade[i] = (getGrade(gradeColumn[i]))
            }
          
            countGrades(letterGrade)

            aFreq = aCount / letterGrade.length
            bFreq = bCount / letterGrade.length
            cFreq = cCount / letterGrade.length
            dFreq = dCount / letterGrade.length
            fFreq = fCount / letterGrade.length

            data[0].frequency = aFreq
            data[1].frequency = bFreq
            data[2].frequency = cFreq
            data[3].frequency = dFreq
            data[4].frequency = fFreq
               
            barChart(data)

            c.addClass('selected')
        })
    }

    //Count the letter grade in the array
    function countGrades(A){
        for(let i = 0; i < A.length; i++){
            
            if(A[i] === 'A'){
                aCount++
            }
            if(A[i] === 'B'){
                bCount++
            }
            if(A[i] === 'C'){
                cCount++
            }
            if(A[i] === 'D'){
                dCount++
            }
            if(A[i] === 'F'){
                fCount++
            }
        }
    }
    
    // REMOVE THE SELECTED CLASS FROM ALL TD
    function deselectAll(){
        $('#spreadsheet tr td').removeClass('selected')
        aCount = 0
        bCount = 0
        cCount = 0
        dCount = 0
        fCount = 0
        aFreq = 0
        bFreq = 0
        cFreq = 0
        dFreq = 0
        fFreq = 0
        $('#graph svg').remove()
    }

    // GET GRADE FROM GRADES ARRAY
    function getGrade(mark) {
        if (mark < 50.0) {
            return 'F';
        } else if (mark < 60.0) {
            return 'D';
        } else if (mark < 70.0) {
            return 'C';
        } else if (mark < 80.0) {
            return 'B';
        } else {
            return 'A';
        }
    }

    // CREATE THE BAR CHART
    function barChart(data){
        //D3 GRAPH
        // set the dimensions and margins of the graph
        const margin = {top: 30, right: 30, bottom: 70, left: 60},
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;
    
        // append the svg object to the body of the page
        const svg = d3.select("#graph")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
    
        // X axis
        const x = d3.scaleBand()
        .range([ 0, width ])
        .domain(data.map(d => d.grade))
        .padding(0.2);
        svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x))

        // Add the text label for the x axis
        svg.append("text")
        .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.bottom - 30) + ")")
        .style("text-anchor", "middle")
        .text("Grade");
    
        // Add Y axis
        const y = d3.scaleLinear()
        .domain([0, 1])
        .range([ height, 0]);
        svg.append("g")
        .call(d3.axisLeft(y));

        // Add the text label for the Y axis
        svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Frequency (%)");
    
        // Bars
        svg.selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", d => x(d.grade))
        .attr("y", d => y(d.frequency))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d.frequency))
        .attr("fill", "#69b3a2")
    
        }



})