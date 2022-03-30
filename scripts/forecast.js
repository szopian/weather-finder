class Forecast{
    constructor(){
        this.key = 'e8R6pevYQOBnVU9yEHHrX6QV5KPTFwEm';
        this.weatherURI = 'http://dataservice.accuweather.com/currentconditions/v1/';
        this.cityURI = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    }
    async updateCity(city){
        const cityDets = await this.getCity(city);
        const weather = await this.getWeather(cityDets.Key);

        return { cityDets, weather };
    }
    async getCity(city){
        const query = `?apikey=${this.key}&q=${city}`;
        const responce = await fetch(this.cityURI + query);
        const data = await responce.json();
    
        return data[0];
    }
    async getWeather(id){
        const query = `${id}?apikey=${this.key}`;
        const responce = await fetch(this.weatherURI + query);
        const data = await responce.json();

        return data[0];
    }
}



// const key = 'e8R6pevYQOBnVU9yEHHrX6QV5KPTFwEm';

// // get weather information
// const getWeather = async (id) => {

//     const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
//     const query = `${id}?apikey=${key}`;

//     const responce = await fetch(base + query);
//     const data = await responce.json();

//     return data[0];
// }

// // get city information
// const getCity = async (city) => {
//     const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
//     const query = `?apikey=${key}&q=${city}`;

//     const responce = await fetch(base + query);
//     const data = await responce.json();

//     return data[0];
// }; 

