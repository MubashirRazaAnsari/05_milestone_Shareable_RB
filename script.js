var resumeDisplay = document.getElementById("resume-display");
var form = document.getElementById("resume-form");
var editResume = document.getElementById('editResume');
var shareLink = document.getElementById('shareLink');
function generateResume(event) {
    event.preventDefault();
    resumeDisplay.style.display = "flex";
    editResume.style.display = "block";
    form.style.display = "none";
    shareLink.style.display = "block";
    var firstName = document.getElementById("firstName")
        .value;
    var lastName = document.getElementById("lastName")
        .value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var skills = document.getElementById("skills").value
        .split(",")
        .map(function (skill) { return skill.trim(); });
    var experience = [];
    var experienceElements = document.querySelectorAll(".experience-entry");
    experienceElements.forEach(function (entry) {
        var jobtitle = entry.querySelector(".jobtitle")
            .value;
        var companyName = entry.querySelector(".companyName").value;
        var duration = entry.querySelector(".duration")
            .value;
        var details = entry.querySelector(".details")
            .value;
        experience.push({
            jobtitle: jobtitle,
            company: companyName,
            duration: duration,
            details: details,
        });
    });
    var education = [];
    var educationElements = document.querySelectorAll(".education-entry");
    educationElements.forEach(function (entry) {
        var degree = entry.querySelector(".degree").value;
        var school = entry.querySelector(".school").value;
        var graduationYear = entry.querySelector(".graduationYear").value;
        education.push({
            degree: degree,
            school: school,
            graduationYear: graduationYear,
        });
    });
    var resume = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        skills: skills,
        experience: experience,
        education: education,
    };
    console.log("Saving resume to localStorage:", resume);
    localStorage.setItem("resume", JSON.stringify(resume));
    displayResume(resume);
}
function displayResume(resume) {
    var resumeHTML = "\n  <main class=\"main-container\">\n    <div class=\"black-section\">\n    <h1>".concat(resume.firstName, " ").concat(resume.lastName, "</h1>\n    <p>Email: ").concat(resume.email, "</p>\n    <p>Phone: ").concat(resume.phone, "</p> \n      <div>\n        <h2>Skills:</h2>\n        <ul>\n          ").concat(resume.skills.map(function (skill) { return "<li>".concat(skill, "</li>"); }).join(""), "\n        </ul>\n      </div>\n      <div>\n        <h2>Education:</h2>\n        ").concat(resume.education
        .map(function (edu) { return "\n            <div class=\"education\">\n            <h4>".concat(edu.school, " <span class=\"educ-span\">").concat(edu.graduationYear, "</span></h4>\n            <h3>").concat(edu.degree, "</h3>\n            </div>"); })
        .join(""), "\n        </div>\n\n    </div>\n        <h2>Experience:</h2>\n        ").concat(resume.experience
        .map(function (exp) { return "\n            <div class=\"experience\">\n            <h4>".concat(exp.company, " </h4>\n            <h3>").concat(exp.jobtitle, "<span>").concat(exp.duration, "</span></h3>\n              <p>").concat(exp.details, "</p>\n            </div>"); })
        .join(""), "\n      </div>  \n   \n      \n    </main>\n  ");
    resumeDisplay.innerHTML = resumeHTML;
    editResume.addEventListener("click", goToEditMode);
}
form.addEventListener("submit", generateResume);
function addExperienceFields() {
    var experienceContainer = document.getElementById("experience-container");
    var newExperienceEntry = document.createElement("div");
    newExperienceEntry.classList.add("experience-entry");
    newExperienceEntry.innerHTML = "\n    <input type=\"text\" class=\"jobtitle\" placeholder=\"Job Title\" required>\n    <input type=\"text\" class=\"companyName\" placeholder=\"Company Name\" required>\n    <input type=\"text\" class=\"duration\" placeholder=\"Duration\" required>\n    <textarea class=\"details\" placeholder=\"Job Details\" required></textarea>\n  ";
    experienceContainer.appendChild(newExperienceEntry);
}
function addEducationFields() {
    var educationContainer = document.getElementById("education-container");
    var newEducationEntry = document.createElement("div");
    newEducationEntry.classList.add("education-entry");
    newEducationEntry.innerHTML = "\n    <input type=\"text\" class=\"degree\" placeholder=\"Degree\" required>\n    <input type=\"text\" class=\"school\" placeholder=\"School\" required>\n    <input type=\"text\" class=\"graduationYear\" placeholder=\"Graduation Year\" required>\n    <textarea class=\"educationDetails\" placeholder=\"Details\" required></textarea>\n  ";
    educationContainer.appendChild(newEducationEntry);
}
var addExperienceButton = document.getElementById("addExperience");
addExperienceButton.addEventListener("click", addExperienceFields);
var addEducationButton = document.getElementById("addEducation");
addEducationButton.addEventListener("click", addEducationFields);
function goToEditMode() {
    // Retrieve data from localStorage
    var storedResume = localStorage.getItem("resume");
    if (storedResume) {
        var resume = JSON.parse(storedResume);
        // Populate form fields
        document.getElementById("firstName").value = resume.firstName;
        document.getElementById("lastName").value = resume.lastName;
        document.getElementById("email").value = resume.email;
        document.getElementById("phone").value = resume.phone;
        document.getElementById("skills").value = resume.skills.join(", ");
        var experienceContainer_1 = document.getElementById("experience-container");
        experienceContainer_1.innerHTML = "";
        resume.experience.forEach(function (exp, index) {
            var newExperienceEntry = document.createElement("div");
            newExperienceEntry.classList.add("experience-entry");
            newExperienceEntry.innerHTML = "\n        <input type=\"text\" class=\"jobtitle\" value=\"".concat(exp.jobtitle, "\" placeholder=\"Job Title\" />\n        <input type=\"text\" class=\"companyName\" value=\"").concat(exp.company, "\" placeholder=\"Company Name\" />\n        <input type=\"text\" class=\"duration\" value=\"").concat(exp.duration, "\" placeholder=\"Duration\" />\n        <textarea class=\"details\" placeholder=\"Details\">").concat(exp.details, "</textarea>\n      ");
            experienceContainer_1.appendChild(newExperienceEntry);
        });
        var educationContainer_1 = document.getElementById("education-container");
        educationContainer_1.innerHTML = "";
        resume.education.forEach(function (edu) {
            var newEducationEntry = document.createElement("div");
            newEducationEntry.classList.add("education-entry");
            newEducationEntry.innerHTML = "\n        <input type=\"text\" class=\"degree\" value=\"".concat(edu.degree, "\" placeholder=\"Degree\" />\n        <input type=\"text\" class=\"school\" value=\"").concat(edu.school, "\" placeholder=\"School Name\" />\n        <input type=\"text\" class=\"graduationYear\" value=\"").concat(edu.graduationYear, "\" placeholder=\"Graduation Year\" />\n      ");
            educationContainer_1.appendChild(newEducationEntry);
        });
        form.style.display = "block";
        editResume.style.display = "none";
        resumeDisplay.style.display = "none";
        shareLink.style.display = "none";
    }
}
shareLink.addEventListener('click', function () {
    var resumeData = localStorage.getItem('resume');
    if (!resumeData) {
        alert("No resume data found!");
        return;
    }
    var encodedData = encodeURIComponent(resumeData);
    var baseUrl = "".concat(window.location.origin, "/resume.html?data=").concat(encodedData);
    navigator.clipboard.writeText(baseUrl).then(function () {
        alert('Shareable link has been copied to clipboard!');
    });
});
