<template>
    <div class="auth-background"></div>
    <div v-if="!firstStepCompleted" class="auth-container-step-first">
        <div class="auth-title">
            <span>Вход или регистрация</span>
            <svg @click="closeAuth" class="svg-close-auth" width="6.25vw" height="6.25vw" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.625 4.375L4.375 15.625M15.625 15.625L4.375 4.375" stroke="#0B0B0B" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>            
        </div>
        <div>
            <input type="tel" name="phone" placeholder="Номер телефона" class="auth-input-phone" @blur="handleBlur" @focus="handleFocus" v-model="v.authPhoneNumber.$model">  
            <div v-if="showError" class="form-error">{{v.authPhoneNumber.$errors[0]?.$message}}</div>
        </div>
        <button v-if="v.authPhoneNumber.$model.length !== 10" class="button-code-submit-disabled">Отправить код</button>
        <button v-else class="button-code-submit" @click="codeSubmit"><img v-if="buttonName === `Ждём...`" src="/wait.svg" alt="" class="wait-svg">{{ buttonName || `Отправить код` }}</button>
    </div>
    <div v-else class="auth-container-step-second">
        <div class="auth-title">
            <span>Вход или регистрация</span>
            <svg @click="closeAuth" class="svg-close-auth" width="6.25vw" height="6.25vw" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.625 4.375L4.375 15.625M15.625 15.625L4.375 4.375" stroke="#0B0B0B" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>            
        </div>
        <div>
            <input type="text" name="code" placeholder="Код из SMS" class="auth-input-code" @blur="handleBlur" @focus="handleFocus" v-model="v.smsCode.$model"> 
        <div v-if="showError" class="form-error">{{v.smsCode.$errors[0]?.$message}}</div>
        </div>        
        <button v-if="v.smsCode.$model.length !== 4" class="button-agree-disabled">Подтвердить</button> 
        <button v-else class="button-agree" @click="codeAgree"><img v-if="buttonName === `Ждём...`" src="/wait.svg" alt="" class="wait-svg">{{ buttonName || `Подтвердить` }}</button>
        <span v-if="num > 0" class="code-timer">Отправить код снова через {{num}} секунд</span>
        <span v-else class="code-send-again" @click="firstStepCompleted=false">Отправить код ещё раз</span>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import useVuelidate from '@vuelidate/core'
import { minLength, maxLength, helpers, numeric } from '@vuelidate/validators'
import { useStore } from 'vuex';

const store = useStore();

const props = defineProps({
    closeAuth: Function
})

const isAuth = computed(() => store.state.authModule.isAuth);
const firstStepCompleted = ref(false);
const authPhoneNumber = ref('');
const smsCode = ref('');
const num = ref(null);

const buttonName = ref('');

const rules = {
  authPhoneNumber: {
    numeric: helpers.withMessage('Номер телефона состоит из цифр', numeric),
    minLength: helpers.withMessage('Номер телефона содержит 10 цифр', minLength(10)),
    maxLength: helpers.withMessage('Номер телефона содержит 10 цифр', maxLength(10))      
  },
  smsCode: {
    numeric: helpers.withMessage('Код из SMS состоит из цифр', numeric),
    minLength: helpers.withMessage('Код из SMS состоит из 4 цифр', minLength(4)),
    maxLength: helpers.withMessage('Код из SMS состоит из 4 цифр', maxLength(4))      
  }
};

const v = useVuelidate(rules, {authPhoneNumber, smsCode});

const showError = ref(false);

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

const codeSubmit = () => {
    buttonName.value = 'Ждём...';
    if (!v.value.$invalid) {
        firstStepCompleted.value = true;
        startTimer();
    }
    buttonName.value = '';
}

let timerInterval;

const startTimer = () => {
    num.value = 30;
    timerInterval = setInterval(() => {
        if (num.value > 0) {
            num.value--;
        } else {
            clearInterval(timerInterval);
        }
    }, 1000);
}

const codeAgree = () => {
    buttonName.value = 'Ждём...';
    if (!v.value.$invalid) {
        store.commit('setAuth', true);
        alert('Вы успешно авторизовались!');
    }
    props.closeAuth();
    buttonName.value = '';
}
</script>
