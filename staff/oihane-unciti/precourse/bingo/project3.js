var userName = ""

var carton = [];
var playing = ;
var rankingName=[];

var randomNumberArray=[];

newGame(true);

function imprimirCarton() {
    
    var cartonStr = " ------------------------\n";
    for (var i = 0; i < carton.length; i++) {
        for (var j = 0; j < carton[i].length; j++) {
            var numChars = carton[i][j].toString().length;
            if (numChars == 1) {
                cartonStr += "|  " + carton[i][j] + " ";
            } else {
                cartonStr += "| " + carton[i][j] + " ";
            }
        }
        cartonStr += "|\n";
        cartonStr += " ------------------------\n";

    }
    console.log(cartonStr);
}

function randomNumber(avoidNumbers) {

    var number = Math.floor((Math.random() * 50) + 1);
    while(avoidNumbers.includes(number)){
      number = Math.floor((Math.random() * 50) + 1);

    }
    return number;
}

function newTurn() {
    var numberTurn = 0;
    var cantadoLinea = false;
    var numberBingo=[];
    
    while (playing == true) {
        var numberX = 0;
        var numberLinea0 = 0;
        var numberArray=[];

        var continuePlaying = prompt("¿Desea continuar?y/n");

        if (continuePlaying == "y") {
            numberTurn += 1;
            var numberRan = randomNumber(numberBingo);
            numberBingo.push(numberRan);
            console.log("El número que ha salido ha sido: " + numberRan);

            
            for (var i = 0; i < carton.length; i++) {
                for (var j = 0; j < carton[i].length; j++) {
                    if (numberRan === carton[i][j]) {
                        carton[i][j] = "X";
                    }
                }
            }
           
            imprimirCarton();

            for (var i = 0; i < carton.length; i++) {
                numberLinea0 = 0;
                for (var j = 0; j < carton[i].length; j++) {
                    if (carton[i][j] === "X") {
                        numberX++;
                    }
                    if (cantadoLinea == false) {
                        if (carton[i][j] == "X") {
                            numberLinea0++;
                            if (numberLinea0 == 5) {
                                alert("Linea")
                                cantadoLinea = true;
                            }
                        }
                    }
               }
            }

            if (numberX == 15) {
                alert("BINGO");
                var rankingMarks= "";
                console.log("Numero de intentos " + numberTurn);
                rankingName.push({name:userName, puntos:numberTurn})
                for (var i = 0; i < rankingName.length; i++) {
                rankingMarks+= "Name: "+ rankingName[i].name+" - Puntuaciones: "+rankingName[i].puntos+"\n"
                 };
                 console.log("Las puntuaciones son:");
                 console.log(rankingMarks);

                var newPlay = prompt("Desea jugar de nuevo?y/n");
                if (newPlay == "y") {
                    newGame(true);
                }

            }

        } else {
            playing = false;
        }
    }
}

function generateBingoCard(){
 
  var auxBingoCard = [];
  var bingoCard = [
        [],
        [],
        [],
  ];
  
  for(var i=0; i<15;i++){
    var randomNumberCard = randomNumber(auxBingoCard);
     auxBingoCard.push(randomNumberCard);

  }
  auxBingoCard.sort((a, b) => a - b);

  bingoCard[0]=auxBingoCard.slice(0,5);
  bingoCard[1]=auxBingoCard.slice(5,10);
  bingoCard[2]=auxBingoCard.slice(10,15);

  return bingoCard;

}

function newGame(askForName) {
    var randomNumberCarton= [];

    playing = true;

    if(askForName){
      userName= prompt("Nombre");
      console.log("Bienvenido al bingo " + userName);
    }
     
     

    carton = generateBingoCard(); 


    console.log("Tu cartón es:");
    imprimirCarton();
    newBingocard();
    newTurn();
}

function newBingocard(){
  var newCard= prompt("New Bingo Card y/n");
  if(newCard=="y"){
    newGame(false);
  }
}
