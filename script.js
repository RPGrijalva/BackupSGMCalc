let figherDisplay = false;
let moveDisplay = true;
let currentItem;
let pastMoves = [];

function addCommas(intNum) {
  return (intNum + '').replace(/(\d)(?=(\d{3})+$)/g, '$1,');
}

//calculate cost of moves
function calculate() {
  let current = document.getElementById('move-current-level').value;
  let desired = document.getElementById('move-desired-level').value;

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
      currentItem = total;
      pastMoves.unshift(total);
  } else {
      document.getElementById('move-calculate').innerHTML = 'This move has met its goal';
  }
  

  document.getElementById('past-items').innerHTML = 'You will need ' + addCommas(pastMoves.reduce((total, item) => total + item)) + ' coins to finish your investments.';

  document.getElementById('individual-items').innerHTML = 'Past moves: <br/>' + (pastMoves.map((item) => addCommas(item.toString())).join("<br/>") + '<br/>');
}

function setValue(thing) {
  if (thing.value > thing.max) {
    thing.value = Math.min(thing.value, thing.max);
  }

  if (thing.value < 1) {
    thing.value = Math.max(thing.value, 1);
  }
}

let fight = document.getElementById('fighters');
let move = document.getElementById('moves');
//show moves
function showMoves() {  
  if (fight.style.display === 'none'){
    
  } else {
    move.style.display  = 'block';
    fight.style.display = 'none';
  }
};

function showFighters() {
  if (move.style.display === 'none'){
    
  } else {
    fight.style.display = 'block';
    move.style.display = 'none';
  }
};

function changeTier() {
  let triangle = document.getElementsByClassName('triangle');
  let rarity = document.querySelector('input[name="fighter-rarity"]:checked').value
    for (let i = 0; i < triangle.length; i++) {
    switch(rarity) {
      case 'bronze':
        triangle[i].style.borderColor = "#883922 transparent transparent transparent";
        break;
      case 'silver':
        triangle[i].style.borderColor = "#C3C6D3 transparent transparent transparent";
        break;
      case 'gold':
        triangle[i].style.borderColor = "#9D681D transparent transparent transparent";
        break;
      case 'diamond':
        triangle[i].style.borderColor = "rgb(187 106 187) transparent transparent transparent";
        break;
    }
  }

  let min1 = document.getElementById('start-input');
  let min2 = document.getElementById('level-start')
  let max1 = document.getElementById('max-input');
  let max2 = document.getElementById('level-max');

  if (rarity === 'bronze') {
    min1.max = 30;
    min2.max = 30;
    max1.max = 30;
    max2.max = 30;
  } else if (rarity === 'silver') {
    min1.max = 40;
    min2.max = 40;
    max1.max = 40;
    max2.max = 40;
  } else if (rarity === 'gold') {
    min1.max = 50;
    min2.max = 50;
    max1.max = 50;
    max2.max = 50;
  } else if (rarity === 'diamond') {
    min1.max = 60;
    min2.max = 60;
    max1.max = 60;
    max2.max = 60;
  }

  setValue(min1);
  setValue(min2);
  setValue(max1);
  setValue(max2);
}

function findEXP() {
  const tier = document.querySelector('input[name="fighter-rarity"]:checked').value;
  let arr;
  switch (tier) {
    case 'bronze':
      arr = bronzeEXP;
      break;
    case 'silver':
      arr = silverEXP;
      break;
    case 'gold':
      arr = goldEXP;
      break;
    case 'diamond':
      arr = diamondEXP;
      break;
  }
  let shiny = 1;
  if (document.getElementById('shiny').checked) {
    shiny = 2;
  }

  let lowerVal = document.getElementById('level-start').value;
  let upperVal = document.getElementById('level-max').value;

  let result = Math.ceil(arr[upperVal-1] / shiny) - Math.ceil(arr[lowerVal-1] / shiny);

  document.getElementById('exp-calculate').innerHTML = `You will need ${addCommas(result)} exp for this fighter`
}

function isChecked(thing) {
  return thing.checked;
}

function selectAll(tree) {
  let ability = document.querySelectorAll('.ability');
  let attack = document.querySelectorAll('.attack');
  let moves = document.querySelectorAll('.moves');
  let health = document.querySelectorAll('.health');
  let energy = document.querySelectorAll('.energy');
  let all = document.querySelectorAll('.ability, .attack, .moves, .health, .energy');

  if (tree === 'ability') tree = ability;
  if (tree === 'attack') tree = attack;
  if (tree === 'moves') tree = moves;
  if (tree === 'health') tree = health;
  if (tree === 'energy') tree = energy;
  if (tree === 'all')  tree = all;

  let num = tree.length; 
  let checked = 0;

  for (let skill in tree) {
    if (tree[skill].checked) {
      checked += 1;
    }
  }

  
  if (checked >= tree.length) {
    for (let i = 0; i < tree.length; i++) {
      tree[i].checked = false;
    }
  } else {
      for (let i = 0; i < tree.length; i++) {
      tree[i].checked = true;
    }
  }
  fighterCost();
}

