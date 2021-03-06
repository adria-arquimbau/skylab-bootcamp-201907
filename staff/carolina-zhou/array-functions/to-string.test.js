suite('to-string', function () {
    test('default', function () {

        var array = [1,2,3,4,5,6];
        var expected = "1,2,3,4,5,6";
        var result = toString(array);

        check(result, expected);
    });

    test('not an array', function () {
        isArray(1);
    }, function (error) {
        check(error instanceof TypeError, true);
        check(error.message, '1 is not an array');
    });
});