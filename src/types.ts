export interface MainState {
    start: boolean,
    itsColdTime: boolean
}

export interface TimerState {
    time: number,
    stopped: boolean,
    itsColdTime: boolean
}