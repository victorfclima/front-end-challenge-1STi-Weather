class GetWeather {

    constructor() {

        this.inputCity = document.querySelector('#input-city')
        this.searchBtn = document.querySelector('#glass')

        this.focus()
        this.selectCity()
        this.initialize()
    }

    initialize() {

        this.getApi('Belo Horizonte')
        this.getApi('Brasília')
        this.getApi('Cuiabá')
        this.getApi('Curitiba')
        this.getApi('Florianópolis')
        this.getApi('Fortaleza')
        this.getApi('Goiânia')
        this.getApi('Natal')
        this.getApi('Rio de Janeiro')
        this.getApi('São Paulo')

    }

    focus() {

        this.inputCity.focus()

    }

    clearSearch() {

        this.inputCity.value = ''

    }


    selectCity() {

        this.searchBtn.addEventListener('click', e => {

            this.getApi(this.inputCity.value)

        })

        this.inputCity.addEventListener('keypress', e => {

            if (e.key === 'Enter') {

                this.getApi(this.inputCity.value)

            }

        })

    }

    getApi(city = 0) {

        // Weather API sample javascript code
        // Requires: jQuery and crypto-js (v3.1.9)
        // 
        // Copyright 2019 Oath Inc. Licensed under the terms of the zLib license see https://opensource.org/licenses/Zlib for terms.
        var self = this;
        var url = 'https://weather-ydn-yql.media.yahoo.com/forecastrss';
        var method = 'GET';
        var app_id = 'x4esMF34';
        var consumer_key = 'dj0yJmk9OURpMFdoZ01WYlIxJmQ9WVdrOWVEUmxjMDFHTXpRbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PThk';
        var consumer_secret = '9d8d25047482b657ac10230e09be1b1745ad54c8';
        var concat = '&';
        var query = { 'location': city, 'format': 'json', 'u': 'c' };
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
                if (self.inputCity.value.length == 0) {
                    self.addCity(data)
                } else {
                    self.showDetail(data);
                    self.clearSearch()
                }
            }

        });

    }


    showDetail(data) {

        console.log(data)

        let parentDiv = document.querySelector('#topdiv')

        if (document.querySelectorAll('#detail').length >= 1) {

            let removeDetail = document.querySelector('article')
            parentDiv.removeChild(removeDetail)

        }

        let detailDiv = document.createElement('article')

        detailDiv.innerHTML =
            `<div class="weather-detail" id="detail">

        <ul class="header-detail">
            <li class="city">${data.location.city}, ${data.location.region} - ${data.location.country}</li>
            <li><i class="fas fa-times" id="close-detail"></i></li>
        </ul>

        <p class="plumb temp-now pl">${data.current_observation.condition.temperature}°C ${data.current_observation.condition.text}</p>

        <div class="detail-container">

            <ul class="list-temp pl">

                <strong>
                    <li class="list-item"><i class="fas fa-arrow-down"></i>${data.forecasts[0].low}°<i class="fas fa-arrow-up"></i>${data.forecasts[0].high}°
                    </li>
                </strong>
                <li class="list-item">Vento <span class="temp">${data.current_observation.wind.speed}km/h</span></li>

            </ul>

            <ul class="list-temp">
                <li class="list-item">Pôr do sol <span class="temp">${data.current_observation.astronomy.sunset}</span></li>
                <li class="list-item">Humidade <span class="temp">${data.current_observation.atmosphere.humidity}%</span></li>
            </ul>

        </div>

        <hr id="orange-line" />

        <div class="detail-days">

            <ul class="list-days">

                <li class="item-days days">${data.forecasts[1].day}</li>
                <li class="item-days day-temp">${data.forecasts[1].low}° ${data.forecasts[1].high}°</li>

            </ul>

            <ul class="list-days">

                <li class="item-days days">${data.forecasts[2].day}</li>
                <li class="item-days day-temp">${data.forecasts[2].low}° ${data.forecasts[2].high}°</li>

            </ul>

            <ul class="list-days">

                <li class="item-days days">${data.forecasts[3].day}</li>
                <li class="item-days day-temp">${data.forecasts[3].low}° ${data.forecasts[3].high}°</li>

            </ul>

            <ul class="list-days">

                <li class="item-days days">${data.forecasts[4].day}</li>
                <li class="item-days day-temp">${data.forecasts[4].low}° ${data.forecasts[4].high}°</li>

            </ul>

        </div>

    </div> `

        parentDiv.appendChild(detailDiv)
        this.closeTab()
    }

    closeTab() {

        let parentDiv = document.querySelector('#topdiv')

        document.querySelector('#close-detail').addEventListener('click', e => {

            let removeDetail = document.querySelector('article')
            parentDiv.removeChild(removeDetail)

        })

    }

    addCity(data) {

        let cityTable = document.querySelector('#main-content')
        let cityInfo = document.createElement('tr')

        cityInfo.innerHTML =
            `
        <td class="td-temp">${data.forecasts[0].low}°</td>
        <td class="td-temp">${data.forecasts[0].high}°</td>
        <td class="td-temp">${data.location.city}</td>
            `

        cityTable.appendChild(cityInfo)

    }

}


