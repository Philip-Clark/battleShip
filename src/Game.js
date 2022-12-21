const Game = (players = []) => {
  const choices = [];
  const setPlayerChoice = (index, choice) => {
    choices[index] = choice;
  };

  const playRound = () => {
    choices.forEach((choice, index) => {
      players[index].attack(choice);
    });
  };

  return { setPlayerChoice, playRound };
};

module.exports = Game;
