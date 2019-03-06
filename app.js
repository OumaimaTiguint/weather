window.addEventListener('load', ()=> {
    let long;
    let lat;
    const temperatureDescription = document.querySelector('.temperature-description');
    const temperatureDegree      = document.querySelector('.temperature-degree');
    const locationTimezone       = document.querySelector('.location-timezone');
    const temperatureSection     = document.querySelector('.temperature');
    const temperatureSpan        = document.querySelector('.temperature span');

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat  = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/ac4c7e3c31994d52cbe3b2b35b699e2e/${lat},${long}`;

            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                const { temperature, summary, icon } = data.currently;
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;

                //set icons
                setIcons(icon, document.querySelector('.icon'));

                //formula of conversion Celsius
                let celsius = (temperature -32) * (5/9);

                //change temp F/C
                temperatureSection.addEventListener('click', ()=> {
                    if(temperatureSpan.textContent==="F") {
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = Math.floor(celsius);
                    } else {
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = temperature;
                    }
                })
            })
        });
    } 
    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    } 
});