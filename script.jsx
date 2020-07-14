
function calculate() {
  let current = document.getElementById('movecurrent').innerHTML;
  let desired = document.getElementById('movedesired').innerHTML;


  let multi;

  switch(document.querySelector('input[name="move-rarity"]:checked').value) {
    case 'bronze':
      multi = 1;
      break;
    case 'silver':
      multi = 2;
      break;
    case 'gold':
      multi = 5;
      break;
  }

  let intCurrent = parseInt(current);
  let intDesired = parseInt(desired);

  if (intCurrent < intDesired) {
      document.getElementById('move-calculate').innerHTML = 'This item needs ' + (moves[intDesired] - moves[intCurrent])*multi + ' coins';
  } else {
      document.getElementById('move-calculate').innerHTML = 'This move has met its goal';
  }
}

function fightCalculate() {
  
}

//store cost of different things
let moves = [
    0,
    0,
    750,    //750
    2000,   //1250
    4000,   //2000
    7000,   //3000
    12000,  //5000
    21000,  //9000
    36000,  //15000
    59000,  //23000
    92000,  //33000
    137000, //45000
    187000, //50000
    262000, //75000
    387000, //125000
    587000  //200000
  ]
  
  //let catalyst = moves.slice(0, 12);
  
let fighterCoins = {
  ability: [
    5000,
    8000,
    15000,
    20000
  ],
  move: [
    3000,
    5000,
    8000,
    15000
  ],
  other: [
    2000,
    3000,
    5000,
    8000
  ]
}

let fighterPoints = {
  ability: [
    3,
    4,
    5,
    5
  ],
  move: [
    2, 
    3,
    4,
    5
  ],
  other: [
    1,
    2,
    3,
    4
  ]
}