var searchBing = function (terms) {
    var results;
    $.ajax({
        url: "/sample.json",
        success: function (data) {
            console.log("Hi");
            results = JSON.parse(data);

        },
        failure: function (error) {
            console.log(error);
        }
    });
    return results;
};