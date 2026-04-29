function rollDice() { return 1 + Math.floor(Math.random() * 6) + 1 + Math.floor(Math.random() * 6); }

const MIN = 5;
const PASS = MIN;
const COME = MIN;
const PLACE6 = MIN;
const PLACE8 = MIN;

const maxOdds = (p) => (p === 4 || p === 10 ? 3 : p === 5 || p === 9 ? 4 : 5);
const oddsWin = (p, b) => (p === 4 || p === 10 ? 2 * b : p === 5 || p === 9 ? 1.5 * b : 1.2 * b);

function simulateShooter() {
  let profit = 0;
  let rolls = 0;

  let tablePoint = null;
  let passPoint = null;
  let passOdds = 0;

  let comePoint = null;
  let comeOdds = 0;

  while (true) {
    const d = rollDice();
    rolls += 1;

    if (tablePoint === null) {
      profit -= PASS;
      if (d === 7 || d === 11) {
        profit += 2 * PASS;
      } else if (d === 2 || d === 3 || d === 12) {
        // lose pass
      } else {
        tablePoint = d;
        passPoint = d;
        passOdds = PASS * maxOdds(d);
        profit -= passOdds;
      }
      continue;
    }

    // resolve existing line/come/place bets on point-on roll
    if (d === 7) {
      profit -= PLACE6 + PLACE8;
      break;
    }

    if (d === passPoint) {
      profit += 2 * PASS;
      profit += passOdds + oddsWin(passPoint, passOdds);
      tablePoint = null;
      passPoint = null;
      passOdds = 0;
    }

    if (comePoint !== null && d === comePoint) {
      profit += 2 * COME;
      profit += comeOdds + oddsWin(comePoint, comeOdds);
      comePoint = null;
      comeOdds = 0;
    }

    if (d === 6) profit += PLACE6 * (7 / 6);
    if (d === 8) profit += PLACE8 * (7 / 6);

    // place a fresh come bet each point-on roll when no established come point
    if (tablePoint !== null && comePoint === null) {
      profit -= COME;
      if (d === 7 || d === 11) {
        profit += 2 * COME;
      } else if (d === 2 || d === 3 || d === 12) {
        // lose come
      } else {
        comePoint = d;
        comeOdds = COME * maxOdds(d);
        profit -= comeOdds;
      }
    }
  }

  return { profit, rolls };
}

function simulate(n) {
  let p = 0, r = 0;
  for (let i = 0; i < n; i++) {
    const s = simulateShooter();
    p += s.profit; r += s.rolls;
  }
  return {
    numShooters: n,
    totalProfit: p,
    totalRolls: r,
    averageProfitPerShooter: p / n,
    averageProfitPerRoll: p / r,
    averageProfitPer100Rolls: (p / r) * 100,
  };
}

const n = Number(process.argv[2] || 1000000);
console.log(JSON.stringify(simulate(n), null, 2));
