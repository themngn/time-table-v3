<template>
    <div class="course">
        <h1>This is an courses page</h1>
        <ul>
            <li class="courseData" v-for="course in courses" :key="course._id">
                <h3>{{ course.name }}</h3>
                <button
                    class="loadClasses"
                    v-if="!course.classesData"
                    @click="syncFetch(course)"
                >
                    Load Classes
                </button>
                <div v-else-if="course.classesData.length == 0">
                    <ul class="classDataList">
                        <li>No classes</li>
                    </ul>
                </div>
                <ul class="classDataList">
                    <li
                        class="classData"
                        v-for="classData in course.classesData"
                    >
                        {{ classData.day_of_week }}
                        {{ classData.start_time }}-{{ classData.end_time }}
                        {{ classData.type }}
                    </li>
                </ul>
                <button
                    class="loadClasses"
                    v-if="course.classesData"
                    @click="addClass(course._id)"
                >
                    AddClass
                </button>
            </li>
        </ul>
    </div>
    <AddClassModal
        v-if="modalOpen"
        :courseID="activeCourse"
        @close="modalOpen = false"
    />
</template>

<script>
import AddClassModal from "@/components/AddClassModal.vue";
export default {
    name: "CoursesView",
    components: { AddClassModal },
    data() {
        return {
            courses: [],
            activeCourse: null,
            modalOpen: false,
        };
    },
    methods: {
        async fetchCourses() {
            const response = await fetch("http://localhost:3000/api/courses", {
                methods: "GET",
            });
            this.courses = await response.json();
        },
        async fetchClassDetails(course) {
            console.log("fetching class details");
            const response = await fetch(
                `http://localhost:3000/api/courses/${course._id}/classes`,
                {
                    methods: "GET",
                }
            );
            let classDetails = await response.json();
            console.log(classDetails);
            course.classesData = classDetails;
        },
        syncFetch(course) {
            this.fetchClassDetails(course);
        },
        addClass(courseID) {
            this.activeCourse = courseID;
            this.modalOpen = true;
        },
    },
    mounted() {
        this.fetchCourses();
    },
};
</script>

<style>
h1 {
    width: 100%;
    text-align: center;
}
.course {
    min-height: 10vh;
}
.classData {
    list-style-type: none;
}
.classDataList {
    list-style: none;
}
.courseData {
    list-style: none;
    border: 0 solid black;
    border-radius: 5px;
    margin: 1rem;
    padding: 1rem;
    background-color: #333;
}
h3 {
    color: white;
    font-weight: bold;
}
.loadClasses {
    background-color: #444;
    color: white;
    border: 0;
    border-radius: 5px;
    padding: 0.5rem;
    margin: 0.5rem;
}
.loadClasses:hover {
    background-color: #555;
}
.loadClasses:active {
    background-color: #666;
}
</style>
