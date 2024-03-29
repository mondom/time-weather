const showStopwatchBtn = document.querySelector('.show-stopwatch-btn')
const showTimerBtn = document.querySelector('.show-timer-btn')
const showWeatherBtn = document.querySelector('.show-weather-btn')

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

// let isFunctionExecuting = false

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
	const numOfParagraphs = 8

	console.log(arrOfTimes.length)

	if (arrOfTimes.length > numOfParagraphs) {
		arrOfTimes.splice(0, 1)
	}
}

const showHistory = () => {
	stopwatchPage.style.opacity = '0'
	stopwatchPage.style.transform = 'rotateY(-180deg)'
	stopwatchPage.style.zIndex = '-1'
	stopwatchHistoryPage.style.transform = 'rotateY(0)'
	stopwatchHistoryPage.style.opacity = '1'
	stopwatchHistoryPage.style.zIndex = '1'

	let number = 1
	arrOfTimes.forEach(el => {
		const time = document.createElement('p')
		time.textContent = `Time no. ${number}:\u00A0 \u00A0 \u00A0 \u00A0${el}`
		historyList.append(time)
		number++
	})
}

const hideHistory = () => {
	stopwatchPage.style.opacity = '1'
	stopwatchPage.style.zIndex = '1'
	stopwatchPage.style.transform = 'rotateY(0)'
	stopwatchHistoryPage.style.transform = 'rotateY(-180deg)'
	stopwatchHistoryPage.style.opacity = '0'
	stopwatchHistoryPage.style.zIndex = '-1'

	historyList.textContent = ''
}