let multi;
//calc fighter cost
function fighterCost() {
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
  }
  let abil3 = document.querySelectorAll('.ability3:checked').length
  let abil2 = document.querySelectorAll('.ability2:checked').length
  let abil1 = document.querySelectorAll('.ability1:checked').length
  let abil0 = document.querySelectorAll('.ability0:checked').length

  let move3 = document.querySelectorAll('.move3:checked').length
  let move2 = document.querySelectorAll('.move2:checked').length
  let move1 = document.querySelectorAll('.move1:checked').length
  let move0 = document.querySelectorAll('.move0:checked').length

  let oth3  = document.querySelectorAll('.other3:checked').length
  let oth2  = document.querySelectorAll('.other2:checked').length
  let oth1  = document.querySelectorAll('.other1:checked').length
  let oth0  = document.querySelectorAll('.other0:checked').length

  let shiny = 1;

  if (document.getElementById('shiny').checked) {
    shiny = 2;
  }

  let marqueeCoins = 0;
  let marqueePoints = 0;

  if (document.getElementById('marquee').checked) {
    marqueeCoins = 50000;
    marqueePoints = 50;
  }

  marqueePoints += 50 * document.getElementById('maLevels').value;

  let coins = 0;
  let sp = 0;

  coins = (
    (abil0 * (fighterCoins.ability[0] / shiny))+ 
    (abil1 * (fighterCoins.ability[1] / shiny))+ 
    (abil2 * (fighterCoins.ability[2] / shiny))+ 
    (abil3 * (fighterCoins.ability[3] / shiny))+ 
    (move0 * (fighterCoins.move[0]    / shiny))+ 
    (move1 * (fighterCoins.move[1]    / shiny))+ 
    (move2 * (fighterCoins.move[2]    / shiny))+ 
    (move3 * (fighterCoins.move[3]    / shiny))+ 
    (oth0  * (fighterCoins.other[0]   / shiny))+ 
    (oth1  * (fighterCoins.other[1]   / shiny))+ 
    (oth2  * (fighterCoins.other[2]   / shiny))+ 
    (oth3  * (fighterCoins.other[3]   / shiny)) 
    + (marqueeCoins / shiny)) * 
    multi;

  sp = (
    (abil0 * Math.ceil(fighterPoints.ability[0] / shiny)) + 
    (abil1 * Math.ceil(fighterPoints.ability[1] / shiny)) + 
    (abil2 * Math.ceil(fighterPoints.ability[2] / shiny)) + 
    (abil3 * Math.ceil(fighterPoints.ability[3] / shiny)) + 
    (move0 * Math.ceil(fighterPoints.move[0]    / shiny)) + 
    (move1 * Math.ceil(fighterPoints.move[1]    / shiny)) + 
    (move2 * Math.ceil(fighterPoints.move[2]    / shiny)) + 
    (move3 * Math.ceil(fighterPoints.move[3]    / shiny)) + 
    (oth0  * Math.ceil(fighterPoints.other[0]   / shiny)) + 
    (oth1  * Math.ceil(fighterPoints.other[1]   / shiny)) + 
    (oth2  * Math.ceil(fighterPoints.other[2]   / shiny)) + 
    (oth3  * Math.ceil(fighterPoints.other[3]   / shiny))
    + (marqueePoints / shiny)) * 
    multi;
  
  document.getElementById('current-cost').innerHTML = `This fighter will cost ${addCommas(coins)} coins and ${addCommas(sp)} points.`;

};

//store cost of moves and coins
const moves = [
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
  
const fighterCoins = {
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

const fighterPoints = {
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


const bronzeEXP = [
  0,
  100,
  250,
  409,
  909,
  1439,
  2001,
  2597,
  3229,
  3899,
  5399,
  6990,
  8677,
  10466,
  12363,
  14375,
  16509,
  18772,
  21172,
  23717,
  26717,
  29898,
  33271,
  36848,
  40641,
  44663,
  48928,
  53541,
  58248,
  63335,
]

const silverEXP = [
  0,
  500,
  1250,
  2061,
  4561,
  7265,
  10189,
  13351,
  16771,
  20470,
  27970,
  36081,
  44853,
  54340,
  64600,
  75696,
  87696,
  100674,
  114710,
  129890,
  144890,
  161112,
  178656,
  197630,
  218150,
  240342,
  264343,
  290300,
  318372,
  348732,
  378732,
  411177,
  446266,
  484215,
  525257,
  569644,
  617649,
  669566,
  725714,
  786438,
]

const goldEXP = [
  0,
  1000,
  2500,
  4154,
  9154,
  14666,
  20743,
  27443,
  34830,
  42974,
  57974,
  74511,
  92743,
  112844,
  135005,
  159437,
  186373,
  216070,
  248811,
  284908,
  314908,
  347983,
  384448,
  424651,
  468975,
  517842,
  571718,
  631116,
  696602,
  768800,
  828800,
  894950,
  967880,
  1048285,
  1136932,
  1234665,
  1342416,
  1461211,
  1592182,
  1736578,
  1886578,
  2051953,
  2234279,
  2435293,
  2656911,
  2901245,
  3170623,
  3467612,
  3795042,
  4156034,
]

const diamondEXP = [
  0,
  2000,
  5000,
  8370,
  18370,
  29605,
  42228,
  56410,
  72343,
  90244,
  120244,
  153949,
  191817,
  234362,
  282161,
  335863,
  396197,
  463982,
  540138,
  625699,
  685699,
  753109,
  828844,
  913932,
  1009528,
  1116930,
  1237596,
  1373164,
  1525475,
  1696596,
  1816596,
  1951416,
  2102886,
  2273063,
  2464257,
  2679063,
  2920398,
  3191538,
  3496164,
  3838411,
  4138411,
  4475461,
  4854137,
  5279579,
  5757563,
  6294578,
  6897914,
  7575762,
  8337324,
  9192939,
  10154222,
  11234224,
  12447606,
  13810841,
  15342435,
  17063181,
  18996439,
  21168454,
  23608713,
  26350344,
]
