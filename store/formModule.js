const formModule = {
    state: {
        selectedDate: '',
        dates: [],
        dropdownDateOpen: false,
        selectedTime: '',
        times: ['10:00-12:00', '12:00-14:00', '14:00-16:00','16:00-18:00'],
        dropdownTimeOpen: false,
    },
    mutations: {
        updateDates(state, dates) {
            state.dates = dates;
        },
        updateSelectedDate(state, date) {
            state.selectedDate = date;
        },
        updateDropdownDate(state, value) {
            state.dropdownDateOpen = value;
        },
        updateSelectedTime(state, time) {
            state.selectedTime = time;
        },
        updateDropdownTime(state, value) {
            state.dropdownTimeOpen = value;
        }
    },
    actions: {
        generateDates({ state, commit }) {
            const today = new Date();
            // Добавляем 14 дней к текущей дате
            for (let i = 1; i <= 14; i++) {
                const nextDate = new Date(today);
                nextDate.setDate(today.getDate() + i);
                state.dates.push(nextDate.toLocaleDateString('ru-RU'));
            }
            commit('updateDates', state.dates);
        },
        toggleDropdownDate({ state, commit }) {
            if (state.dropdownDateOpen) {
                commit('updateDropdownDate', false);
            } else {
                commit('updateDropdownDate', true);
            }
        },
        selectDate({ commit }, date) {            
            commit('updateSelectedDate', date);
            commit('updateDropdownDate', false);
        },
        toggleDropdownTime({ state, commit }) {
            if (state.dropdownTimeOpen) {
                commit('updateDropdownTime', false);
            } else {
                commit('updateDropdownTime', true);
            }
        },
        selectTime({ commit }, time) {
            commit('updateSelectedTime', time);
            commit('updateDropdownTime', false);
        },
        handleClickOutsideDate({ commit }) {
            commit('updateDropdownDate', false);
        },
        handleClickOutsideTime({ commit }) {
            commit('updateDropdownTime', false);
        },
        resetDateTime({ commit }) {
            commit('updateSelectedDate', '');
            commit('updateSelectedTime', '');
        }
    }
};

export default formModule