const quickHideHistory = () => {
	stopwatchCard.style.transform = 'rotateY(0)'
	stopwatchPage.style.opacity = '1'
	stopwatchHistoryPage.style.opacity = '0'
	stopwatchHistoryPage.style.zIndex = '-1'
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
document.addEventListener('DOMContentLoaded', hideHistory)
stopwatchHistoryBtn.addEventListener('click', showHistory)
stopwatchCloseHistoryBtn.addEventListener('click', hideHistory)
stopwatchStartBtn.addEventListener('click', startCount)
stopwatchPauseBtn.addEventListener('click', pauseCount)
stopwatchStopBtn.addEventListener('click', stopCount)
stopwatchResetBtn.addEventListener('click', resetStopwatch)

// timer card

const popup = document.querySelector('.timer-popup')
const timerSaveBtn = document.querySelector('.timer-save')
const timerCloseBtn = document.querySelector('.timer-close')
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
const error = document.querySelector('.error')

let enterTime
let score

const getTime = () => {
	let presenTime = new Date().getTime()
	enterTime = new Date(`${popupInputMonth.value} ${popupInputDay.value} ${popupInputYear.value}`).getTime()

	score = enterTime - presenTime

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
	getTime()

	if (
		popupEventName.value === '' ||
		popupInputDay.value === '' ||
		popupInputMonth.value === '' ||
		popupInputYear.value === ''
	) {
		error.textContent = 'Enter all data!'
	} else if (score < 0) {
		error.textContent = 'Enter the date yet to come!'
	} else {
		eventName.textContent = popupEventName.value

		error.textContent = ''
		closePopup()
	}
}

const closePopup = () => {
	eventName.textContent = popupEventName.value
	popup.classList.remove('show-timer-popup')
}
const closeClearPopup = () => {
	popup.classList.remove('show-timer-popup')
}

const showPopup = () => {
	popup.classList.add('show-timer-popup')
}


const blockDayToTwo = () => {
	popupInputDay.value = popupInputDay.value.slice(0, 2)
}
const blockMonthToTwo = () => {
	popupInputMonth.value = popupInputMonth.value.slice(0, 2)
}
const blockYearToTwo = () => {
	popupInputYear.value = popupInputYear.value.slice(0, 4)
}

timerEditBtn.addEventListener('click', showPopup)
timerSaveBtn.addEventListener('click', dataUpdate)
timerCloseBtn.addEventListener('click', closeClearPopup)

setInterval(getTime, 1000)

//weather card

const weatherCard = document.querySelector('.weather')
const currentWeather = document.querySelector('.current-weather')
const currentTemp = document.querySelector('.current-temperature')
const icon = document.querySelector('.weather-icon')
const weatherPopup = document.querySelector('.weather-popup')
const weatherInput = document.querySelector('.input-city-name')
const weatherSendBtn = document.querySelector('.weather-send-btn')
const nameOfCity = document.querySelector('.name-of-city')
const appName = document.querySelector('.app-title-box')
const errorWeatherPopup = document.querySelector('.error-weather-popup')

// api waether

let apiError

const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q='

const API_KEY = '&appid=50808132f3a2f575fce4c8b52cb6f31b'

const API_UNITS = '&units=metric'

const getCityWeather = () => {
	let city = weatherInput.value
	const ADDRESS = API_LINK + city + API_KEY + API_UNITS

	checkWeatherPopup()

	axios
		.get(ADDRESS)
		.then(res => {
			const temp = res.data.main.temp
			const status = res.data.weather[0].main

			nameOfCity.textContent = res.data.name

			currentTemp.textContent = Math.floor(temp) + '°C'
			currentWeather.textContent = status

			const iconStatus = res.data.weather[0].id

			if (iconStatus >= 200 && iconStatus < 300) {
				icon.setAttribute('src', './assets/icon/thunderstorm.png')
			} else if (iconStatus >= 300 && iconStatus < 400) {
				icon.setAttribute('src', './assets/icon/drizzle.png')
			} else if (iconStatus >= 500 && iconStatus < 600) {
				icon.setAttribute('src', './assets/icon/rain.png')
			} else if (iconStatus >= 600 && iconStatus < 700) {
				icon.setAttribute('src', './assets/icon/snow.png')
			} else if (iconStatus >= 701 && iconStatus < 800) {
				icon.setAttribute('src', './assets/icon/fog.png')
			} else if (iconStatus === 800) {
				icon.setAttribute('src', './assets/icon/sun.png')
			} else if (iconStatus >= 801 && iconStatus < 900) {
				icon.setAttribute('src', './assets/icon/cloud.png')
			} else {
				icon.setAttribute('src', './assets/icon/unknown.png')
			}

			errorWeatherPopup.textContent = ''
			closeWeatherPopup()
			showWeatherCard()
		})
		.catch(error => {
			apiError = error.response.status

			if (apiError === 404) {
				errorWeatherPopup.textContent = 'Enter the correct city name!'
			}
		})
}

const closeWeatherPopup = () => {
	weatherPopup.style.display = 'none'
}

const checkWeatherPopup = () => {
	if (weatherInput.value == '') {
		errorWeatherPopup.textContent = 'Enter the name of the city!'
	}
}

const showWeatherCard = () => {
	weatherCard.classList.remove('hide-card')
}

const openWeatherPopup = () => {
	errorWeatherPopup.textContent = ''
	weatherPopup.style.display = 'flex'
	weatherInput.value = ''
}

weatherSendBtn.addEventListener('click', getCityWeather)

// footer
const time = document.querySelector('.time')
const date = document.querySelector('.date')

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

// show and hide cards

const stopwatchInfo = document.querySelector('.stopwatch-instruction')
const timerInfo = document.querySelector('.timer-instruction')
const weatherInfo = document.querySelector('.weather-instruction')

const showStopwatch = () => {
	stopwatchCard.classList.remove('hide-card')
	stopwatchPage.style.transform = 'rotateY(0)'
	stopwatchInfo.style.display = 'flex'
	timerInfo.style.display = 'none'
	weatherInfo.style.display = 'none'
	closeWeatherPopup()
	timerCard.classList.add('hide-card')
	weatherCard.classList.add('hide-card')

	appName.style.display = 'none'
}
const showTimer = () => {
	stopwatchInfo.style.display = 'none'
	timerInfo.style.display = 'flex'
	weatherInfo.style.display = 'none'

	timerCard.classList.remove('hide-card')

	closeWeatherPopup()
	stopwatchCard.classList.add('hide-card')
	weatherCard.classList.add('hide-card')

	appName.style.display = 'none'
}
const showWeather = () => {
	stopwatchInfo.style.display = 'none'
	timerInfo.style.display = 'none'
	weatherInfo.style.display = 'flex'
	stopwatchCard.classList.add('hide-card')
	timerCard.classList.add('hide-card')

	appName.style.display = 'none'
	openWeatherPopup()
}

// start of application

const buttonBox = document.querySelector('.button-box')
const showCardBtns = document.querySelectorAll('.show-card-btn')
const spans = document.querySelectorAll('.btn-name')
const cardWrapper = document.querySelector('.card-wrapper')
const weatherBookmark = document.querySelector('.weather-bookmark')
const timerBookmark = document.querySelector('.timer-bookmark')
const stopwatchBookmark = document.querySelector('.stopwatch-bookmark')

const stopwatchRollUpBtn = document.querySelector('.stopwatch-roll-up')
const timerRollUpBtn = document.querySelector('.timer-roll-up')
const weatherRollUpBtn = document.querySelector('.weather-roll-up')

let root = document.documentElement

const handleStopwatchInstrucions = () => {
	stopwatchInfo.classList.toggle('active')
}
const handleTimerInstrucions = () => {
	timerInfo.classList.toggle('active')
}
const handleWeatherInstrucions = () => {
	weatherInfo.classList.toggle('active')
}

const setTheButtons = () => {
	buttonBox.classList.add('button-box-done')

	showCardBtns.forEach(btn => {
		btn.classList.add('show-card-btn-done')
	})

	spans.forEach(span => {
		span.classList.add('btn-name-done')
	})

	root.style.setProperty('--1before-width', '32px')
	root.style.setProperty('--1before-height', '32px')
	root.style.setProperty('--1before-top', '-3%')
	root.style.setProperty('--1before-left', '-1px')

	buttonBox.style.bottom = '3rem'
	buttonBox.style.width = '100%'
	buttonBox.style.padding = '0.7rem'
	buttonBox.classList.add('done')

	cardWrapper.style.height = '95%'
	cardWrapper.style.bottom = 'auto'
}

const activateAnimationOfBtns = () => {
	root.style.setProperty('--animation-left', 'shift-left 2.5s .5s ease')
	root.style.setProperty('--animation-right', 'shift-right 2.5s .5s ease')
}

const activateCardAnimation = () => {
	const cardArr = [weatherPopup, stopwatchCard, timerCard]

	cardArr.forEach(card => {
		setTimeout(() => {
			card.classList.add('animation-card')
		}, 200)
	})
}

const connectTheDotsWeather = () => {
	if (!buttonBox.classList.contains('done')) {
		activateAnimationOfBtns()
		setTimeout(() => {
			showWeather()
			setTheButtons()
			activateCardAnimation()
		}, 1500)
	} else {
		openWeatherPopup()
		showWeather()

		weatherCard.classList.add('hide-card')
	}
}
const connectTheDotsTimer = () => {
	if (!buttonBox.classList.contains('done')) {
		activateAnimationOfBtns()
		setTimeout(() => {
			showTimer()
			setTheButtons()
			activateCardAnimation()
		}, 1500)
	} else {
		setTheButtons()
		showTimer()
	}
}
const connectTheDotsStopwatch = () => {
	if (!buttonBox.classList.contains('done')) {
		activateAnimationOfBtns()
		setTimeout(() => {
			showStopwatch()
			setTheButtons()
			activateCardAnimation()
		}, 1500)
	} else {
		setTheButtons()
		showStopwatch()
		// stopwatchHistoryPage.style.zIndex = '-1'
		stopwatchPage.style.zIndex = '1'
	}
}

showWeatherBtn.addEventListener('click', connectTheDotsWeather)
showTimerBtn.addEventListener('click', connectTheDotsTimer)
showStopwatchBtn.addEventListener('click', connectTheDotsStopwatch)

stopwatchBookmark.addEventListener('click', handleStopwatchInstrucions)
timerBookmark.addEventListener('click', handleTimerInstrucions)
weatherBookmark.addEventListener('click', handleWeatherInstrucions)

stopwatchRollUpBtn.addEventListener('click', handleStopwatchInstrucions)
timerRollUpBtn.addEventListener('click', handleTimerInstrucions)
weatherRollUpBtn.addEventListener('click', handleWeatherInstrucions)

const screenWidth = window.innerWidth
console.log(screenWidth)
