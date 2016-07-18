# EnumSet

EnumSet is a library which adds a class similar to Java's EnumSet, whose purpose
is to perform Set operations on enums faster than a normal Set would.

## Specification
**You can only put the numbers 0-31 in an EnumSet. This class is meant for integer-represented enums!**

### EnumSet

#### `size`
Gets the number of entries in the EnumSet.

#### `add(value)`
Adds the value to the EnumSet. Returns the EnumSet object.

#### `clear()`
Removes all elements from the EnumSet object.

#### `delete(value)`
Removes the value from the EnumSet, and returns a boolean representing whether or not the value was actually in the EnumSet.

#### `entries()`
Returns a new EnumSetIterator object that contains an array of `[value, value]` for each element in the EnumSet object. Insertion order is not preserved.

#### `forEach(callbackFn[, thisArg])`
Calls `callbackFn` once for each value present in the EnumSet. If a `thisArg` parameter is provided to `forEach`, it will be used as the `this` value for each callback.

#### `has(value)`
Returns a boolean asserting whether an element is present in this EnumSet object or not.

#### `keys()`
Is the same function as the `values()` function and returns a new `EnumSetIterator` object that contains the values for each element in the EnumSet.

#### `values()`
Returns a new `EnumSetIterator` object that contains the values for each element in the EnumSet.

### EnumSetIterator

#### `next()`
Gets the next entry, if it exists. The returned object is in the form `{value, done}` where `value` is specified in the method which returns this EnumSetIterator, or undefined if there are no more values, and `done` is a boolean which represents whether or not there are additional values in the EnumSet.
