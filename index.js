let divForecast = document.querySelector(".climate")
let inputSearch = document.querySelector("#search")
let buttonSearch = document.querySelector(".search-city")
let body = document.querySelector("body")

async function getWeather() {
  try {
    let apiKey = "6b53a2e4ae803eec27cf18764963c238"
    let nameCity = inputSearch.value || "Porto Alegre"
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${nameCity}&appid=${apiKey}&units=metric&lang=pt_br`

    let response = await fetch(url)

    if (!response.ok) {
      throw new Error("Erro ao buscar os dados do clima")
    }

    let data = await response.json()

    let info = {
      city: data["name"],
      temperature: Math.floor(data["main"]["temp"]),
      temperatureMax: Math.floor(data["main"]["temp_max"]),
      temperatureMin: Math.floor(data["main"]["temp_min"]),
      description: data["weather"][0]["description"],
    }

    let { city, temperature, temperatureMax, temperatureMin, description, } =
      info

      const weatherEmojis = {
        Clear: "☀️",
        Clouds: "☁️",
        Rain: "🌧️",
        Drizzle: "🌦️",
        Thunderstorm: "⛈️",
        Snow: "🌨️",
        Mist: "🌫️",
        Fog: "🌫️",
      }

      const condition = data.weather[0].main
      const emoji = weatherEmojis[condition]

    divForecast.innerHTML = `
    <h2 class='description'>${city} ${emoji}</h2>
    <h1>${temperature}°</h1>
    <h3>Max. ${temperatureMax}° Min. ${temperatureMin}°</h3>
    <h3 class='description'>${description}</h3>
    `
    const agora = new Date()
    const hora = agora.getHours()
    const minutos = agora.getMinutes()
    const totalMinutos = hora * 60 + minutos

    if (totalMinutos <= 720) {

      body.classList.add("morning")
      body.classList.remove("afternoon")
      body.classList.remove("night")
    } else if (totalMinutos <= 1080) {

      body.classList.add("afternoon")
      body.classList.remove("morning")
      body.classList.remove("night")
    } else {

      body.classList.add("night")
      body.classList.remove("morning")
      body.classList.remove("afternoon")
      body.classList.add("text-night")
    }
  } catch (error) {
    console.error(`${error}`)
  }
}

getWeather()

buttonSearch.addEventListener("click", (event) => {
  event.preventDefault()

  const searchTerm = inputSearch.value.toLowerCase()

  getWeather()
})

inputSearch.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault()

  const searchTerm = inputSearch.value.toLowerCase()

    getWeather()
  }
})
