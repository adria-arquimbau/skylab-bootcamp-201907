/**
 * Flattern an array (matrix) to the given depth.
 * @param {Array} array The array to flatter
 * @param {number} depth The level to reach in the flatern.
 * 
 * @throws {TypeError} When input is not an array. 
 * 
 * @return {Array} A new array with the flattened original array.
 */

function flat(array, depth) {
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');

    var depth = arguments[1];
    depth = typeof depth === 'undefined' ? 1 : depth;
    depth = depth < 0? 0 : depth;

    var result = [];

    for (var i = 0; i < array.length; i++) {
        var element = array[i];

        if (element instanceof Array && depth > 0) {
            var arr = flat(element, depth - 1);

            for (var j = 0; j < arr.length; j++) result.push(arr[j]);
        } else result.push(element);
    }

    return result;
}