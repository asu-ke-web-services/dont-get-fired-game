Utils = typeof Utils === 'undefined' ? {} : Utils;

Utils.Random = {
  pick: function (arr) {
    if (! (arr instanceof Array)) {
      throw new Error('You must provide an array to Utils.Random.pick');
    }

    if (arr.length === 0) {
      return null;
    }

    return arr[Math.floor(Math.random() * arr.length)];
  }
}
