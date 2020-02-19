import shortid from 'shortid';

/**
 * @description Registry for all controlled DOM elements.
 *    The registry generates a short unique id for every key.
 */
class ElementRegistry {
  // Element key and unique short id map, e.g. { Banner0_0-button: "QhLoiEZwwRx" }
  map = {}

  // Reverse map of `map` for convenience, e.g. { QhLoiEZwwRx: "Banner0_0-button" }
  reverseMap = {}

  // register or return existing id
  register = (key) => {
    if (!this.map[key]) {
      this.map[key] = shortid.generate();
      this.reverseMap[this.map[key]] = key;
    }

    return this.map[key];
  }

  getId = (key) => {
    return this.map[key];
  }

  getDOM = (key) => {
    const id = this.getId(key);
    return id ? document.getElementById(id) : undefined;
  }

  getKey = (id) => {
    return this.reverseMap[id];
  }
}

const elementRegistry = new ElementRegistry();

export default elementRegistry;
