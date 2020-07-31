
let figherDisplay = false;
let moveDisplay = true;

//calculate cost of moves
function calculate() {
  let current = document.getElementById('movecurrent').innerHTML;
  let desired = document.getElementById('movedesired').innerHTML;

  function addCommas(intNum) {
    return (intNum + '').replace(/(\d)(?=(\d{3})+$)/g, '$1,');
  }

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

  let total = ((moves[intDesired] - moves[intCurrent]) * multi);

  if (intCurrent < intDesired) {
      document.getElementById('move-calculate').innerHTML = 'This item needs ' + addCommas(total.toString()) + ' coins';
      pastMoves.unshift(total);
  } else {
      document.getElementById('move-calculate').innerHTML = 'This move has met its goal';
  }

  document.getElementById('past-items').innerHTML = 'You will need ' + addCommas(pastMoves.reduce((total, item) => total + item)) + ' coins to finish your investments.';

  document.getElementById('individual-items').innerHTML = 'Past moves: <br/>' + (pastMoves.map((item) => addCommas(item.toString())).join("<br/>") + '<br/>');
}

function fightCalculate() {
  function addCommas(intNum) {
    return (intNum + '').replace(/(\d)(?=(\d{3})+$)/g, '$1,');
  };

  let multi;

  switch(document.querySelector('input[name="fighter-rarity"]:checked').value) {
    case 'bronze':
      multi = 1;
      break;
    case 'silver':
      multi = 2;
      break;
    case 'gold':
      multi = 5;
      break;
    case 'diamond':
      multi = 10;
      break;
  };

  
}




let fight = document.getElementById('fighters');
let move = document.getElementById('moves');
//show moves
function showMoves() {  
    if (fight.style.display === 'none'){
      
    } else {
      move.style.display = 'block';
      fight.style.display = 'none';
    }
};

//change page to fighters display
function showFighers() {
  if (move.style.display === 'none'){
    
  } else {
    fight.style.display = 'block';
    move.style.display = 'none';
  }
};

//force input limits
function levelvalues() {
  if (this.value > this.max) {
    this.value = this.max;
  }
};

//store cost of moves and coins
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

let pastMoves = [];
