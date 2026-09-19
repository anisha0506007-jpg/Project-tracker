const progressForm = document.getElementById("progressForm");
const progressContainer =document.getElementById("progressContainer");
const message =document.getElementById("message");
progressForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const studentName =document.getElementById("studentName").value;
    const courseName =document.getElementById("courseName").value;
    const completionPercentage =
        Number(
            document.getElementById("completionPercentage").value
        );
    const progressData = {
        studentName: studentName,
        courseName: courseName,
        completionPercentage: completionPercentage
    };
    try {
        const response = await fetch(
            "https://project-tracker-7oaq.onrender.com/progress",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(progressData)
            }
        );

        const data = await response.json();
        if (!response.ok) {
            throw new Error(
                data.message || "Something went wrong"
            );
        }
        message.textContent ="Progress added successfully!";
        progressForm.reset();
        getProgress();

    } catch (error) {
        console.log(error);
        message.textContent ="Failed to add progress.";
    }
});
async function getProgress() {
    try {
        const response =
            await fetch(
                "https://project-tracker-7oaq.onrender.com/progress"
            );
        const progress =
            await response.json();
        if (!response.ok) {
            throw new Error(
                "Failed to get progress"
            );
        }
        progressContainer.innerHTML = "";
        if (progress.length === 0) {
            progressContainer.innerHTML = `
                <p>No student progress found.</p>
            `;
            return;
        }
        progress.forEach((item) => {
            const card =document.createElement("div");
            card.className ="progress-card";
            card.innerHTML = `
                <h3>${item.studentName}</h3>
                <p><strong>Course:</strong> ${item.courseName}
                </p>
                <p><strong>Completion:</strong> ${item.completionPercentage}%
                </p>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${item.completionPercentage}%"
                    ></div>
                </div>
                <p class="percentage">
                    ${item.completionPercentage}%
                </p>
            `;
            progressContainer.appendChild(card);
        });
    } catch (error) {
        console.log(error);
        progressContainer.innerHTML = `
            <p>
                Failed to load student progress.
            </p>
        `;
    }
}

getProgress();