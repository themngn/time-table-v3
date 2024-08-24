# Time Table V3

Simple full stack web application to create and manage time tables for schools, colleges, etc.

## Branches

-   **['front-end'](https://example.com) branch contains the frontend code of the application write with Vue.js.**
-   **['back-end'](https://gitlab.com/mngn/time-table-v3/-/tree/back-end) branch contains the backend code of the application write with node.js.**

## Structure

### 4 data types

-   **Choice** : A choice between two or more grops.
-   **Group** : A group with a list of courses and subchoices.
-   **Course** : A course with a list lessons.
-   **Lesson** : A lesson with a schedule.

Example:

Group named "Copmuter engineering" with 2 courses: "Math", "Physics", and 1 subchoice "Foreign language".

-   Subchoice "Foreign language" with 4 groups: "A1", "A2", "B1", "B2".
-   Each of the 4 groups has 1 courses at respective levels.
-   All courses have lessons with their schedules.

Student assigned to "Computer engineering" receives a schedule with "Math", "Physics" and the choice between "Foreign language" groups. The student can choose one of the 4 groups.
