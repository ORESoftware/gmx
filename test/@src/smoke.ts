import suman, {s} from 'suman';
const Test = suman.init(module, {
  ioc: {
    zoom: '1.6'
  }
});

Test.define('diggity dog')
.source('foo', 'bar')
.run(b => {
  
  const {describe, it} = b.getHooks();
  const z = b.getInjections();
  
  const x = b.ioc;
  const m = b.testId;
  
  console.log('z =>', z);
  console.log('x =>', x);
  console.log('m =>', m);
  
  describe('inner', b => {
    
    const {it} = b.getHooks();
    
    it('passes', t => {
      t.assert(true);
    });
    
  });
  
  for (let i = 0; i < 10; i++) {
    
    describe.define('zoom')
    .run(b => {
      
      it('passes', t => {
        t.assert.equal(true,true);
      });
      
    });
    
  }
  
})
.run(v => {
  
  const {describe, it} = v.getHooks();
  
  describe('zoom', b => {
    
    it('is good', t =>{
    
    
    });
  });
});