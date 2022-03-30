const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {

    // const cityDets = data.cityDets;
    // const weather = data.weather;
    // destructure properties // same as this^^
    const { cityDets, weather}  = data;

    // update details template
    details.innerHTML = `
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>
    `
    // update night/day img and icon images
    const iconSrc = `../icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    const dayImg = 'https://images.unsplash.com/photo-1619793906000-a89279ed88e0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzh8fHN1bnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60';
    const nightImg = 'https://images.unsplash.com/photo-1472552944129-b035e9ea3744?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bmlnaHQlMjBza3l8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60';

    let timeSrc = weather.IsDayTime ? dayImg : nightImg;
    time.setAttribute('src', timeSrc);

    // remove the d-none class if present
    if (card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
};

const updateCity = async (city) => {
    
    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    // return {
    //     cityDets: cityDets,
    //     weather: weather
    // }; 
    // this is the same as this ^^
        return { cityDets, weather };
};

cityForm.addEventListener('submit', e => {
    e.preventDefault();

    // get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    // update the ui with new city
    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));
});