// stopwatch card

const stopwatchCard = document.querySelector('.stopwatch')
const stopwatchStartBtn = document.querySelector('.stopwatch-start')
const stopwatchPauseBtn = document.querySelector('.stopwatch-pause')
const stopwatchStopBtn = document.querySelector('.stopwatch-stop')
const stopwatchResetBtn = document.querySelector('.stopwatch-reset')
const stopwatchHistoryBtn = document.querySelector('.stopwatch-history')
const stopwatchCloseHistoryBtn = document.querySelector('.stopwatch-close-history')

const stopwatchPage = document.querySelector('.stopwatch-page')
const stopwatchHistoryPage = document.querySelector('.stopwatch-history-page')

const stopwatchClock = document.querySelector('.stopwatch-clock')
const lastTime = document.querySelector('.show-last-time')
const historyList = document.querySelector('.history-of-times')

let count
let seconds = 0
let minutes = 0
let arrOfTimes = []

let isFunctionExecuting = false

const startCount = () => {
	clearInterval(count)

	count = setInterval(() => {
		if (seconds < 9) {
			seconds++
			stopwatchClock.textContent = `${minutes}:0${seconds}`
		} else if (seconds >= 9 && seconds < 59) {
			seconds++
			stopwatchClock.textContent = `${minutes}:${seconds}`
		} else {
			minutes++
			seconds = 0
			stopwatchClock.textContent = `${minutes}:00`
		}
	}, 1000)

	lastTime.textContent = ''
}

const pauseCount = () => {
	clearInterval(count)
}

const stopCount = () => {
	clearInterval(count)
	if (stopwatchClock.textContent !== '0:00') {
		lastTime.textContent = `last time: ${stopwatchClock.textContent}`
		arrOfTimes.push(stopwatchClock.textContent)

		clearMainDataStopwatch()
	}
}

const showHistory = () => {
	stopwatchHistoryPage.style.transform = 'rotate(0)'
	stopwatchPage.style.transform = 'rotateX(-180deg)'
	stopwatchHistoryPage.style.opacity = 1
	stopwatchPage.style.opacity = 0
	stopwatchHistoryPage.style.zIndex = 1

	let number = 1
	arrOfTimes.forEach(el => {
		const time = document.createElement('p')
		time.textContent = `Czas nr ${number}:\u00A0 \u00A0 \u00A0 \u00A0${el}`
		historyList.append(time)
		number++
	})

	const numOfParagraphs = 8

	if (arrOfTimes.length >= numOfParagraphs) {
		arrOfTimes.splice(0, 1)
	}
}

const hideHistory = () => {
	stopwatchHistoryPage.style.transform = 'rotateX(-180deg)'
	stopwatchHistoryPage.style.opacity = 0
	stopwatchHistoryPage.style.zIndex = -1
	stopwatchPage.style.opacity = 1
	stopwatchPage.style.transform = 'rotate(0)'
}

const resetStopwatch = () => {
	clearMainDataStopwatch()
	lastTime.textContent = ''
	arrOfTimes = []
}

const clearMainDataStopwatch = () => {
	stopwatchClock.textContent = '0:00'
	historyList.textContent = ''
	minutes = 0
	seconds = 0
}

stopwatchHistoryBtn.addEventListener('click', showHistory)
stopwatchCloseHistoryBtn.addEventListener('click', hideHistory)
stopwatchStartBtn.addEventListener('click', startCount)
stopwatchPauseBtn.addEventListener('click', pauseCount)
stopwatchStopBtn.addEventListener('click', stopCount)
stopwatchResetBtn.addEventListener('click', resetStopwatch)

// timer card

const popup = document.querySelector('.timer-popup')
const timerSaveBtn = document.querySelector('.timer-save')
const popupEventName = document.querySelector('.popup-input-event-name')
const popupInputDay = document.querySelector('.popup-input-day')
const popupInputMonth = document.querySelector('.popup-input-month')
const popupInputYear = document.querySelector('.popup-input-year')
const timerEditBtn = document.querySelector('.timer-edit')
const timerCard = document.querySelector('.timer')

const daysCountdown = document.querySelector('.countdown-days')
const hoursCountdown = document.querySelector('.countdown-hours')
const minutesCountdown = document.querySelector('.countdown-minutes')
const secondsCountdown = document.querySelector('.countdown-seconds')
const eventName = document.querySelector('.event-name')

let userTime

const getTime = () => {
	const presenTime = new Date()
	const score = userTime - presenTime

	const timerDays = Math.floor(score / 1000 / 60 / 60 / 24)
	const timerHours = Math.floor(score / 1000 / 60 / 60) % 24
	const timerMinutes = Math.floor(score / 1000 / 60) % 60
	const timerSeconds = Math.floor(score / 1000) % 60

	daysCountdown.textContent = timerDays
	hoursCountdown.textContent = timerHours
	minutesCountdown.textContent = timerMinutes
	secondsCountdown.textContent = timerSeconds
}

