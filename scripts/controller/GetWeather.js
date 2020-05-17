class GetWeather {

    constructor() {
        this.inputCity = document.querySelector('#input-city').value

        this.selectCity()
        this.getApi()
    }

    selectCity() {
        this.getApi(this.inputCity)
    }

    getApi(city) {
        // Weather API sample javascript code
        // Requires: jQuery and crypto-js (v3.1.9)
        // 
        // Copyright 2019 Oath Inc. Licensed under the terms of the zLib license see https://opensource.org/licenses/Zlib for terms.

        var url = 'https://weather-ydn-yql.media.yahoo.com/forecastrss';
        var method = 'GET';
        var app_id = 'YN08AI4q';
        var consumer_key = 'dj0yJmk9UVNyQTFFN2RLM2g5JmQ9WVdrOVdVNHdPRUZKTkhFbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PWEy';
        var consumer_secret = '2836e4cdac5cfa27a51a1a16ee4f4be048674b85';
        var concat = '&';
        var query = { 'location': city, 'format': 'json' };
        var oauth = {
            'oauth_consumer_key': consumer_key,
            'oauth_nonce': Math.random().toString(36).substring(2),
            'oauth_signature_method': 'HMAC-SHA1',
            'oauth_timestamp': parseInt(new Date().getTime() / 1000).toString(),
            'oauth_version': '1.0'
        };

        var merged = {};
        $.extend(merged, query, oauth);
        // Note the sorting here is required
        var merged_arr = Object.keys(merged).sort().map(function (k) {
            return [k + '=' + encodeURIComponent(merged[k])];
        });
        var signature_base_str = method
            + concat + encodeURIComponent(url)
            + concat + encodeURIComponent(merged_arr.join(concat));

        var composite_key = encodeURIComponent(consumer_secret) + concat;
        var hash = CryptoJS.HmacSHA1(signature_base_str, composite_key);
        var signature = hash.toString(CryptoJS.enc.Base64);

        oauth['oauth_signature'] = signature;
        var auth_header = 'OAuth ' + Object.keys(oauth).map(function (k) {
            return [k + '="' + oauth[k] + '"'];
        }).join(',');

        $.ajax({
            url: url + '?' + $.param(query),
            headers: {
                'Authorization': auth_header,
                'X-Yahoo-App-Id': app_id
            },
            method: 'GET',
            success: function (data) {
                console.log(data);
            }
        });

    }

}


