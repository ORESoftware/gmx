import suman, {s} from 'suman';
const Test = suman.init(module,{
  ioc: {
    zoom: '1.6'
  }
});

Test.define('diggity dog')
.source('foo','bar')
.run(b => {
  
  const {describe} = b.getHooks();
  const z = b.getInjections();
  
  const x = b.ioc;
  const m = b.iocStatic;
  
  console.log('z =>', z);
  console.log('x =>', x);
  console.log('m =>', m);
  
  describe('inner', b => {
    
    
    const {it} = b.getHooks();
    
    it('passes', t => {
      t.assert(true);
    });
    
  });
  
});