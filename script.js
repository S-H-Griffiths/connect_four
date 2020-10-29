(function () {
    var currentPlayer = "player1";
    var victory = $(".victory");
    var countplayer1 = localStorage.getItem("score player1");
    var countplayer2 = localStorage.getItem("score player2");
    var coin1 = $("#coin1");
    var coin2 = $("#coin2");
    var reset = $(".reset");

    coin1.html(localStorage.getItem("score player1"));
    coin2.html(localStorage.getItem("score player2"));

    // reset score button
    $(".reset").on("click", function () {
        console.log("click reset button");
        countplayer1 = 0;
        countplayer2 = 0;
        localStorage.setItem("score player1", countplayer1);
        localStorage.setItem("score player2", countplayer2);
        coin1.html(localStorage.getItem("score player1"));
        coin2.html(localStorage.getItem("score player2"));
    });

    $(".column").on("click", function (e) {
        var col = $(e.currentTarget);
        var slotsInCol = col.children();
        for (var i = slotsInCol.length - 1; i >= 0; i--) {
            var hasPlayer1 = slotsInCol.eq(i).hasClass("player1");
            var hasPlayer2 = slotsInCol.eq(i).hasClass("player2");
            if (!hasPlayer1 && !hasPlayer2) {
                slotsInCol.eq(i).addClass(currentPlayer);
                break;
            }
        }

        var slotsInRow = $(".row" + i);

        //checks if the column is full
        if (i === -1) {
            return;
        }

        var rowIndex = i;
        var colIndex = col.index();

        // victory statement
        if (checkForVictory(slotsInCol)) {
            victory.prepend("<p> The winner is " + currentPlayer + "</p>");
            victory.addClass(currentPlayer);
            victory.css({
                visibility: "visible",
            });
            // coin
            if (currentPlayer === "player1") {
                countplayer1++;
            } else if (currentPlayer === "player2") {
                countplayer2++;
            }
            coin1.html(countplayer1);
            coin2.html(countplayer2);
            localStorage.setItem("score player1", countplayer1);
            localStorage.setItem("score player2", countplayer2);
            // slots.eq(i).addClass("winningSlot");
            // winningCoin.addClass("winningSlot");
            // slotsInCol.eq(i).addClass("winningSlot");
        } else if (checkForVictory(slotsInRow)) {
            victory.prepend("<p> The winner is " + currentPlayer + "</p>");
            victory.addClass(currentPlayer);
            victory.css({
                visibility: "visible",
            });
            if (currentPlayer === "player1") {
                countplayer1++;
            } else if (currentPlayer === "player2") {
                countplayer2++;
            }
            coin1.html(countplayer1);
            coin2.html(countplayer2);
            localStorage.setItem("score player1", countplayer1);
            localStorage.setItem("score player2", countplayer2);
            // slotsInRow.eq(i).addClass("winningSlot");
            // localStorage.setItem("winner", currentPlayer);
        } else if (checkForDiagonals(colIndex, rowIndex)) {
            victory.prepend("<p> The winner is " + currentPlayer + "</p>");
            victory.addClass(currentPlayer);
            victory.css({
                visibility: "visible",
            });
            if (currentPlayer === "player1") {
                countplayer1++;
            } else if (currentPlayer === "player2") {
                countplayer2++;
            }
            coin1.html(countplayer1);
            coin2.html(countplayer2);
            localStorage.setItem("score player1", countplayer1);
            localStorage.setItem("score player2", countplayer2);
        } else {
            switchPlayer();
        }
    });

    // create arrays for the diagonal
    function checkForDiagonals(colIndex, rowIndex) {
        var leftDiags = [];
        leftDiags.push(
            $(".column")
                .eq(colIndex - 3)
                .children()[rowIndex - 3]
        );
        leftDiags.push(
            $(".column")
                .eq(colIndex - 2)
                .children()[rowIndex - 2]
        );
        leftDiags.push(
            $(".column")
                .eq(colIndex - 1)
                .children()[rowIndex - 1]
        );
        leftDiags.push($(".column").eq(colIndex).children()[rowIndex]);
        leftDiags.push(
            $(".column")
                .eq(colIndex + 1)
                .children()[rowIndex + 1]
        );
        leftDiags.push(
            $(".column")
                .eq(colIndex + 2)
                .children()[rowIndex + 2]
        );
        leftDiags.push(
            $(".column")
                .eq(colIndex + 3)
                .children()[rowIndex + 3]
        );
        // second array for other direction
        var rightDiags = [];
        rightDiags.push(
            $(".column")
                .eq(colIndex + 3)
                .children()[rowIndex - 3]
        );
        rightDiags.push(
            $(".column")
                .eq(colIndex + 2)
                .children()[rowIndex - 2]
        );
        rightDiags.push(
            $(".column")
                .eq(colIndex + 1)
                .children()[rowIndex - 1]
        );
        rightDiags.push($(".column").eq(colIndex).children()[rowIndex]);
        rightDiags.push(
            $(".column")
                .eq(colIndex - 1)
                .children()[rowIndex + 1]
        );
        rightDiags.push(
            $(".column")
                .eq(colIndex - 2)
                .children()[rowIndex + 2]
        );
        rightDiags.push(
            $(".column")
                .eq(colIndex - 3)
                .children()[rowIndex + 3]
        );
        if (checkForVictory(leftDiags)) {
            return checkForVictory(leftDiags);
        } else {
            return checkForVictory(rightDiags);
        }
    }

    // check for victory.
    function checkForVictory(slots) {
        var count = 0;
        var winningCoin = [];
        for (var i = 0; i < slots.length; i++) {
            var slot = $(slots[i]);
            if (slot.hasClass(currentPlayer)) {
                count++;
                winningCoin.push(slot);
                if (count === 4) {
                    // $(winningCoin).children().addClass("winningSlot");
                    // console.log("winning Coin: ", winningCoin);
                    return true;
                }
            } else {
                count = 0;
                winningCoin = [];
                console.log("winning Coin: ", winningCoin);
            }
        }
    }

    // switch player
    function switchPlayer() {
        currentPlayer === "player1"
            ? (currentPlayer = "player2")
            : (currentPlayer = "player1");
    }

    // reset to play again
    $(document).ready(function () {
        $(".again").click(function () {
            location.reload(true);
        });
    });
})();
