
/*
To handle difficulty and random order

--- based on difficulty we could create the mine map...beginner has one mine placed at a random spot, intermediate 3, hard 5
--- to flag can add new entry to data model and adjust paremeters and cases, simply updates that param on that object

hard set to 3, set to , 

iterate over that array and modify mine map, mine count is set
*/


const mine_count = 1
const mine_map = [0, 1, 0, 0, 0, 0, 0, 0, 0];
let n = 3;
let initial_board: any = [];
let starting_game_board: any = [];
let processed_board: any = [];
const win_count = n * n - mine_count
let opened = 0


/*
basically going to each neighbor and recursively calling the same algorithm
if this neighbor has no neighbors WITH a mine count
*/


function algorithm(position: number) {
  // this is not a mine! so proceed.
  // recursive base case
  if (processed_board[position].mine_neighbor_count) { return }
  // operate on game board objects by opening each neighbor and determining if it has a mine count
  processed_board[position].neighbor_listforEach((item: any, index: any) => {
    processed_board[item].is_open = true
    opened++
    algorithm(item)
  })
}



export default function game(position: any) {

  if (!position) {
    mine_map.forEach(item => {
      initial_board.push({
        is_open: false,
        is_mine: item ? true : false,
        mine_neighbor_count: null
      });
    });

    // next goal is to store the mine_neighbor_count

    initial_board.forEach((item: any, index: number) => {
      // check each neighbor, so lets first get the neighboring indexes.
      let neighbor_indexes = [];
      let d = n;

      for (let i = 0; i < 9; i++) {
        if (d === 0) {
          d = -1;
          continue;
        }
        let currentNeighborIndex = index - d - 1;
        neighbor_indexes.push(currentNeighborIndex);
        d = d - 1;
      }

      processed_board.push({
        is_open: item.is_open,
        is_mine: item.is_mine,
        mine_neighbor_count: 0,
        neighbor_list: neighbor_indexes
      });
    });

    processed_board.forEach(function (item: any) {
      let mine_count = 0
      item.neighbor_indexes.forEach(function (neighbor: any) {
        if (processed_board[neighbor].is_mine) {
          mine_count++
        }
      });

      starting_game_board.push({
        is_open: item.is_open,
        is_mine: item.is_mine,
        mine_neighbor_count: mine_count,
        neighbor_list: item.neighbor_indexes
      })
    })

    return processed_board

  } else {
    // modify board pieces
    if (processed_board[position].is_mine) { return 'GAME OVER' }
    processed_board[position].is_open = true
    opened++
    // if it is not a mine (1 update that position to is_open: true), and then proceed forward with algorithm
    const run = algorithm(position)
    if (opened = win_count) { return 'YOU WON' }
    return processed_board
  }
}