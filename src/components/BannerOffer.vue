<template>
    <div class="offer-container">
        <form class="offer-form">
            <div class="offer-form-text">
                <span class="offer-form-text-heading">покупаем Б/у сноуборды и зимнюю экипировку</span>
                <span class="offer-form-text-paragraph">Оставьте свои данные и приложите фото вещей, которые хотите продать и мы сами заберем ваши вещи в удобное для вас время.</span>
            </div>
            <div class="offer-form-inputs-container">
                <div class="offer-form-inputs">
                    <div class="offer-form-input-wrapper">
                        <input type="text" class="offer-form-input" placeholder="Ваше имя" v-model="v.nameRef.$model" @blur="handleBlur" @focus="handleFocus">
                        <div v-if="showError" class="form-error">{{v.nameRef.$errors[0]?.$message}}</div>
                    </div> 
                    <div class="offer-form-input-wrapper">
                        <input type="tel" class="offer-form-input" placeholder="Номер телефона" v-model="v.phoneNumberRef.$model" @blur="handleBlur" @focus="handleFocus">
                        <div v-if="showError" class="form-error">{{v.phoneNumberRef.$errors[0]?.$message}}</div>
                    </div>             
                    <div class="offer-form-input">
                        <div class="custom-select" ref="dropdownDateRef">
                            <div class="select-selected-icon" @click="toggleDropdownDate">
                                <div class="select-selected">{{ selectedDate || 'Выберите дату' }}</div>
                                <svg v-if="dropdownDateOpen" @click.stop="toggleDropdownDate" class="svg-dropdown" width="6.25vw" height="6.25vw" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 7L10 13L16 7" stroke="#0B0B0B" stroke-linecap="round" transform="rotate(180, 10, 10)" />
                                </svg>
                                <svg v-else @click.stop="toggleDropdownDate" class="svg-dropdown" width="6.25vw" height="6.25vw" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 7L10 13L16 7" stroke="#0B0B0B" stroke-linecap="round"/>
                                </svg>
                            </div>                            
                            <div class="select-items" v-show="dropdownDateOpen">
                                <div class="select-item" v-for="date in dates" :key="date" @click="selectDate(date)">{{ date }}</div>
                            </div>
                        </div>                                                  
                    </div>
                    <div class="offer-form-input">
                        <div class="custom-select" ref="dropdownTimeRef">
                            <div class="select-selected-icon" @click="toggleDropdownTime">
                                <div class="select-selected">{{ selectedTime || 'Выберите время' }}</div>
                                <svg v-if="dropdownTimeOpen" @click.stop="toggleDropdownTime" class="svg-dropdown" width="6.25vw" height="6.25vw" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 7L10 13L16 7" stroke="#0B0B0B" stroke-linecap="round" transform="rotate(180, 10, 10)" />
                                </svg>
                                <svg v-else @click.stop="toggleDropdownTime" class="svg-dropdown" width="6.25vw" height="6.25vw" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 7L10 13L16 7" stroke="#0B0B0B" stroke-linecap="round"/>
                                </svg>
                            </div>                            
                            <div class="select-items" v-show="dropdownTimeOpen">
                                <div class="select-item" v-for="time in times" :key="time" @click="selectTime(time)">{{ time }}</div>
                            </div>
                        </div>                                                  
                    </div>                   
                </div>
                <div class="offer-form-rating">
                    <label class="custom-radio">
                        <input type="radio" class="radio-input" value="Хорошее состояние" v-model="rating">
                        <span class="radio-mark"></span>
                        Хорошее состояние
                    </label>
                    <label class="custom-radio">
                        <input type="radio" class="radio-input" value="Плохое состояние" v-model="rating"> 
                        <span class="radio-mark"></span>
                        Плохое состояние
                    </label>
                </div>
                <div class="file-upload-container" @change="handleFileUpload">
                    <svg class="svg-clip" width="6.25vw" height="6.25vw" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path @change="handleFileUpload" d="M7.91069 6.74541V14.0294C7.91939 14.5621 8.14425 15.0701 8.53674 15.4437C8.92924 15.8174 9.4579 16.0269 10.0086 16.0269C10.5594 16.0269 11.088 15.8174 11.4805 15.4437C11.873 15.0701 12.0979 14.5621 12.1066 14.0294L12.1134 4.48197C12.1191 4.02671 12.0313 3.57489 11.8552 3.15269C11.679 2.73048 11.4179 2.34631 11.0871 2.02242C10.7563 1.69854 10.3623 1.44139 9.92801 1.26588C9.49368 1.09037 9.02766 1 8.55696 1C8.08625 1 7.62023 1.09037 7.18591 1.26588C6.75158 1.44139 6.3576 1.69854 6.02678 2.02242C5.69597 2.34631 5.43492 2.73048 5.25875 3.15269C5.08258 3.57489 4.99481 4.02671 5.00052 4.48197V14.0937C4.99093 14.7347 5.11316 15.3711 5.36011 15.9659C5.60705 16.5607 5.97378 17.1021 6.43898 17.5587C6.90417 18.0152 7.45855 18.3777 8.06988 18.6251C8.68122 18.8726 9.3373 19 10 19C10.6627 19 11.3188 18.8726 11.9301 18.6251C12.5414 18.3777 13.0958 18.0152 13.561 17.5587C14.0262 17.1021 14.3929 16.5607 14.6399 15.9659C14.8868 15.3711 15.0091 14.7347 14.9995 14.0937V5.11188" stroke="#0B0B0B" stroke-miterlimit="10" stroke-linecap="round"/>
                    </svg>
                    <input type="file" accept="image/*" class="offer-form-upload" id="file-upload" />
                    <label for="file-upload" class="file-upload-label">Приложить файл</label>
                </div>
                <div class="file-upload-text">
                    <span class="photo-file-name">{{ photoFile ? photoFile.name : '' }}</span>
                    <svg v-if="photoFile" @click="removePhotoFile" class="svg-remove" width="6.25vw" height="6.25vw" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.75 5.25L5.25 18.75M18.75 18.75L5.25 5.25"  transform="scale(0.8)" stroke="#0B0B0B" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>                
                <button type="button" class="offer-form-submit" @click="formSubmit"><img v-if="buttonName === `Ждём...`" src="/wait.svg" alt="" class="wait-svg">{{ buttonName || `Отправить` }}</button>
            </div>
        </form>
        <img class="offer-picture" src="/offer-picture.png" alt="">
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import useVuelidate from '@vuelidate/core'
import { minLength, maxLength, helpers, numeric } from '@vuelidate/validators'
import { computed } from 'vue';
import { useStore } from 'vuex';

