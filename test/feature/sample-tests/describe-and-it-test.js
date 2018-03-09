'use-strict';

describe('something', function () {
    before(function () {
        console.log("outer before executed");
    })

    after(function () {
        console.log("outer after executed");
    })

    beforeEach(function () {
        console.log("outer before each executed");
    })

    afterEach(function () {
        console.log("outer after each executed");
    })

    it('should work', function () {
        true.should.be.true;
    });

    describe('something else', function () {
        before(function () {
            console.log("inner before executed");
        })

        after(function () {
            console.log("inner after executed");
        })

        beforeEach(function () {
            console.log("inner before each executed");
        })

        afterEach(function () {
            console.log("inner after each executed");
        })

        it('should also work', function () {
            true.should.be.true;
        });

        it('should always work', function () {
            true.should.be.true;
        });
    });
});