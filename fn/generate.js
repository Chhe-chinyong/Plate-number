module.exports = function gernate(name) {
  const len = name.length;

  //check 1111
  if (name[0] == name[1]) {
    for (var j = 2; j < len - 1; j++) {
      if (name[0] == name[j]) {
        j++;
      } else {
        break;
      }
      return 1000;
    }
  }
  //check if (name)
};
