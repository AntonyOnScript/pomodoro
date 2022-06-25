<script setup lang="ts">
import Timer from './Timer.vue'
import { reactive, computed , ref } from 'vue'
import { MainState } from '@/types'
import CrazyApple from '@/assets/lottie/crazy-apple.json'

interface ButtonState {
    color: string,
    text: string
}

const appleAnimation = ref()

const state: MainState = reactive({
    start: false,
    itsColdTime: false
})

const buttonState = computed<ButtonState>(() => {
    if (!state.start) {
        return {
            color: 'primary',
            text: 'Start Pomodoro'
        }
    }
    if (state.itsColdTime) {
        return {
            color: 'secondary',
            text: 'Stop relax time (restart now!)'
        }
    }
    
    return {
        color: 'negative',
        text: 'Stop Pomodoro'
    }
})

function handleChangeTimeColdness(): void {
    if (!state.itsColdTime) {
        appleAnimation.value.pause()
    } else {
        appleAnimation.value.play()
    }

    state.itsColdTime = !state.itsColdTime
}

function handleButtonAction(): void {
    if (!state.start) {
        appleAnimation.value.play()
        state.start = true
        return
    }
    if (state.itsColdTime) {
        appleAnimation.value.play()
        state.start = !state.start
        state.itsColdTime = false
        state.start = !state.start
        return
    }
    console.log(appleAnimation.value)
    appleAnimation.value.pause()
    state.start = false
}
</script>

<template>
    <div
        class="column items-center q-my-xl"
    >
        <lottie-animation
            ref="appleAnimation"
            :animationData="CrazyApple"
            :loop="true"
        />
        <Timer 
            class="timer"
            :start="state.start"
            :itsColdTime="state.itsColdTime"
            @timeZero="handleChangeTimeColdness()" 
        />
        <q-btn 
            class="q-mt-lg"
            @click="handleButtonAction()"
            push
            :color="buttonState.color"
        >
            {{ buttonState.text }}
        </q-btn>
    </div>
</template>

<style scoped>
    .timer {
        font-size: 2rem;
        font-weight: 600;
        text-transform: capitalize;
    }
</style>
