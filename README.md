# Iowa Gambling Task

You can try Psychophysics experiments on the web.

https://keigom.github.io/The_Iowa_Gambling_Task/

The objective of the experiments is to estimate the 

## Task
There were 4 decks of cards (A, B, C, and D.)
Participants had to choose several cards, one at the time.
Each time they choose a card, they get feedback about winning and/or loosing some money.
Participants did not know what each card would yield in advance (i.e., like a lottery.)
Participants started with a "loan" of of $2000 and were told to make a profit.

## CSV values
Deck, Result, Total Profit
Block, Net Score

## Running Locally
Install dependencies and start the server:

```bash
npm install
npm start
```
Then open `http://localhost:3000` in your browser.


## Craps Monte Carlo Simulation
`craps_monte_carlo.js` estimates expected profit for the following strategy on a $5 minimum table:

- Pass Line: $5
- Come: $5 (keep one active come cycle)
- Odds: 3-4-5x (Las Vegas Strip style)
  - 4/10: 3x
  - 5/9: 4x
  - 6/8: 5x
- Place 6: $5
- Place 8: $5

Assumptions in the simulation:
- Place 6/8 are working only when the point is ON.
- Come bet is OFF on the come-out roll.
- Profit is tracked per shooter (from first come-out until seven-out).

Run:

```bash
node craps_monte_carlo.js 1000000
```

Example output:

```json
{
  "numShooters": 300000,
  "totalProfit": -612557.5000000854,
  "totalRolls": 2556102,
  "averageProfitPerShooter": -2.041858333333618,
  "averageProfitPerRoll": -0.23964517065441263,
  "averageProfitPer100Rolls": -23.964517065441264
}
```
