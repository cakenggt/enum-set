const EnumSet = require('./index');
const expect = require('chai').expect;

describe('speed tests', function(){
  it('has', function(){
    let l = [0,1,2,3,4,5];
    let s = new Set(l);
    let e = new EnumSet(l);
    let iterations = 10000000;
    let method = 'has';
    expect(methodTest(s, method, iterations)).to.be.gt(methodTest(e, method, iterations));
  });
  it('add', function(){
    let s = new Set();
    let e = new EnumSet();
    let iterations = 1000000;
    let method = 'add';
    expect(methodTest(s, method, iterations)).to.be.gt(methodTest(e, method, iterations));
  });
});
describe('accuracy tests', function(){
  it('has', function(){
    let l = [0,1,2,3,4,5];
    let s = new Set(l);
    let e = new EnumSet(l);
    fullValueTest(s, e);
  });
  it('size', function(){
    let l = [0,1,2,3,4,5];
    let s = new Set(l);
    let e = new EnumSet(l);
    expect(s.size).to.equal(e.size);
    s.delete(1);
    e.delete(1);
    expect(s.size).to.equal(e.size);
    s.delete(15);
    e.delete(15);
    expect(s.size).to.equal(e.size);
  });
  it('clear', function(){
    let l = [0,1,2,3,4,5];
    let s = new Set(l);
    let e = new EnumSet(l);
    fullValueTest(s, e);
    s.clear();
    e.clear();
    fullValueTest(s, e);
  });
  it('delete', function(){
    let l = [0,1,2,3,4,5];
    let s = new Set(l);
    let e = new EnumSet(l);
    expect(s.delete(1)).to.equal(e.delete(1));
    expect(s.delete(4)).to.equal(e.delete(4));
    expect(s.delete(15)).to.equal(e.delete(15));
    fullValueTest(s, e);
  });
  it('values', function(){
    let l = [0,1,2,3,4,5];
    let s = new Set(l).values();
    let e = new EnumSet(l).values();
    let next = s.next();
    while (!next.done){
      let eValue = e.next().value;
      expect(next.value).to.equal(eValue);
      next = s.next();
    }
  });
});

function methodTest(tested, method, iterations){
  let start = new Date();
  for (let i = 0; i < iterations; i++){
    let num = Math.floor(Math.random()*31);
    tested[method](num);
  }
  return new Date()-start;
}

function fullValueTest(s, e){
  for (let i = 0; i < 32; i++){
    expect(s.has(i)).to.equal(e.has(i));
  }
}
