<template>
    <div class="course">
        <div class="days">
            <div class="weekday" v-for="day in days">
                <div class="day-title">{{ daysInUkr[day] }}</div>
                <div class="classes">
                    <div
                        class="class"
                        :class="{
                            odd: classData.biweekly && classData.biweekly_week,
                            even:
                                classData.biweekly && !classData.biweekly_week,
                        }"
                        v-for="classData in timetable[day]"
                    >
                        <div
                            class="class-time"
                            :class="{
                                odd:
                                    classData.biweekly &&
                                    classData.biweekly_week,
                                even:
                                    classData.biweekly &&
                                    !classData.biweekly_week,
                                lecture: classData.type == `Lecture`,
                                practice: classData.type == `Practice`,
                                lab: classData.type == `Lab`,
                                seminar: classData.type == `Seminar`,
                            }"
                        >
                            {{ classData.start_time }}
                            <br />
                            {{ classData.end_time }}
                            <div v-if="classData.biweekly == true">
                                <div v-if="classData.biweekly_week">Чис.</div>
                                <div v-else>Знам.</div>
                            </div>
                        </div>
                        <div class="datablock">
                            <div class="class-name">
                                {{ classData.course }}
                            </div>
                            <div class="class-teacher">
                                {{ classData.teacher }}
                            </div>
                            <a
                                v-if="classData.link"
                                class="class-room"
                                :href="classData.link"
                            >
                                {{
                                    displayPlace(classData.room, classData.link)
                                }}
                            </a>
                            <div v-else class="class-room">
                                {{
                                    displayPlace(classData.room, classData.link)
                                }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "UserView",
    data() {
        return {
            userID: "",
            timetable: {},
            days: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
            ],
            daysInUkr: {
                Monday: "Понеділок",
                Tuesday: "Вівторок",
                Wednesday: "Середа",
                Thursday: "Четвер",
                Friday: "П'ятниця",
                Saturday: "Субота",
                Sunday: "Неділя",
            },
            offlineMode: false,
        };
    },
    methods: {
        async fetchTimetable(userID) {
            //check if the user ID is valid (^[0-9a-f]{24}$)
            if (!/^[0-9a-f]{24}$/.test(userID)) {
                alert("Invalid user ID");
                return;
            }
            const response = await fetch(`/api/users/${userID}/timetable`, {
                methods: "GET",
            }).then((response) => {
                if (response.status == 404) {
                    this.offlineMode = true;
                    return;
                }
                return response;
            });
            let response_json = await response.json();
            if (response_json == null) {
                this.offlineMode = true;
                return;
            }
            this.timetable = response_json;
        },
        linkToAppName(link) {
            if (!link) return "None";
            if (link.includes("zoom")) return "Zoom";
            if (link.includes("teams")) return "Teams";
            if (link.includes("meet")) return "Google Meet";
            return "Other";
        },
        displayPlace(room, link) {
            if (room && link) return `${room} / ${this.linkToAppName(link)}`;
            if (room) return room;
            if (link) return this.linkToAppName(link);
            return "Місце встрєчі знайти ніззя блядь!";
        },
    },
    mounted() {
        let userID = localStorage.getItem("userID");
        userID = "66cae85934a410fb0e543090";
        if (userID) {
            console.log(userID);
            this.userID = userID;
            this.fetchTimetable(userID);
        }
    },
};
</script>

<style>
.days {
    display: flex;
    justify-content: space-around;
    margin-top: 1rem;
    flex-wrap: wrap;
    gap: 1rem;
}
.weekday {
    width: 300px;
    /* min-height: 600px; */
    background-color: #333;
    color: white;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    overflow: hidden;
    flex-grow: 1;
}
.day-title {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    text-align: center;
}
.classes {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.5rem;
}
.class {
    background-color: #444;
    border-radius: 15px;
    padding: 0;
    display: flex;
    align-items: center;
    height: 125px;
    gap: 0.5rem;
}
.class-time {
    padding: 1rem;
    position: relative;
    width: 50px;
    min-width: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: green;
    border-radius: 15px;
    height: 125px;
    color: black;
}
.class-name {
    font-weight: bold;
    height: 50px;
    display: flex;
    align-items: center;
}

.datablock {
    width: 250px;
    flex-grow: 1;
}

/* @media (max-width: 768px) {
    .course {
        padding: 0rem;
        margin: 0rem;
    }
    .weekday {
        width: 100%;
    }
    .class {
        flex-direction: column;
        width: 100%;
        height: auto;
    }
    .class-time {
        width: 100%;
    }
    body,
    html {
        margin: 0;
        padding: 0;
    }
} */
.odd {
    border-radius: 15px 15px 0 0;
    margin-bottom: -0.25rem;
}
.even {
    border-radius: 0 0 15px 15px;
    margin-top: -0.25rem;
}
.class-time {
    margin: 0;
}

.lecture {
    background: rgb(251, 188, 4);
}
.practice {
    background-color: #4285f4;
}
.lab {
    background-color: #b7e1cd;
}
.seminar {
    background-color: #4285f4;
}

a {
    color: white;
    text-decoration: none;
}
</style>
