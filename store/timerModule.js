const timerModule = {
  state: {
    eventDate: new Date("2024-12-31T23:59:59").getTime(),
    countdown: {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isEventPassed: false,
    },
    timerInterval: null,
  },
  mutations: {
    updateCountdown(state, { days, hours, minutes, seconds }) {
      state.countdown.days = days;
      state.countdown.hours = hours;
      state.countdown.minutes = minutes;
      state.countdown.seconds = seconds;
    },
    setEventPassed(state, value) {
      state.countdown.isEventPassed = value;
    },
    setTimerInterval(state, interval) {
      state.timerInterval = interval;
    },
  },
  actions: {
    calculateCountdown({ state, commit }) {
      const now = new Date().getTime();
      const distance = state.eventDate - now;

      if (distance < 0) {
        commit('setEventPassed', true);
        clearInterval(state.timerInterval);
      } else {
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);
        seconds < 10 ? (seconds = `0${seconds}`) : seconds;
        minutes < 10 ? (minutes = `0${minutes}`) : minutes;
        hours < 10 ? (hours = `0${hours}`) : hours;

        commit('updateCountdown', { days, hours, minutes, seconds });
      }
    },
    startCountdown({ dispatch, commit }) {   
      dispatch('calculateCountdown');   
      const timerInterval = setInterval(() => {
        dispatch('calculateCountdown');
      }, 1000);
      commit('setTimerInterval', timerInterval);
    },
    stopCountdown({ state }) {
      clearInterval(state.timerInterval);
    },
  },
};
  
  export default timerModule