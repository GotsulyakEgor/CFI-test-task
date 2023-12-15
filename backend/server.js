const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

const courses = [
    {
        id: 1,
        name: 'Angular Basics',
        imageUrl: 'https://picsum.photos/100/100',
        status: 'In Progress',
        instructors: [
            {
                name: "John",
                image: 'https://picsum.photos/100/100'
            },
            {
                name: "Anna",
                image: 'https://picsum.photos/100/100'
            }
        ]
    },
    {
        id: 2,
        name: 'React Basics',
        imageUrl: 'https://picsum.photos/100/100',
        status: 'Completed',
        instructors: [
            {
                name: "Henry",
                image: 'https://picsum.photos/100/100'
            },
            {
                name: "Anna",
                image: 'https://picsum.photos/100/100'
            }
        ]
    },
    {
        id: 3,
        name: 'Vue Basics',
        imageUrl: 'https://picsum.photos/100/100',
        status: 'New',
        instructors: [
            {
                name: "Henry",
                image: 'https://picsum.photos/100/100'
            },
            {
                name: "Anna",
                image: 'https://picsum.photos/100/100'
            }
        ]
    },
];

app.get('/courses', (req, res) => {
    res.json(courses);
});

app.get('/courses/:id', (req, res) => {
    const courseId = parseInt(req.params.id);
    const course = courses.find(c => c.id === courseId);

    if (course) {
        res.json(course);
    } else {
        res.status(404).json({error: 'Course not found'});
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
