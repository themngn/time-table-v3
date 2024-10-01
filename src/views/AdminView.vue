<template>
    <div class="about">
        <h1>This is an admin page</h1>
        <ul v-for="group in groups" :key="group._id">
            <li @click="fetchTimetable(group._id)">{{ group.name }}</li>
        </ul>
        <br />
        <ul v-for="lesson in timetable" :key="lesson._id">
            <li>
                {{ lesson.name }}
                <ul v-for="cclass in lesson.classes" :key="cclass._id">
                    <li>
                        {{ cclass.day_of_week }} {{ cclass.start_time }}
                        {{ cclass.end_time }} {{ cclass.type }}
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "AdminView",
    components: {},
    data() {
        return {
            groups: [],
            timetable: [],
        };
    },
    methods: {
        async fetchGroups() {
            const response = await fetch(`/api/groups`, {
                methods: "GET",
            });
            this.groups = await response.json();
        },
        async fetchTimetable(id) {
            const response = await fetch(`/api/groups/${id}/timetable`);
            this.timetable = await response.json();
            console.log(this.timetable);
        },
    },
    mounted() {
        this.fetchGroups();
    },
};
</script>

<style>
.about {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
</style>
