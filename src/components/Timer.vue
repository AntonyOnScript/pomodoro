<script lang="ts" setup>
import { computed, reactive } from '@vue/reactivity'
import { watch } from 'vue'
import { secondsToMinutes } from 'date-fns'
import { TimerState } from '@/types'

const defaultTime = (15 * 60) + 10

const props = defineProps<{
    start: boolean,
    itsColdTime: boolean
}>()

const state = reactive<TimerState>({
    time: defaultTime,
    stopped: false,
    itsColdTime: false
})

const shownTimeValue = computed((): string => {
    const minutes = secondsToMinutes(state.time)
    if (minutes > 0) {
        return `${minutes} minutes remaining`
    } else {
        return `${state.time} seconds remaining`
    }
})

const mustRun = computed((): boolean => {
    if (props.start) return true
    return false
})

const isItColdTime = computed((): boolean => {
    if (props.itsColdTime) return true
    return false
})

const emits = defineEmits<{
    (e: 'timeZero', value: boolean): void
}>()

watch(mustRun, (value): void => {
    if (value) {
        state.stopped = false
        runTiming()
    } else {
        stopTiming()
    }
})

watch(isItColdTime, (value): void => {
    state.itsColdTime = value
    state.time = defaultTime
})

function runTiming(): void {
    if (!state.stopped) {
        state.time--
        if (state.time === 0) {
            emits('timeZero', true)
            state.time = defaultTime
        }
        setTimeout(runTiming, 10)
    }

    return
}

function stopTiming(): void {
    state.time = defaultTime
    state.stopped = true
}
</script>

<template class="timer">
    <div v-if="props.start">
        {{ shownTimeValue }}    
    </div>
    <div v-else>
        click start pomodoro to start the count down.
    </div>
</template>

<style scoped>
    .timer {
        font-size: 2rem;
        font-weight: 600;
        text-transform: capitalize;
    }
</style>