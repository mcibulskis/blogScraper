var searchUrl = function (url, callback) {
    var results = {};
    var apikeyForBing = ':qwffhaq33swiX0voiMZJPlsBYysHwHH2vRwt43z8+kc=';
    if (url.isEmpty()) {
        callback({});
    } else {
        $.ajax({
            url: url,
            headers: { "Authorization": "Basic " + btoa(apikeyForBing)},
            success: function(data) {
                callback(data);
           
            }
        });
    }
};
var generateUrl = function(searchterm){
    if (searchterm.isEmpty()) {
        return "";
    }

    if(searchterm === "test")
        return "sample.json";

    return "https://api.datamarket.azure.com/Data.ashx/Bing/Search/Web?Query=%27" + searchterm + "%27&$top=10&$format=json";
};

String.prototype.isEmpty = function() {
    return (this.length === 0 || !this.trim());
};
