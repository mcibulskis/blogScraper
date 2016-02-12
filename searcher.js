var searchBing = function (terms) {
    var results;
    $.ajax({
        url: "sample.json",
        success: function (data) {
            console.log("Hi");
            results = data;

        },
        failure: function (error) {
            console.log(error);
        }
    });
    return results;
};