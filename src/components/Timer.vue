<script lang="ts" setup>
import { computed, reactive } from '@vue/reactivity'
import { watch } from 'vue'
import { secondsToMinutes } from 'date-fns'

const props = defineProps<{
    start: boolean
}>()

const defaultTime = 15 * 60

const emits = defineEmits<{
    (e: 'timeZero', value: boolean): void
}>()

const state: { time: number, stopped: boolean } = reactive({
    time: defaultTime,
    stopped: true
})

const shownTimeValue = computed((): string => {
    const minutes = secondsToMinutes(state.time)
    if(minutes > 0) {
        return `${minutes} minutes remaining`
    } else {
        return `${state.time} seconds remaining`
    }
})

const mustRun = computed((): boolean => {
    if(props.start) return true
    return false
})

watch(mustRun, (value) => {
    if(value) {
        state.stopped = false
        runTiming()
    } else {
        stopTiming()
    }
})

function runTiming() {
    if (!state.stopped) {
        state.time--
        if(state.time === 0) {
            emits('timeZero', true)
            return
        }
        setTimeout(runTiming, 1000)
    }

    return
}

function stopTiming() {
    state.time = defaultTime
    state.stopped = true
}
</script>

<template>
    <div v-if="props.start">
        {{ shownTimeValue }}    
    </div>
    <div v-else>
        click start pomodoro to start the count down.
    </div>
</template>