const dataUpdate = () => {
	eventName.textContent = popupEventName.value
	userTime = new Date(`${popupInputMonth.value} ${popupInputDay.value} ${popupInputYear.value}`)
	getTime()
}

const closePopup = () => {
	eventName.textContent = popupEventName.value
	popup.classList.remove('show-timer-popup')
}

const showPopup = () => {
	popup.classList.add('show-timer-popup')
}

timerEditBtn.addEventListener('click', showPopup)
timerSaveBtn.addEventListener('click', () => {
	dataUpdate()
	closePopup()
})

dataUpdate()
setInterval(getTime, 1000)

// time&weather card

const timeWeatherCard = document.querySelector('.weather')
const time = document.querySelector('.time')
const date = document.querySelector('.date')
const currentWeather = document.querySelector('.current-weather')
const currentTemp = document.querySelector('.current-temperature')
const icon = document.querySelector('.weather-icon')
const showStopwatchBtn = document.querySelector('.show-stopwatch-btn')
const showTimerBtn = document.querySelector('.show-timer-btn')
const showTimeWeatherBtn = document.querySelector('.show-weather-btn')
const timeWeatherPopup = document.querySelector('.weather-popup')
const timeWeatherInput = document.querySelector('.input-city-name')
const timeWeatherSendBtn = document.querySelector('.weather-send-btn')
const nameOfCity = document.querySelector('.name-of-city')

const showTimeWeatherPopup = () => {
	timeWeatherPopup.classList.add('show-weather-popup')
}

const getCityData = () => {
	timeWeatherPopup.classList.remove('show-weather-popup')
}

const getTimeAndDate = () => {
	const now = new Date()
	let hours = now.getHours()
	let minutes = now.getMinutes()
	let seconds = now.getSeconds()

	if (seconds <= 9 && minutes <= 9) {
		time.textContent = `${hours} : 0${minutes} : 0${seconds}`
	} else if (minutes <= 9 && seconds > 9) {
		time.textContent = `${hours} : 0${minutes} : ${seconds}`
	} else if (minutes > 9 && seconds <= 9) {
		time.textContent = `${hours} : ${minutes} : 0${seconds}`
	} else {
		time.textContent = `${hours} : ${minutes} : ${seconds}`
	}

	let day = now.getDate()
	let month = now.getMonth() + 1
	let year = now.getFullYear()

	if (month <= 9) {
		date.textContent = `${day} . 0${month} . ${year}`
	} else {
		date.textContent = `${day} . ${month} . ${year}`
	}
}
setInterval(getTimeAndDate, 1000)

// api waether

const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q='

const API_KEY = '&appid=50808132f3a2f575fce4c8b52cb6f31b'

const API_UNITS = '&units=metric'

const getCityWeather = () => {
	let city = timeWeatherInput.value
	const URL = API_LINK + city + API_KEY + API_UNITS

	axios.get(URL).then(res => {
		const temp = res.data.main.temp
		const status = res.data.weather[0].main

		currentTemp.textContent = Math.floor(temp) + '°C'
		currentWeather.textContent = status

		if (res.data.weather[0].id >= 200 && status.id < 300) {
			icon.setAttribute('src', './assets/icon/thunderstorm.png')
		} else if (status.id >= 300 && status.id < 400) {
			icon.setAttribute('src', './assets/icon/drizzle.png')
		} else if (status.id >= 500 && status.id < 600) {
			icon.setAttribute('src', './assets/icon/rain.png')
		} else if (status.id >= 600 && status.id < 700) {
			icon.setAttribute('src', './assets/icon/snow.png')
		} else if (status.id >= 701 && status.id < 800) {
			icon.setAttribute('src', './assets/icon/fog.png')
		} else if (status.id === 800) {
			icon.setAttribute('src', './assets/icon/sun.png')
		} else if (status.id >= 801 && status.id < 900) {
			icon.setAttribute('src', './assets/icon/cloud.png')
		} else {
			icon.setAttribute('src', './assets/icon/unknown.png')
		}

		console.log(res.data.weather[0].id)
	})
}
getCityWeather()

// show and hide cards

const showStopwatch = () => {
	stopwatchCard.classList.remove('hide-card')
	timerCard.classList.add('hide-card')
	timeWeatherCard.classList.add('hide-card')
}
const showTimer = () => {
	stopwatchCard.classList.add('hide-card')
	timerCard.classList.remove('hide-card')
	timeWeatherCard.classList.add('hide-card')
}
const showTimeWeather = () => {
	stopwatchCard.classList.add('hide-card')
	timerCard.classList.add('hide-card')
	timeWeatherCard.classList.remove('hide-card')
}

showStopwatchBtn.addEventListener('click', showStopwatch)
showTimerBtn.addEventListener('click', showTimer)
showTimeWeatherBtn.addEventListener('click', () => {
	showTimeWeather()
	showTimeWeatherPopup()
})
timeWeatherSendBtn.addEventListener('click', getCityData)
