# Weather App

A small weather website. You type a city name and see the current weather for that city.

## How it works

1. Type a city name in the search box.
2. Click **Search** (or press **Enter**).
3. The page shows the weather for that city:
   - the city and country
   - the local time there
   - the temperature in Celsius (°C)
   - a small weather picture and a short description, like "Partly cloudy"
   - what it feels like (°C), the humidity, and the wind speed (km/h) and direction

## Where the weather comes from

The weather data comes from [weatherapi.com](https://www.weatherapi.com/).

## Where it is hosted

The website is published on [Vercel](https://vercel.com/).

The weather service needs a secret password called an **API key**. The key is stored on Vercel as an environment variable called `WEATHER_API_KEY`. The key is never written in the code or on GitHub.

## What happens when something goes wrong

The page shows a friendly message instead of an error:

- If the search box is empty or the city can't be found:
  "We couldn't find that city. Please check the spelling and try again."
- If the weather service can't be reached, or anything else goes wrong:
  "The weather service is unavailable right now. Please try again later."

## Live link

[add live link here]

## Credits

Weather data by [weatherapi.com](https://www.weatherapi.com/).
