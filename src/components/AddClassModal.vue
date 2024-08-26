<template>
    <div class="modal-mask">
        <div class="modal-container">
            <div class="form">
                <label for="day_of_week">Day of Week</label>
                <select class="line" id="day_of_week" v-model="day_of_week">
                    <option
                        v-for="day in days_of_week"
                        :key="day"
                        :value="day"
                        v-text="day"
                    ></option>
                </select>
                <label for="isWeekly">Is {{ isWeekly }}</label>
                <div class="line radio">
                    <input type="radio" v-model="isWeekly" :value="weekly" />
                    <label for="weekly">Weekly</label>
                    <input type="radio" v-model="isWeekly" :value="first" />
                    <label for="first">First</label>
                    <input type="radio" v-model="isWeekly" :value="second" />
                    <label for="second">Second</label>
                </div>
                <label for="start_time">Start Time</label>
                <VueDatePicker
                    class="line"
                    v-model="start_time"
                    time-picker
                    dark
                />
                <label for="end_time">End Time</label>
                <VueDatePicker
                    class="line"
                    v-model="end_time"
                    time-picker
                    dark
                />
                <label for="type">Type</label>
                <select class="line" id="type" v-model="type">
                    <option
                        v-for="type in types"
                        :key="type"
                        :value="type"
                        v-text="type"
                    ></option>
                </select>
                <button
                    class="button create"
                    type="submit"
                    @click="addClass(courseID)"
                >
                    Add Class
                </button>
                <button
                    class="button close"
                    type="button"
                    @click="$emit('close')"
                >
                    Close
                </button>
            </div>
        </div>
    </div>
</template>
<script>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

export default {
    props: {
        courseID: String,
    },
    name: "AddClassModal",
    components: { VueDatePicker },
    data() {
        return {
            day_of_week: "Monday",
            start_time: {
                hours: 8,
                minutes: 40,
            },
            end_time: {
                hours: 10,
                minutes: 15,
            },
            type: "Lecture",
            days_of_week: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
            ],
            isWeekly: "weekly",
            types: ["Lecture", "Seminar", "Lab", "Practicum"],
        };
    },
    methods: {
        async addClass(courseID) {
            console.log("adding class");
            let start_time = `${this.start_time.hours}:${this.start_time.minutes}`;
            let end_time = `${this.end_time.hours}:${this.end_time.minutes}`;
            console.log(start_time, end_time);
            console.log(this.day_of_week, this.type);
            const response = await fetch(
                `http://localhost:3000/api/courses/${courseID}/classes`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        day_of_week: this.day_of_week,
                        start_time: start_time,
                        end_time: end_time,
                        type: this.type,
                    }),
                }
            );
            console.log(response);
        },
    },
};
</script>
<style>
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}
.modal-container {
    width: 300px;
    margin: 150px auto;
    padding: 20px 30px;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    background-color: #333;
}
.form {
    display: flex;
    flex-direction: column;
}
.line {
    margin-bottom: 1rem;
    height: 38px;
}
select {
    background-color: #222;
    color: white;
    border-radius: 5px;
    border: none;
    padding: 0.5rem;
}
.button {
    color: white;
    border: none;
    border-radius: 5px;
    padding: 0.5rem;
    cursor: pointer;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
}
.create {
    background-color: #4caf50;
}
.create:hover {
    background-color: #4caf70;
}
.create:active {
    background-color: #4caf30;
}
.close {
    background-color: #f44336;
}
.close:hover {
    background-color: #f44356;
}
.close:active {
    background-color: #f44316;
}
</style>
