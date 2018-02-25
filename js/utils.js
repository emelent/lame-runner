/**
 * Select a random value from an array.
 * @param {Array} arr - Array
 */
const pickRandom = arr => arr[Math.floor(Math.random() * arr.length)]

/**
 * Returns a random integer within the mathematical scope [min, max)
 * @param {int} min - Minimum integer
 * @param {int} max - Maximum integer
 *
 * @return {int}
 */
const randomInteger = (min, max) => Math.floor(Math.random() * (max - min)) + min

