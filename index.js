'use-strict';
/*jslint node: true*/

class EnumSetIterator {
  constructor(e, kind){
    this.index = 0;
    this.enumSet = e;
    this.IteratorKind = kind;
  }

  next(){
    while(this.index < 32 && this.enumSet.num&(1<<this.index)===0){
      this.index++;
    }
    let result;
    if (this.enumSet.num&(1<<this.index)){
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
    this.num = 0;
    this.size = 0;
    if (list){
      for (let i = 0; i < list.length; i++){
        let n = list[i];
        this.add(n);
      }
    }
  }

  has(value){
    if (value > 31){
      throw new Error("Cannot accurately determine if number greater than 31 is in EnumSet");
    }
    return (this.num&(1<<value))!==0;
  }

  add(value){
    if (!Number.isInteger(value)){
      throw new Error("List must contain only numbers");
    }
    if (value < 0){
      throw new Error("Number cannot be less than 0");
    }
    if (value > 31){
      throw new Error("Number cannot be greater than 31");
    }
    if ((this.num&(1<<value))===0){
      this.size++;
    }
    this.num = this.num | 1<<value;
    return this;
  }

  clear(){
    this.num = 0;
    this.size = 0;
  }

  delete(value){
    let ans = this.has(value);
    this.num = this.num&~(1<<value);
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
