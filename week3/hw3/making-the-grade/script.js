


const grades = "jim|3.2, nahum|3.8, mary|4.0, anna|1.8, ted|2.4, frank|2.5, lisa|2.9, mike|3.6, ahnita|3.5, vishaya|3.5";

// This converts grades string to array of objects
const students = grades.split(', ').map(student => {
    const [name, score] = student.split('|');
    return {
        name: name.charAt(0).toUpperCase() + name.slice(1),
        score: parseFloat(score)
    };
});

// This calculate statistics
const totalStudents = students.length;
const scores = students.map(student => student.score);
const lowestScore = Math.min(...scores);
const highestScore = Math.max(...scores);
const averageScore = (scores.reduce((a, b) => a + b, 0) / totalStudents).toFixed(2);

// This sort and display student list
const studentListHtml = `
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Grade</th>
            </tr>
        </thead>
        <tbody>
            ${students
                .sort((a, b) => a.name.localeCompare(b.name))
                .map(student => `
                    <tr>
                        <td>${student.name}</td>
                        <td>${student.score}</td>
                    </tr>
                `).join('')}
        </tbody>
    </table>
`;

// Display more about statistics
const statsHtml = `
    <h3>Statistics</h3>
    <div>Total Students: ${totalStudents}</div>
    <div>Lowest Score: ${lowestScore}</div>
    <div>Highest Score: ${highestScore}</div>
    <div>Average Score: ${averageScore}</div>
`;

document.getElementById('studentList').innerHTML = studentListHtml;
document.getElementById('stats').innerHTML = statsHtml;

