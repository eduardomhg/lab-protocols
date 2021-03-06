(function() {

  'use strict';

  /* https://github.com/angular/protractor/blob/master/docs/toc.md */

  describe('my app', function() {


    it('should automatically redirect to /view1 when location hash/fragment is empty', function() {
      browser.get('index.html');
      expect(browser.getLocationAbsUrl()).toMatch("/view1");
    });


    describe('view1', function() {

      beforeEach(function() {
        browser.get('index.html#/view1');
      });


      it('should render view1 when user navigates to /view1', function() {
        expect(element.all(by.css('[ng-view] p')).first().getText()).
          toMatch(/partial for view 1/);
      });

      it('should show an alert when user clicks the "Click me!" button', function() {
        // element(by.id('testButton')).click();
        // browser.waitForAngular();

        // var alertDialog = browser.switchTo().alert();

        // browser.switchTo().alert().then(
        //     function (alert) {
        //       expect(alertDialog.getText()).toEqual('Clicked!');
        //       alert.accept();
        //     },
        //     function (error) {
        //     }
        //   );

      });

    });


    describe('view2', function() {

      beforeEach(function() {
        browser.get('index.html#/view2');
      });


      it('should render view2 when user navigates to /view2', function() {
        expect(element.all(by.css('[ng-view] p')).first().getText()).
          toMatch(/partial for view 2/);
      });

    });
  });


})();