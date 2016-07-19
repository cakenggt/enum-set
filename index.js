'use-strict';
/*jslint node: true*/

class EnumSetIterator {
  constructor(e, kind){
    this.index = 0;
    this.enumSet = e;
    this.IteratorKind = kind;
  }

  next(){
    while(Math.floor(this.index/32) <= this.enumSet.numList.length &&
          (this.enumSet.numList[Math.floor(this.index/32)]&(1<<this.index%32))===0){
      this.index++;
    }
    let result;
    if (this.enumSet.numList[Math.floor(this.index/32)]&(1<<this.index%32)){
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
    this.numList = [];
    this.size = 0;
    if (list){
      for (let i = 0; i < list.length; i++){
        let n = list[i];
        this.add(n);
      }
    }
  }

  has(value){
    let index = Math.floor(value/32);
    if (index >= this.numList.length){
      return false;
    }
    return (this.numList[index]&(1<<value%32))!==0;
  }

  add(value){
    if (!Number.isInteger(value)){
      throw new Error("List must contain only numbers");
    }
    if (value < 0){
      throw new Error("Number cannot be less than 0");
    }
    let index = Math.floor(value/32);
    let numVal = this.numList[index];
    let mask = 1<<value%32;
    if ((numVal&mask)===0){
      this.size++;
    }
    this.numList[index] = numVal | mask;
    return this;
  }

  clear(){
    this.numList = [];
    this.size = 0;
  }

  delete(value){
    let ans = this.has(value);
    let index = Math.floor(value/32);
    this.numList[index] = this.numList[index]&~(1<<value%32);
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
