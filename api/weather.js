const NOT_FOUND = "We couldn't find that city. Please check the spelling and try again.";
const UNAVAILABLE = "The weather service is unavailable right now. Please try again later.";

module.exports = async function handler(req, res) {
  const raw = req.query && req.query.city;
  const city = String(Array.isArray(raw) ? raw[0] : raw || '').trim();

  if (!city) {
    return res.status(404).json({ message: NOT_FOUND });
  }

  const key = process.env.WEATHER_API_KEY;
  if (!key) {
    return res.status(503).json({ message: UNAVAILABLE });
  }

  try {
    const url =
      'https://api.weatherapi.com/v1/current.json?key=' + encodeURIComponent(key) +
      '&q=' + encodeURIComponent(city);
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      const code = data && data.error && data.error.code;
      if (code === 1006 || code === 1003) {
        return res.status(404).json({ message: NOT_FOUND });
      }
      return res.status(503).json({ message: UNAVAILABLE });
    }

    const icon = String(data.current.condition.icon);

    return res.status(200).json({
      city: data.location.name,
      country: data.location.country,
      localTime: data.location.localtime,
      description: data.current.condition.text,
      icon: icon.startsWith('//') ? 'https:' + icon : icon,
      temperatureC: data.current.temp_c,
      feelsLikeC: data.current.feelslike_c,
      humidity: data.current.humidity,
      windKph: data.current.wind_kph,
      windDirection: data.current.wind_dir,
    });
  } catch (error) {
    return res.status(503).json({ message: UNAVAILABLE });
  }
};