const props = defineProps({
    showToast: Function
})

const store = useStore();

const nameRef = ref('');
const phoneNumberRef = ref('');

const selectedDate = computed(() => store.state.formModule.selectedDate);
const dates = computed(() => store.state.formModule.dates);
const dropdownDateOpen = computed(() => store.state.formModule.dropdownDateOpen);

const selectedTime = computed(() => store.state.formModule.selectedTime);
const times = computed(() => store.state.formModule.times);
const dropdownTimeOpen = computed(() => store.state.formModule.dropdownTimeOpen);

const rules = {
  nameRef: {
    minLength: helpers.withMessage('Длина имени не менее 3-х букв', minLength(3)),
    },
  phoneNumberRef: {
    numeric: helpers.withMessage('Номер телефона состоит из цифр', numeric),
    minLength: helpers.withMessage('Номер телефона содержит 10 цифр', minLength(10)),
    maxLength: helpers.withMessage('Номер телефона содержит 10 цифр', maxLength(10))
    }
};

const v = useVuelidate(rules, {nameRef, phoneNumberRef});

const showError = ref(false);

const dropdownDateRef = ref(null);
const dropdownTimeRef = ref(null);

const rating = ref('');

const photoFile = ref(null); 

const buttonName = ref('');


const handleBlur = () => {
    if (!v.value.$invalid) {
        showError.value = false;
    } else {
        showError.value = true;
    }
};

const handleFocus = () => {
    showError.value = false;
};

const toggleDropdownDate = () => {
    store.dispatch('toggleDropdownDate');
};

const toggleDropdownTime = () => {
    store.dispatch('toggleDropdownTime');
};

const selectDate = (date) => {
    store.dispatch('selectDate', date);
};

const selectTime = (time) => {
    store.dispatch('selectTime', time);
};

const handleClickOutside = (event) => {
    if (dropdownDateRef.value && !dropdownDateRef.value.contains(event.target)) {
        store.dispatch('handleClickOutsideDate');
    }
    if (dropdownTimeRef.value && !dropdownTimeRef.value.contains(event.target)) {
        store.dispatch('handleClickOutsideTime');
    }
};

const handleFileUpload = (event) => {
    photoFile.value = event.target.files[0];
};

const removePhotoFile = () => {
    photoFile.value = null;
};
const formSubmit = () => {
    if (nameRef.value && phoneNumberRef.value && !showError.value && photoFile.value && selectedDate.value && selectedTime.value && rating.value) {
        buttonName.value = 'Ждём...';
        props.showToast({ severity: 'success', summary: 'Ваша заявка принята!', detail: 'Мы скоро свяжемся с вами', life: 5000 });
        nameRef.value = '';
        phoneNumberRef.value = '';
        photoFile.value = null;
        store.dispatch('resetDateTime');
        rating.value = '';
    } else {
        props.showToast({ severity: 'error', summary: 'Заявка отклонена!', detail: 'Заполните все поля формы', life: 5000 });
    }
    buttonName.value = '';
};

onMounted(() => {
    store.dispatch('generateDates');
    document.addEventListener('click', handleClickOutside);
});

</script>
