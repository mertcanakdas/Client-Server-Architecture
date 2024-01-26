const wrapper = document.querySelector('.wrapper'); // KAPSAYICI SINIFINA ERİŞTİĞİMİZ JS KODU
const search = document.querySelector('.search button'); // ARAMA SINIFINA ERİŞTİĞİMİZ JS KODU
const weatherBox = document.querySelector('.weather'); // HAVA SINIFINA ERİŞTİĞİMİZ JS KODU
const weatherDetails = document.querySelector('.weather-details'); // HAVA DURUMU SINIFINA ERİŞTİĞİMİZ JS KODU
const error404 = document.querySelector('.not-found'); // HATA SINIFINA ERİŞTİĞİMİZ JS KODU


// İSTEMCİ SUNUCU MİMARİSİNİN ANA KISMI
search.addEventListener('click', () => {

    const APIKey = 'bfd4c7d6297586b9f1b60672d0b41413'; // SUNUCUYA ERİŞMEK İÇİN KULLANDIĞIMIZ KİŞİSEL ANAHTAR
    const city = document.querySelector('.search input').value; // ŞEHİR İNPUTUNU ALDIĞIMIZ KOD
    
    if (city === '')
        return;
    // SUNUCUNUN ADRESİ CİTY : ARARTTIĞIMIZ ŞEHİR VERİSİ APIKey : BİZİM KİŞİSEL ANAHTARIMIZ
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}&lang=tr`)
        .then(response => response.json())// VERİLERİN JSON FORMATINA ÇEVİRİLDİĞİ KOD
        .then(json => {
            
            if (json.cod === '404') {
                // HATA OLDUĞUNDA AKTİFLEŞECEK KODLAR
                wrapper.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather img'); // HAVA DURUMU GÖRSELİNİ YAKALADIĞIMIZ KOD
            const temperature = document.querySelector('.weather .temperature'); // DERECEYİ YAKALADIĞIMIZ KOD
            const description = document.querySelector('.weather .description'); // HAVA DURUMU AÇILAMASINI YAKALADIĞIMIZ KOD
            const humidity = document.querySelector('.weather-details .humidity span'); // NEM ORANINI YAKALADIĞIMIZ KOD
            const wind = document.querySelector('.weather-details .wind span'); // RÜZGAR HIZINI YAKALADIĞIMIZ KOD
            
            switch (json.weather[0].main) {
                // DURUMLARA GÖRE HANGİ HAVA DURUMU GÖRSELİNİN GÖSTERİLECEĞİ KODLAR
                case 'Clear':
                    image.src = 'icons/clear.png';
                    break;

                case 'Rain':
                    image.src = 'icons/rain.png';
                    break;

                case 'Snow':
                    image.src = 'icons/snow.png';
                    break;

                case 'Clouds':
                    image.src = 'icons/cloud.png';
                    break;

                case 'Haze':
                    image.src = 'icons/mist.png';
                    break;

                default:
                    image.src = '';
            }

            temperature.innerHTML = `${parseFloat(json.main.temp)}<span>°C</span>`; // SICAKLIĞIN GÖSTERİLDİĞİ KOD
            description.innerHTML = `${json.weather[0].description}`; // HAVA DURUMU AÇILAMASININ GÖSTERİLDİĞİ KOD
            humidity.innerHTML = `${json.main.humidity}%`; // NEM ORANININ GÖSTERİLDİĞİ KOD
            wind.innerHTML = `${parseFloat(json.wind.speed)}Km/h`; // RÜZGAR HIZININ GÖSTERİLDİĞİ KOD

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn'); // ANİMASYONU ÇALIŞTIRDIĞIMIZ KOD
            wrapper.style.height = '590px';

           console.log(json)
        });
        
});