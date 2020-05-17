(function($){

/*----------------------------------
----FONCTIONS RANDOM CELL/NUMBER----
----------------------------------*/
    function randomCell(size)
    {
        var sizeSquare = size*size;
        var rdm = Math.floor((Math.random() * sizeSquare) + 1);
        return rdm;
    }

    function randomNumber()
    {
        var rdm = Math.floor((Math.random() * 100) + 1);

        if (rdm >= 90) {
            return 4;
        }
        if (rdm < 90) {
            return 2;
        }
    }

/*-------------------------------
----FONCTIONS DE DEPLACEMENTS----
-------------------------------*/
    function cellAdress(row,col)
    {
        return $("[row=" + row + "][col=" + col + "]");
    }

    function goLeft(size)
    {
        for (v = 0; v <= size; v++) {
            for (row = 0; row <= 3; row++) {
                for (col = 3; col >= 0; col--) {
                    if (cellAdress(row, col).text() == ""){
                        if (cellAdress(row, col).text() == "") {
                            cellAdress(row, col).text(cellAdress(row, (col + 1)).text())
                            cellAdress(row, (col + 1)).empty()
                        }
                    }
                    else if (cellAdress(row, col).text() == cellAdress(row, (col + 1)).text()) {
                            var produit = parseInt(cellAdress(row, col).text()) * 2

                            cellAdress(row, col).text(produit)
                            cellAdress(row, (col + 1)).empty()
                    }
                }
            }
        }
    }

    function goRight(size)
    {
        for (v = 0; v <= size; v++) {
            for (row = 0; row <= 3; row++) {
                for (col = 0; col < 3; col++) {
                    if (cellAdress(row, (col + 1)).text() == ""){
                        cellAdress(row, (col + 1)).text(cellAdress(row, col).text())
                        cellAdress(row, col).empty()
                    }
                    else if (cellAdress(row, col).text() == cellAdress(row, (col + 1)).text()) {
                        var produit = parseInt(cellAdress(row, col).text()) * 2

                        cellAdress(row, (col + 1)).text(produit)
                        cellAdress(row, col).empty()
                    }
                }
            }
        }
    }

    function goUp(size)
    {
        for (v = 0; v <= size; v++) {
            for (col = 0; col <= 3; col++) {
                for (row = 3; row >= 0; row--) {
                    if (cellAdress(row, col).text() == ""){
                        cellAdress(row, col).text(cellAdress((row + 1), col).text())
                        cellAdress((row + 1), col).empty()
                    }
                    else if (cellAdress(row, col).text() == cellAdress((row + 1), col).text()) {
                        var produit = parseInt(cellAdress(row, col).text()) * 2

                        cellAdress(row, col).text(produit)
                        cellAdress((row + 1), col).empty()
                    }
                }
            }
        }
    }

    function goDown(size)
    {
        for (v = 0; v <= size; v++) {
            for (col = 0; col <= 3; col++) {
                for (row = 0; row < 3; row++) {
                    if (cellAdress((row + 1), col).text() == ""){
                        cellAdress((row + 1), col).text(cellAdress(row, col).text())
                        cellAdress(row, col).empty()
                    }
                    else if (cellAdress(row, col).text() == cellAdress((row + 1), col).text()) {
                        var produit = parseInt(cellAdress(row, col).text()) * 2

                        cellAdress((row + 1), col).text(produit)
                        cellAdress(row, col).empty()
                    }
                }
            }
        }
    }

/*-------------------------------------------
----FONCTIONS DE MODIFICATION DE CELLULES----
-------------------------------------------*/
    function fillInCell(size, nbr_de_cell_a_fillIn)
    {
        var b = 0;

        while (b < nbr_de_cell_a_fillIn) {
            var random_cell = $("#" + randomCell(size) + "")
            var random_number = randomNumber()

            if (random_cell.text() == "") {
                random_cell.text(random_number)
                b++;
            }
        }
    }

    function cellIsEmpty(size, empty_full) // return tab id sauf pour "both", renvoi tab = value des id
    {
        var sizeSquare = size*size;
        var g = 1;
        var tab_empty_cell = [];
        var tab_full_cell = [];
        var tab_value = [];

        while (g <= sizeSquare) {
            if ($("#"+ g +"").text() == "") {
                tab_empty_cell.push(g);
                g++;
            }
            else if ($("#"+ g +"").text() != ""){
                tab_full_cell.push(g);
                g++;
            }
            if (empty_full == "both") {
                tab_value.push($("#"+ g +"").text())
            }
        }

        if (empty_full == "empty") {
            return tab_empty_cell;
        }
        else if (empty_full == "full") {
            return tab_full_cell;
        }
        else if (empty_full == "both") {
            return tab_value;
        }
    }

/*-------------------------------
----FONCTION INIT/PLAY DU JEU----
-------------------------------*/
    $.fn.start2048 = function () {
        var size = $('#size').val()
        var index = 1;

        $(this).empty()
        $(this).append("<div id='grid'></div>")

        for (var x = 0; x < size; x++) {
            $("#grid").append("<div class='grid_row' id='row" + x + "'></div>")
            
            for (var y = 0; y < size; y++) {
                $("#row" + x + "").append("<div class='grid_cell' id='"+ index + "' row='" + x + "' col='" + y + "'></div>");
                index++;
            }
        }

        $("#startButt").text("New Game")
        $("#grid_cell").empty()

        fillInCell(size, 2)

        $(document).keydown(function(e) {
            var move = false
            if (e.which == 37) {
                var tab_before = cellIsEmpty(size, "both")
                goLeft(size)
                var tab_after = cellIsEmpty(size, "both")
                if (JSON.stringify(tab_before) != JSON.stringify(tab_after)) {
                    move = true;
                }
            }
            else if (e.which == 38) {
                var tab_before = cellIsEmpty(size, "both")
                goUp(size)
                var tab_after = cellIsEmpty(size, "both")
                if (JSON.stringify(tab_before) != JSON.stringify(tab_after)) {
                    move = true;
                }
            }
            else if (e.which == 39) {
                var tab_before = cellIsEmpty(size, "both")
                goRight(size)
                var tab_after = cellIsEmpty(size, "both")
                if (JSON.stringify(tab_before) != JSON.stringify(tab_after)) {
                    move = true;
                }
            }
            else if (e.which == 40) {
                var tab_before = cellIsEmpty(size, "both")
                goDown(size)
                var tab_after = cellIsEmpty(size, "both")
                if (JSON.stringify(tab_before) != JSON.stringify(tab_after)) {
                    move = true;
                }
            }
            if (move) {
                fillInCell(size, 1)
            }
        })
    }

/*-----------------------------------
----FONCTION BASICS/NON UTILISEES----
-----------------------------------*/

    // function goLeft()
    // {
        // for (u = 0; u <= 3; u++) {
        //     for (i = 3; i >= 0; i--) {
        //         if ($("[row=" + u + "][col=" + i + "]").text() == ""){
        //             $("[row=" + u + "][col=" + i + "]").text($("[row=" + u + "][col=" + (i + 1) + "]").text())
        //             $("[row=" + u + "][col=" + (i + 1) + "]").empty()
        //         }
        //         else if ($("[row=" + u + "][col=" + i + "]").text() == $("[row=" + u + "][col=" + (i + 1) + "]").text()) {
        //             var produit = parseInt($("[row=" + u + "][col=" + i + "]").text()) + parseInt($("[row=" + u + "][col=" + (i + 1) + "]").text())

        //             $("[row=" + u + "][col=" + i + "]").text(produit)
        //             $("[row=" + u + "][col=" + (i + 1) + "]").empty()
        //         }
        //     }
        // }
    // }
    // function goRight()
    // {
        // for (u = 0; u <= 3; u++) {
        //     for (i = 0; i < 3; i++) {
        //         if ($("[row=" + u + "][col=" + (i + 1) + "]").text() == ""){
        //             $("[row=" + u + "][col=" + (i + 1) + "]").text($("[row=" + u + "][col=" + i + "]").text())
        //             $("[row=" + u + "][col=" + i + "]").empty()
        //         }
        //         else if ($("[row=" + u + "][col=" + i + "]").text() == $("[row=" + u + "][col=" + (i + 1) + "]").text()) {
        //             var produit = parseInt($("[row=" + u + "][col=" + i + "]").text()) + parseInt($("[row=" + u + "][col=" + (i + 1) + "]").text())

        //             $("[row=" + u + "][col=" + (i + 1) + "]").text(produit)
        //             $("[row=" + u + "][col=" + i + "]").empty()
        //         }
        //     }
        // }
    // }
    // function goUp()
    // {
        // for (u = 0; u <= 3; u++) {
        //     for (i = 3; i >= 0; i--) {
        //         if ($("[row=" + i + "][col=" + u + "]").text() == ""){
        //             $("[row=" + i + "][col=" + u + "]").text($("[row=" + (i + 1) + "][col=" + u + "]").text())
        //             $("[row=" + (i + 1) + "][col=" + u + "]").empty()
        //         }
        //         else if ($("[row=" + i + "][col=" + u + "]").text() == $("[row=" + (i + 1) + "][col=" + u + "]").text()) {
        //             var produit = parseInt($("[row=" + i + "][col=" + u + "]").text()) + parseInt($("[row=" + (i + 1) + "][col=" + u + "]").text())

        //             $("[row=" + i + "][col=" + u + "]").text(produit)
        //             $("[row=" + (i + 1) + "][col=" + u + "]").empty()
        //         }
        //     }
        // }
    // }
    // function goDown()
    // {
        // for (u = 0; u <= 3; u++) {
        //     for (i = 0; i < 3; i++) {
        //         if ($("[row=" + (i + 1) + "][col=" + u + "]").text() == ""){
        //             $("[row=" + (i + 1) + "][col=" + u + "]").text($("[row=" + i + "][col=" + u + "]").text())
        //             $("[row=" + i + "][col=" + u + "]").empty()
        //         }
        //         else if ($("[row=" + i + "][col=" + u + "]").text() == $("[row=" + (i + 1) + "][col=" + u + "]").text()) {
        //             var produit = parseInt($("[row=" + i + "][col=" + u + "]").text()) + parseInt($("[row=" + (i + 1) + "][col=" + u + "]").text())

        //             $("[row=" + (i + 1) + "][col=" + u + "]").text(produit)
        //             $("[row=" + i + "][col=" + u + "]").empty()
        //         }
        //     }
        // }
    // }

// })
    // function id_gen(size) {
    //     var d = 0;
    //     var u = 0;
    //     var sizeSquare = size * size;
    //     var tab_id = [];
    //     var id = [];
    
    //     for (var i = 0; i < sizeSquare; i++) {
    //         u++;
    //         if (u > 9) {
    //             u = 0;
    //             d++;
    //         }
    //         id = "" + d + u;
    //         tab_id.push(parseInt(id));
    //     }
    //     return tab_id;
    // }
})(jQuery)