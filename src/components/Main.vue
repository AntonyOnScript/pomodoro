<script setup lang="ts">
import Timer from './Timer.vue'
import { reactive, computed } from 'vue'
import { MainState } from '@/types'

const state: MainState = reactive({
    start: false,
    itsColdTime: false
})

const buttonState = computed<String>(() => {
    if (!state.start) {
        return 'Start Pomodoro'
    }
    if (state.itsColdTime) {
        return 'Stop relax time (restart now!)'
    }
    
    return 'Stop Pomodoro'
})

function handleChangeTimeColdness(): void {
    state.itsColdTime = !state.itsColdTime
}

function handleButtonAction(): void {
    if (!state.start) {
        state.start = true
        return
    }
    if (state.itsColdTime) {
        state.start = !state.start
        state.itsColdTime = false
        state.start = !state.start
        return
    }

    state.start = false
}
</script>

<template>
    <div>
        <Timer 
            :start="state.start"
            :itsColdTime="state.itsColdTime"
            @timeZero="handleChangeTimeColdness()" 
        />
        <button @click="handleButtonAction()">{{ buttonState }}</button>
    </div>
</template>

<style scoped>
</style>
