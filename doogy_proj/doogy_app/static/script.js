
// const quotes = require("./quotes.json")
// console.log(quotes);

breed = ""
breeds = []
bannerUrls = []
imageUrls = []
quotes = []

function getURL() {
    if (breed.length > 0) {
        return `https://dog.ceo/api/breed/${breed}/images/random/16`;
    }

    return `https://dog.ceo/api/breeds/image/random/16`;
}

function fetch() {
    $.ajax({
        type: "GET",
        url: getURL(),
        success: function (response) {
            for (const index in response.message) {
                imageUrl = response.message[index];
                imageUrls.push(imageUrl);

                code = `<div class="col-3 text-center">
                    <div class="image-box" style="background-image: url(${imageUrl});">
                        <div class="text-box text-center text-light">
                            <div class="content-align-bottom text-center align-items-end">
                                <div class="like-section p-0 d-inline-block">
                                    <button class="btn p-0 mt-auto"><img class="p-0" id="heart" src="${heartImage}"
                                            alt=""></button>
                                </div>
                                <div class="buttons d-inline-block">
                                    <button class="btn btn-sm btn-outline-light">Download</button>
                                    <button class="btn btn-sm btn-outline-light">View Raw</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;

                $('.second-row').append(code);
            }
        }
    });
}

function renderCarousel() {
    code = "";

    for (const index in bannerUrls) {
        active = (index > 0) ? "" : "active";
        data = bannerUrls[index];
        code += `<div class="carousel-item ${active} w-100">
            <img autoplay class="d-block w-100" src="${data.url}" alt="">
            <div class="gradient-layer"></div>
            <div class="carousel-caption d-none d-md-block">
                <h1 class="font-weight-bold">"${data.quote.quote}"</h1>
                <p class="mb-0">- ${data.quote.author} -</p>
            </div>
        </div>`
    }

    $('.carousel-inner').html(code);
}

function updateUI(darkMode) {
    if (!darkMode) {
        $('body').css('background-color', 'rgb(10, 10, 10)');
        $('nav').css('background-color', 'rgba(5, 5, 5, 0.95)');
        $('nav h4').css('color', 'white');
        $('nav button').addClass('text-light');
        $('nav button').addClass('btn-dark');
        $('footer').addClass('bg-dark');
        $('footer h4').addClass('text-light');
        $('h3').addClass('text-light');
        $('#more-doogy').addClass('btn-dark');
        $('.breed-btn').addClass('btn-dark');
        $('#show-breed').addClass('text-light');
        $('select').addClass('bg-dark text-light');
        $('.btn-color').addClass('btn-dark');
    } else {
        $('body').css('background-color', 'white');
        $('nav').css('background-color', 'rgba(250, 250, 250, 0.95)');
        $('nav h4').css('color', 'black');
        $('nav button').removeClass('text-light');
        $('nav button').removeClass('btn-dark');
        $('footer').removeClass('bg-dark');
        $('footer h4').removeClass('text-light');
        $('h3').removeClass('text-light');
        $('#more-doogy').removeClass('btn-dark');
        $('.breed-btn').removeClass('btn-dark');
        $('#show-breed').removeClass('text-light');
        $('select').removeClass('bg-dark text-light');
        $('.btn-color').removeClass('btn-dark');
    }
}

function addDarkModeSupport() {
    $('#light-mode').click(function () {
        darkModeOn = false
        $(this).addClass('active')
        $('#dark-mode').removeClass('active')
        updateUI(false);
    });

    $('#dark-mode').click(function () {
        darkModeOn = true
        $(this).addClass('active')
        $('#light-mode').removeClass('active')
        updateUI(true);
    });
}

$(document).ready(function () {
    $('[data-toggle="popover"]').popover();
    addDarkModeSupport();
    fetch();

    console.log(importedQuotes);

    $.ajax({
        type: "GET",
        url: importedQuotes,
        success: function (response) {
            for (const index in response) {
                quotes.push(response[index]);
            }

            for (i = 0; i < 10; i++) {
                $.ajax({
                    type: "GET",
                    url: "https://random.dog/woof.json",
                    success: function (response) {
                        quote = quotes[Math.floor(Math.random() * quotes.length)]
                        data = { 'fileSize': response.fileSizeBytes, 'url': response.url, 'quote': quote };
                        ext = data.url.split('.').pop();

                        if (ext.toLowerCase() != 'mp4' && ext.toLowerCase() != 'webm') {
                            bannerUrls.push(data);
                            renderCarousel();
                        }

                    }
                });
            }
        }
    });

    $.ajax({
        type: "GET",
        url: "https://dog.ceo/api/breeds/list/all",
        success: function (response) {
            Object.keys(response.message).forEach(function (key) {
                breeds.push(key);
                $('#select').append(`<option value="${key}">#${key}</option>`);
            });
        }
    });

    $('#select').change(function (e) {
        breed = e.target.value;
        $('#show-breed').text(`#${breed}`);
        breed = (new String(breed).valueOf() == new String("random").valueOf()) ? "" : `${breed}`;

        $('.second-row').html("");
        fetch();
    });


});