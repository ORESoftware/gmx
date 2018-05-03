import suman, {s} from 'suman';
const Test = suman.init(module);

Test.define('diggity dog').run(b => {
  
  const {describe} = b.getHooks();
  
  describe('inner', b => {
    
    
    const {it} = b.getHooks();
    
    it('passes', t => {
      t.assert(true);
    });
    
  });
  
});