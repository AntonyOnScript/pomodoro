<script setup lang="ts">
import Timer from './Timer.vue'
import { reactive} from 'vue'

const state: { start: boolean } = reactive({
    start: false
})

</script>

<template>
    <div>
        <Timer :start="state.start" @timeZero="state.start = false" />
        <button @click="state.start = !state.start">{{ !state.start ? 'Start' : 'Stop' }} Pomodoro</button>
    </div>
</template>

<style scoped>
</style>
