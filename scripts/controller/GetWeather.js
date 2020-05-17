class GetWeather {

    constructor() {

        this.inputCity = document.querySelector('#input-city')
        this.searchBtn = document.querySelector('#glass')

        this.focus()
        this.selectCity()

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
            this.clearSearch()

        })

        this.inputCity.addEventListener('keypress', e => {

            if (e.key === 'Enter') {

                this.getApi(this.inputCity.value)
                this.clearSearch()

            }

        })

    }

    getApi(city) {

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
                self.showDetail(data);
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
                    <li class="list-item"><i class="fas fa-arrow-down"></i>16°<i class="fas fa-arrow-up"></i>25°
                    </li>
                </strong>
                <li class="list-item">Vento <span class="temp">${data.current_observation.wind.speed}km/h</span></li>

            </ul>

            <ul class="list-temp">
                <li class="list-item">Sensação <span class="temp">19°</span></li>
                <li class="list-item">Humidade <span class="temp">${data.current_observation.atmosphere.humidity}%</span></li>
            </ul>

        </div>

        <hr id="orange-line" />

        <div class="detail-days">

            <ul class="list-days">

                <li class="item-days days">Terça</li>
                <li class="item-days day-temp">18° 26°</li>

            </ul>

            <ul class="list-days">

                <li class="item-days days">Quarta</li>
                <li class="item-days day-temp">18° 28°</li>

            </ul>

            <ul class="list-days">

                <li class="item-days days">Quinta</li>
                <li class="item-days day-temp">19° 30°</li>

            </ul>

            <ul class="list-days">

                <li class="item-days days">Sexta</li>
                <li class="item-days day-temp">23° 35°</li>

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


    /*Aracaju
    Belém
    Belo Horizonte
    Boa Vista
    Brasília
    Campo Grande
    Cuiabá
    Curitiba
    Florianópolis
    Fortaleza
    Goiânia
    João Pessoa
    Macapá
    Maceió
    Manaus
    Natal
    Palmas
    Porto Alegre
    Porto Velho
    Recife
    Rio Branco
    Rio de Janeiro
    Salvador
    São Luís
    São Paulo
    Teresina
    Vitória
    */





}


