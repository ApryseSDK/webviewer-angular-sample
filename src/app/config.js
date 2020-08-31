((exports) => {


  const { Annotations } = exports;

  Annotations.Forms.EmbeddedJS.update(scope => {
    // Scope represents the window scope that embedded javascript runs within

    console.log(scope);

    scope.AFSpecial_KeystrokeEx = function (old) {
      console.log('test');
      function extendsInit() {
        console.log('yo', this, arguments);
        old.apply(this, arguments);
      }
      return extendsInit;
    };
  });


})(window);
