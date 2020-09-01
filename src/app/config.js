((exports) => {


  const { Annotations } = exports;

  Annotations.Forms.EmbeddedJS.update(scope => {
    // Scope represents the window scope that embedded javascript runs within

    console.log(scope);
  });


})(window);
