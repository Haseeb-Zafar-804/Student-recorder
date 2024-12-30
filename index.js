class Student {
    constructor(id, name, address) {
        this.id = id;
        this.name = name;
        this.address = address;
    }
}

const students = [
    new Student(1, "Alice", "123 Maple St"),
    new Student(2, "Bob", "456 Oak Ave"),
    new Student(3, "Charlie", "789 Pine Rd"),
    new Student(4, "Diana", "101 Birch Blvd"),
    new Student(5, "Eve", "202 Cedar Ln"),
];

const studentTable = document.querySelector("#studentTable tbody");
const overlay = document.getElementById("overlay");
const popup = document.getElementById("popup");
const studentDetails = document.getElementById("studentDetails");
const editPopup = document.getElementById("editPopup");
const toast = document.getElementById("toast");

const closePopup = () => {
    popup.style.display = "none";
    overlay.style.display = "none";
    editPopup.style.display = "none";
};

overlay.addEventListener("click", closePopup);

const renderTable = () => {
    studentTable.innerHTML = "";
    students.forEach(student => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.address}</td>
            <td>
                <button class="edit-btn" onclick="editStudent(${student.id})">
                    <i class="fa-regular fa-pen"></i> Edit
                </button>
                <button class="delete-btn" onclick="deleteStudent(${student.id})">
                    <i class="fa-regular fa-trash"></i> Delete
                </button>
            </td>
        `;
        studentTable.appendChild(row);
    });
};

const deleteStudent = (id) => {
    const index = students.findIndex(student => student.id === id);
    if (index !== -1) {
        students.splice(index, 1);
        renderTable();
        showToast("Student deleted successfully");
    }
};

const editStudent = (id) => {
    const student = students.find(s => s.id === id);
    if (student) {
        editPopup.innerHTML = `
            <h3>Edit Student</h3>
            <form onsubmit="saveEdit(event, ${id})">
                <label>ID (Read Only):</label><br>
                <input type="text" value="${student.id}" readonly><br>
                <label>Name:</label><br>
                <input type="text" id="editName" value="${student.name}" required><br>
                <label>Address:</label><br>
                <input type="text" id="editAddress" value="${student.address}" required><br>
                <button type="button" class="close-btn" onclick="closePopup()">Cancel</button>
                <button type="submit" class="save-btn">Save</button>
            </form>
        `;
        editPopup.style.display = "block";
        overlay.style.display = "block";
    }
};

const saveEdit = (event, id) => {
    event.preventDefault();
    const name = document.getElementById("editName").value;
    const address = document.getElementById("editAddress").value;

    const student = students.find(s => s.id === id);
    if (student) {
        student.name = name;
        student.address = address;
    }

    closePopup();
    renderTable();
    showToast("Student updated successfully");
};

const showToast = (message) => {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
};

renderTable();