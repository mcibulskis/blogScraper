var searchBing = function (terms) {
    var results = {};
    if(terms.isEmpty())
        return results;
    
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

String.prototype.isEmpty = function() {
    return (this.length === 0 || !this.trim());
};