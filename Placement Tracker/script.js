let applications = JSON.parse(localStorage.getItem("applications")) || [];

const form = document.getElementById("appForm");
const list = document.getElementById("appList");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const app = {
        company: company.value,
        role: role.value,
        stage: stage.value,
        result: result.value,
        date: formatDate(date.value)
    };

    applications.push(app);
    saveAndRender();
    form.reset();
});

function formatDate(input) {
    const d = new Date(input);
    return `${String(d.getDate()).padStart(2,'0')}-${String(d.getMonth()+1).padStart(2,'0')}-${d.getFullYear()}`;
}

function saveAndRender() {
    localStorage.setItem("applications", JSON.stringify(applications));
    renderList();
    updateSummary();
}

function renderList() {
    list.innerHTML = "";
    applications.forEach((app, index) => {
        list.innerHTML += `
            <tr>
                <td>${app.company}</td>
                <td>${app.role}</td>
                <td>${app.stage}</td>
                <td>${app.result}</td>
                <td>${app.date}</td>
                <td>
                    <button class="delete-btn" onclick="deleteApp(${index})">Delete</button>
                </td>
            </tr>
        `;
    });
}

function deleteApp(index) {
    applications.splice(index, 1);
    saveAndRender();
}

function updateSummary() {
    total.innerText = applications.length;
    interviews.innerText = applications.filter(a => a.stage === "Interview").length;
    offers.innerText = applications.filter(a => a.stage === "Offer").length;
    rejections.innerText = applications.filter(a => a.result === "Rejected").length;
}

saveAndRender();
