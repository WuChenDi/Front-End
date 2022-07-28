interface Object {
  /**
   * Determines whether an object has a property with the specified name.
   * @param o An object.
   * @param v A property name.
   */
  hasOwn(o: object, v: PropertyKey): boolean;
}

{
  // Object.hasOwn() is intended as a replacement for Object.hasOwnProperty().
  // Object.hasOwn() 是作为 Object.hasOwnProperty() 的替代

  const object = {
    name: 'dd'
  }

  let hasOwnProperty = Object.prototype.hasOwnProperty

  console.log(hasOwnProperty.call(object, 'name')) // true

  console.log(Object.hasOwn(object, 'name')) // true

  console.log(Object.hasOwn(object, 'age')) // false
}
