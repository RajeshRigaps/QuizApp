const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Question = require("./models/Question");

dotenv.config();
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error(err));

// Sample Questions
const questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Tech Machine Learning",
            "Hyperlink and Text Management Language",
            "Home Tool Markup Language"
        ],
        correctAnswer: "Hyper Text Markup Language"
    },
    {
        question: "Which data structure uses LIFO (Last In, First Out) principle?",
        options: ["Queue", "Stack", "Linked List", "Heap"],
        correctAnswer: "Stack"
    },
    {
        question: "What is the time complexity of binary search in a sorted array?",
        options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
        correctAnswer: "O(log n)"
    },
    {
        question: "Which of the following is not a programming language?",
        options: ["Python", "Java", "HTML", "C++"],
        correctAnswer: "HTML"
    },
    {
        question: "Which of the following sorting algorithms has the best average-case time complexity?",
        options: ["Bubble Sort", "Merge Sort", "Selection Sort", "Insertion Sort"],
        correctAnswer: "Merge Sort"
    },
    {
        question: "What does CSS stand for?",
        options: [
            "Computer Style Sheets",
            "Cascading Style Sheets",
            "Colorful Style Sheets",
            "Creative Style Sheets"
        ],
        correctAnswer: "Cascading Style Sheets"
    },
    {
        question: "Which one is not an operating system?",
        options: ["Windows", "Linux", "Java", "MacOS"],
        correctAnswer: "Java"
    },
    {
        question: "Which keyword is used to define a function in JavaScript?",
        options: ["def", "function", "fun", "define"],
        correctAnswer: "function"
    },
    {
        question: "Which company developed the Java programming language?",
        options: ["Microsoft", "Sun Microsystems", "Google", "IBM"],
        correctAnswer: "Sun Microsystems"
    },
    {
        question: "What does SQL stand for?",
        options: [
            "Structured Query Language",
            "Sequential Query Language",
            "Standard Query Language",
            "System Query Language"
        ],
        correctAnswer: "Structured Query Language"
    },
    {
        question: "Which of the following is a NoSQL database?",
        options: ["MySQL", "PostgreSQL", "MongoDB", "Oracle"],
        correctAnswer: "MongoDB"
    },
    {
        question: "What is the main purpose of an operating system?",
        options: [
            "To manage computer hardware and software",
            "To compile code",
            "To browse the internet",
            "To create applications"
        ],
        correctAnswer: "To manage computer hardware and software"
    },
    {
        question: "Which programming language is primarily used for web development?",
        options: ["C++", "Java", "Python", "JavaScript"],
        correctAnswer: "JavaScript"
    },
    {
        question: "What does API stand for?",
        options: [
            "Application Programming Interface",
            "Advanced Programming Integration",
            "Automated Process Implementation",
            "Application Processing Interface"
        ],
        correctAnswer: "Application Programming Interface"
    },
    {
        question: "Which logic gate returns true only if both inputs are true?",
        options: ["OR", "AND", "XOR", "NOR"],
        correctAnswer: "AND"
    },
    {
        question: "Which of the following is an example of system software?",
        options: ["Microsoft Word", "Adobe Photoshop", "Windows 10", "Google Chrome"],
        correctAnswer: "Windows 10"
    },
    {
        question: "Which data structure is used to implement recursion?",
        options: ["Queue", "Stack", "Linked List", "Array"],
        correctAnswer: "Stack"
    },
    {
        question: "Which protocol is used to transfer web pages?",
        options: ["FTP", "HTTP", "SMTP", "TCP"],
        correctAnswer: "HTTP"
    },
    {
        question: "Which type of network covers a small geographical area, such as a home or office?",
        options: ["WAN", "MAN", "LAN", "VPN"],
        correctAnswer: "LAN"
    },
    {
        question: "Which of the following is not a database management system?",
        options: ["MySQL", "MongoDB", "Python", "PostgreSQL"],
        correctAnswer: "Python"
    },
    {
        question: "What does the 'C' in CPU stand for?",
        options: ["Central", "Core", "Computer", "Cache"],
        correctAnswer: "Central"
    },
    {
        question: "Which of the following is used to uniquely identify a record in a relational database?",
        options: ["Foreign Key", "Primary Key", "Index", "View"],
        correctAnswer: "Primary Key"
    },
    {
        question: "Which language is primarily used for artificial intelligence and machine learning?",
        options: ["C++", "Java", "Python", "Ruby"],
        correctAnswer: "Python"
    },
    {
        question: "Which of the following is a valid variable name in JavaScript?",
        options: ["2name", "my-name", "let", "_myVariable"],
        correctAnswer: "_myVariable"
    },
    {
        question: "Which of these is not an example of an object-oriented programming principle?",
        options: ["Encapsulation", "Inheritance", "Polymorphism", "Compilation"],
        correctAnswer: "Compilation"
    },
    {
        question: "Which of the following is an interpreted language?",
        options: ["C", "Java", "Python", "C++"],
        correctAnswer: "Python"
    },
    {
        question: "Which company developed the C programming language?",
        options: ["Microsoft", "Apple", "Bell Labs", "Google"],
        correctAnswer: "Bell Labs"
    },
    {
        question: "What does RAM stand for?",
        options: [
            "Randomly Accessed Memory",
            "Read And Modify",
            "Read Access Memory",
            "Random Access Memory"
        ],
        correctAnswer: "Random Access Memory"
    },
    {
        question: "What is the primary function of an operating system’s kernel?",
        options: [
            "Managing system resources",
            "Providing a user interface",
            "Running applications",
            "Controlling display settings"
        ],
        correctAnswer: "Managing system resources"
    },
    {
        question: "Which sorting algorithm has the worst-case time complexity of O(n^2)?",
        options: ["Merge Sort", "Quick Sort", "Bubble Sort", "Heap Sort"],
        correctAnswer: "Bubble Sort"
    }
];
// Insert Data
const insertQuestions = async () => {
    try {
        await Question.deleteMany(); // Clears old questions
        await Question.insertMany(questions);
        console.log("Questions Inserted!");
        mongoose.connection.close();
    } catch (error) {
        console.error("Error inserting questions:", error);
        mongoose.connection.close();
    }
};

insertQuestions();
