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
                    {{ fetchClassDetails(course) }}
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
                        <div v-if="classData.biweekly == true">
                            Every {{ classData.biweekly_week }}
                        </div>
                        <button
                            class="deleteButton"
                            @click="deleteClass(course._id, classData._id)"
                        >
                            X
                        </button>
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
        <div class="addBlock">
            <input class="addBlockPart" type="text" v-model="courseName" />
            <button class="addBlockPart" @click="addClass()">Add Class</button>
        </div>
    </div>
    <AddClassModal
        v-if="modalOpen"
        :courseID="activeCourse"
        @close="modalOpen = false"
        @refresh="fetchCourses"
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
            const response = await fetch(
                `http://localhost:3000/api/courses/${course._id}/classes`,
                {
                    methods: "GET",
                }
            );
            let classDetails = await response.json();
            course.classesData = classDetails;
        },
        syncFetch(course) {
            this.fetchClassDetails(course);
        },
        addClass(courseID) {
            this.activeCourse = courseID;
            this.modalOpen = true;
        },
        async deleteClass(courseID, classID) {
            const response = await fetch(
                `http://localhost:3000/api/courses/${courseID}/classes/${classID}`,
                {
                    method: "DELETE",
                }
            );
            this.fetchCourses();
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
    background-color: #555;
    border-radius: 5px;
    margin: 0.5rem;
    padding: 0 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.classDataList {
    list-style: none;
    background-color: #444;
    border-radius: 5px;
    padding: 0.125rem;
    color: #fff;
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
    margin-bottom: 0.5rem;
}
.loadClasses {
    background-color: #444;
    color: white;
    border: 0;
    border-radius: 5px;
    padding: 0.5rem;
    margin-top: 1rem;
}
.loadClasses:hover {
    background-color: #555;
}
.loadClasses:active {
    background-color: #666;
}
.deleteButton {
    background-color: rgb(207, 0, 0);
    color: white;
    border: 0;
    border-radius: 5px;
    margin: 0.5rem;
    width: 1.5rem;
    height: 1.5rem;
}
.deleteButton:hover {
    background-color: rgb(207, 50, 50);
}
.deleteButton:active {
    background-color: rgb(207, 100, 100);
}
ul {
    padding: 0;
}
.addBlock {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: row;
    width: 100%;
}
button .addBlockPart {
    background-color: #333;
}
.addBlockPart {
    margin-bottom: 1rem;
    height: 38px;
    background-color: #333;
    border: 0;
    color: #fff;
    width: 40%;
}
</style>
