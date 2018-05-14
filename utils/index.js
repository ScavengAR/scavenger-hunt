const convertToTime = time => {
  let minutes = Math.floor(time / 60);
  let seconds = time - minutes * 60;
  seconds = seconds < 10 ? '0' + seconds : seconds; // displays seconds as two digits
  return `${minutes}:${seconds}`;
};

const skipTutorialNavigation = (navigation, title) => {
  const titles = ['Game Overview', 'How to Play', 'Mission'];
  if (titles.includes(title)) return navigation.navigate('Home');
  //once CreateCustomMap screen is complete navigate there
  else return navigation.navigate('GameOptionPage');
};

module.exports = {
  convertToTime,
  skipTutorialNavigation
};
