function makeCounter(noun) {
  var count = 0;
  return function(){
    count += 1;
    return count + ' ' + noun;
  }
}