'use-strict';
/*jslint node: true*/

class EnumSetIterator {
  constructor(e, kind){
    this.index = 0;
    this.enumSet = e;
    this.IteratorKind = kind;
  }

  next(){
    while(this.index < this.enumSet.bitVector.length &&
          !this.enumSet.has(this.index)){
      this.index++;
    }
    let result;
    if (this.enumSet.has(this.index)){
      if (this.IteratorKind == 'entries'){
        result = {
          value: [this.index, this.index],
          done: false
        };
      }
      else{
        result = {
          value: this.index,
          done: false
        };
      }
      this.index++;
    }
    else{
      result = {
        value: undefined,
        done: true
      };
    }
    return result;
  }
}

class EnumSet {
  constructor(list){
    this.bitVector = [];
    this.size = 0;
    if (list){
      for (let i = 0; i < list.length; i++){
        let n = list[i];
        this.add(n);
      }
    }
  }

  has(value){
    return this.bitVector[value]===true;
  }

  add(value){
    if (!Number.isInteger(value)){
      throw new Error("List must contain only numbers");
    }
    if (value < 0){
      throw new Error("Number cannot be less than 0");
    }
    if (!this.has(value)){
      this.size++;
    }
    this.bitVector[value] = true;
    return this;
  }

  clear(){
    this.bitVector = [];
    this.size = 0;
  }

  delete(value){
    let ans = this.has(value);
    this.bitVector[value] = false;
    if (ans){
      this.size--;
    }
    return ans;
  }

  entries(){
    return new EnumSetIterator(this, 'entries');
  }

  forEach(callbackFn, thisArg){
    let it = new EnumSetIterator(this);
    let next = it.next();
    while (!next.done){
      if (thisArg){
        callbackFn.call(thisArg, next.value);
      }
      else{
        callbackFn(next.value);
      }
      next = it.next();
    }
  }

  keys(){
    return new EnumSetIterator(this, 'keys');
  }

  values(){
    return new EnumSetIterator(this, 'values');
  }
}

module.exports = EnumSet;
