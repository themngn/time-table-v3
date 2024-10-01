<template>
    <div class="course">
        <h1>This is an user page</h1>
        <input
            v-model="userID"
            type="text"
            placeholder="Enter your user ID"
            @change="
                fetchGroups(userID);
                fetchChoices(userID);
                saveUserID(userID);
            "
        />

        <ul>
            <li v-for="choice in choices">
                <div>{{ choice.name }}</div>
                <ul>
                    <li v-for="option in choice.subgroups">
                        <input
                            type="radio"
                            v-model="chose[choice._id]"
                            :value="option._id"
                            :id="option._id"
                        />
                        <label :for="option._id">{{
                            groups[option._id]
                        }}</label>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
    <AddClassModal
        v-if="modalOpen"
        :courseID="activeCourse"
        @close="modalOpen = false"
        @refresh="fetchCourses"
    />
</template>

<script>
export default {
    name: "UserView",
    data() {
        return {
            userID: "",
            choices: [],
            chose: [],
            userGroups: [],
            groups: {},
            url: import.meta.env.BASE_URL,
        };
    },
    methods: {
        async fetchChoices(userID) {
            //check if the user ID is valid (^[0-9a-f]{24}$)
            if (!/^[0-9a-f]{24}$/.test(userID)) {
                alert("Invalid user ID");
                return;
            }
            const response = await fetch(`/api/users/${userID}/choices`, {
                methods: "GET",
            });
            this.choices = await response.json();
            //fill the chose dictionary with places for the user to choose from
            this.chose = {};
            for (let i = 0; i < this.choices.length; i++) {
                //if userGroups contains one of the choices, set it as the default
                for (let j = 0; j < this.userGroups.length; j++) {
                    console.log(this.choices[i].subgroups);
                    for (let k = 0; k < this.choices[i].subgroups.length; k++) {
                        console.log(this.choices[i].subgroups[k]._id);
                        console.log(this.userGroups[j]);
                        if (
                            this.choices[i].subgroups[k]._id ===
                            this.userGroups[j]
                        ) {
                            this.chose[this.choices[i]._id] =
                                this.userGroups[j];
                        }
                    }
                    if (this.chose[this.choices[i]._id] === undefined) {
                        this.chose[this.choices[i]._id] =
                            this.choices[i].subgroups[0]._id;
                    }
                }
            }
        },
        async fetchGroups(userID) {
            //check if the user ID is valid (^[0-9a-f]{24}$)
            if (!/^[0-9a-f]{24}$/.test(userID)) {
                alert("Invalid user ID");
                return;
            }
            const response = await fetch(`/api/users/${userID}`, {
                methods: "GET",
            });
            this.userGroups = await response.json();
            this.userGroups = this.userGroups.groups;
        },
        async groupList() {
            const response = await fetch(`/api/groups`, {
                methods: "GET",
            });
            let groupsStr = await response.json();
            //parse the groups into a dictionary
            for (let i = 0; i < groupsStr.length; i++) {
                this.groups[groupsStr[i]._id] = groupsStr[i].name;
            }
        },
        async saveUserID(userID) {
            localStorage.setItem("userID", userID);
        },
    },
    mounted() {
        const userID = localStorage.getItem("userID");
        if (userID) {
            this.userID = userID;
            this.fetchGroups(userID);
            this.fetchChoices(userID);
            this.groupList();
        }
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
    border-radius: 5px;
    padding: 0.5rem;
}
</style>
