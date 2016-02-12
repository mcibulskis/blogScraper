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

String.prototype.isEmpty = function() {
    return (this.length === 0 || !this.trim());
};