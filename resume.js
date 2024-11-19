function getResumeData() {
    var urlParams = new URLSearchParams(window.location.search);
    var encodedResumeData = urlParams.get('data');
    if (encodedResumeData) {
        try {
            return JSON.parse(decodeURIComponent(encodedResumeData));
        }
        catch (error) {
            console.error('Error decoding resume data:', error);
        }
    }
    return null;
}
function displaySharedResume(resume) {
    if (resume) {
        var resumeContainer = document.getElementById('resume-container');
        var resumeHTML = "\n            <h2>".concat(resume.firstName, " ").concat(resume.lastName, "</h2>\n            <p>Email: ").concat(resume.email, "</p>\n            <p>Phone: ").concat(resume.phone, "</p>\n            <h3>Skills:</h3>\n            <ul>\n                ").concat(resume.skills.map(function (skill) { return "<li>".concat(skill, "</li>"); }).join(''), "\n            </ul>\n            <h3>Education:</h3>\n            ").concat(resume.education.map(function (edu) { return "\n                <div>\n                    <h4>".concat(edu.school, " (").concat(edu.graduationYear, ")</h4>\n                    <p>").concat(edu.degree, "</p>\n                </div>\n            "); }).join(''), "\n            <h3>Experience:</h3>\n            ").concat(resume.experience.map(function (exp) { return "\n                <div>\n                    <h4>".concat(exp.company, "</h4>\n                    <p>Title: ").concat(exp.jobtitle, " (").concat(exp.duration, ")</p>\n                    <p>").concat(exp.details, "</p>\n                </div>\n            "); }).join(''), "\n        ");
        resumeContainer.innerHTML = resumeHTML;
    }
}
var resumeData = getResumeData();
if (resumeData) {
    displaySharedResume(resumeData);
}
else {
    var resumeContainer = document.getElementById('resume-container');
    resumeContainer.innerText = 'No resume data found.';
}
