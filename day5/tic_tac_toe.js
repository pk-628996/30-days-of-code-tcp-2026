document.addEventListener("DOMContentLoaded", () => {
    const cross = "cross.png";
    const O_shunya = "O_shunya.png";

    const matrix = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];

    let last_one = "cross"; 

    const checkWinner = () => {
        for (let i = 0; i < 3; i++) {
            if (matrix[i][0] && matrix[i][0] === matrix[i][1] && matrix[i][0] === matrix[i][2]) return matrix[i][0];
            if (matrix[0][i] && matrix[0][i] === matrix[1][i] && matrix[0][i] === matrix[2][i]) return matrix[0][i];
        }
        if (matrix[0][0] && matrix[0][0] === matrix[1][1] && matrix[0][0] === matrix[2][2]) return matrix[0][0];
        if (matrix[0][2] && matrix[0][2] === matrix[1][1] && matrix[0][2] === matrix[2][0]) return matrix[0][2];
        return null;
    };

    // New logic to check if the board is full
    const isTie = () => {
        return matrix.every(row => row.every(cell => cell !== null));
    };

    document.querySelectorAll(".OorX").forEach((div, index) => {
        let inpt = div.querySelector("input");
        let img = div.querySelector("img");
        let turn_img = document.querySelector("#turn_img");
        div.addEventListener('click', () => {
            if (inpt.value !== "2") return;

            let current_turn = (last_one === "cross") ? "O_shunya" : "cross";
            
            if (current_turn === "O_shunya") {
                img.src = O_shunya;
                turn_img.src= cross;
                inpt.value = "O_shunya";
            } else {
                img.src = cross;
                turn_img.src= O_shunya;
                inpt.value = "cross";
            }

            let r = Math.floor(index / 3);
            let c = index % 3;
            matrix[r][c] = inpt.value;
            last_one = inpt.value;

            let winner = checkWinner();
            let statusDisplay = document.getElementById("animate_win");

            if (winner) {
                let img_ = winner === "cross" ? cross : O_shunya;
                let html = `<div id="win_popup"><img src=${img_}><p>Wins!!!</p></div>`
                document.querySelector("#hero_content").innerHTML = html
                
            } else if (isTie()) {
                let html = `<div id="win_popup"><p>Its a Tie!!! RESET Game</p></div>`
                document.querySelector("#hero_content").innerHTML = html
            }
        });
    });
});
