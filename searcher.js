var searchUrl = function (url, callback) {
    var results = {};
    if (url.isEmpty()) {
        callback({});
    } else {
        $.ajax({
            url: url,
            success: function(data) {
                callback(data);
            }
        });
    }
};
var generateUrl = function(searchterm){
    return ("");
};

String.prototype.isEmpty = function() {
    return (this.length === 0 || !this.trim());
};
