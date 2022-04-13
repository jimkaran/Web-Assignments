$(document).ready(function () {
    var apikey = '36529ad7'
    var movieID = ''
    $("#datepicker").datepicker({
        dateFormat: "yy/mm/dd"
    });
    $("#movieForm").submit(function (event) {
        event.preventDefault()
        let ml = $('#movieLocation').val()
        let d = $('#datepicker').val()
        $('#results').empty()

        $.ajax({
            type: 'GET',
            url: 'showtimes.json',
            success: function (data) {
                var table = $('<table>')
                table.attr('id', 'movieTable')
                $.each(data, function (key, value) {
                    if (value.location == ml && value.date == d) {
                        let tr = $('<tr>')
                        let td = $('<td>')
                        let td2 = $('<td>')
                        let p = $('<p>')
                        p.text(value.title)
                        p.attr('id', value.id)
                        td.append(p)
                        tr.append(td)
                        td2.text(value.times)
                        tr.append(td2)
                        table.append(tr)
                    }
                })
                $('#results').append(table)

                $("p").click(function () {
                    $('#movieInfo').empty()
                    movieID = $(this).attr('id')
                    fetch(`http://www.omdbapi.com/?i=${movieID}&apikey=${apikey}`)
                        .then(response => response.json())
                        .then(json => {
                            let img  = $('<img>')
                            img.attr('src', json.Poster)
                            let tl = $('<label for="movieTitle" class="mt-lg-4 px-2 " >Title:</label>')
                            let tt = $('<input>') 
                            let yl = $('<label for="movieYear" class="mt-lg-4 px-2 ">Year:</label>')
                            let yt = $('<input>') 
                            let gl = $('<label for="movieGenre" class="mt-lg-4 px-2">Genre:</label>')
                            let gt = $('<input>') 
                            let rl = $('<label for="movieRuntime" class="mt-lg-4 px-2">Runtime:</label>')
                            let rt = $('<input>') 
                            let dl = $('<label for="movieDirector" class="mt-lg-4 px-2">Director:</label>')
                            let dt = $('<input>') 
                            let wl = $('<label for="movieWriter" class="mt-lg-4 px-2">Writer:</label>')
                            let wt = $('<input>') 
                            let al = $('<label for="movieActors" class="mt-lg-4 px-2">Actors:</label>')
                            let at = $('<input>') 

                            tt.attr('type', 'text')
                            tt.attr('id', 'movieTitle')
                            tt.attr('value', json.Title)
                            tt.attr('readonly', 'true')

                            yt.attr('type', 'text')
                            yt.attr('id', 'movieYear')
                            yt.attr('value', json.Year)
                            yt.attr('readonly', 'true')

                            gt.attr('type', 'text')
                            gt.attr('id', 'movieGenre')
                            gt.attr('value', json.Genre)
                            gt.attr('readonly', 'true')

                            rt.attr('type', 'text')
                            rt.attr('id', 'movieRuntime')
                            rt.attr('value', json.Runtime)
                            rt.attr('readonly', 'true')

                            dt.attr('type', 'text')
                            dt.attr('id', 'movieDirector')
                            dt.attr('value', json.Director)
                            dt.attr('readonly', 'true')

                            wt.attr('type', 'text')
                            wt.attr('id', 'movieWriter')
                            wt.attr('value', json.Writer)
                            wt.attr('readonly', 'true')

                            at.attr('type', 'text')
                            at.attr('id', 'movieActors')
                            at.attr('value', json.Actors)
                            at.attr('readonly', 'true')

                            $('#movieInfo').append(img)
                            $('#movieInfo').append('<br>')
                            $('#movieInfo').append(tl)
                            $('#movieInfo').append(tt)
                            $('#movieInfo').append('<br>')
                            $('#movieInfo').append(yl)
                            $('#movieInfo').append(yt)
                            $('#movieInfo').append('<br>')
                            $('#movieInfo').append(gl)
                            $('#movieInfo').append(gt)
                            $('#movieInfo').append('<br>')
                            $('#movieInfo').append(rl)
                            $('#movieInfo').append(rt)
                            $('#movieInfo').append('<br>')
                            $('#movieInfo').append(dl)
                            $('#movieInfo').append(dt)
                            $('#movieInfo').append('<br>')
                            $('#movieInfo').append(wl)
                            $('#movieInfo').append(wt)
                            $('#movieInfo').append('<br>')
                            $('#movieInfo').append(al)
                            $('#movieInfo').append(at)

                            console.log("Made api call, json is here: ", json);
                            console.log("rating:", json.imdbRating);
                            console.log("runtime: ", json.Runtime);
                        });
                });



            }


        })

    })
})