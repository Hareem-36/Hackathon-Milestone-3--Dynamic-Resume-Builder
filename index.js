"use strict";
// Get the form and resume sections
const form = document.getElementById('builder-form');
const generatedResume = document.getElementById('generatedResume');
const resumeContent = document.querySelector('.resume-content');
const backToFormBtn = document.getElementById('backToForm');
// Get the different sections of the resume
const nameSection = document.getElementById('nameSection');
const profSection = document.getElementById('profSection');
const aboutInfo = document.getElementById('aboutInfo');
const contactInfo = document.getElementById('contactInfo');
const educationInfo = document.getElementById('educationInfo');
const experienceInfo = document.getElementById('experienceInfo');
const languageInfo = document.getElementById('languageInfo');
const skillsInfo = document.getElementById('skillsInfo');
const profileImage = document.getElementById('profileImage');
// Add event listener for the "Generate Resume" button
form.addEventListener('submit', (event) => {
    event.preventDefault();
    generateResume();
});
// Add event listener for the "Back" button
backToFormBtn.addEventListener('click', () => {
    generatedResume.classList.add('hidden');
    form.classList.remove('hidden');
});
// Add event listener for the "Add Education" button
document.getElementById('addEducation').addEventListener('click', () => {
    addEducationField();
});
// Add event listener for the "Add Experience" button
document.getElementById('addExperience').addEventListener('click', () => {
    addExperienceField();
});
// Add event listener for the "Add Language" button
document.getElementById('addLanguage').addEventListener('click', () => {
    addLanguageField();
});
function generateResume() {
    // Get the form data
    const fullName = document.getElementById('fullName').value;
    const profession = document.getElementById('ProfName').value;
    const about = document.getElementById('about').value;
    const phone = document.getElementById('phone').value;
    const website = document.getElementById('website').value;
    const address = document.getElementById('address').value;
    // Get the education data
    const educationFields = document.querySelectorAll('.education-entry');
    const educationData = [];
    educationFields.forEach((field) => {
        const degree = field.querySelector('.degree').value;
        const institution = field.querySelector('.institution').value;
        const year = field.querySelector('.year').value;
        educationData.push({ degree, institution, year });
    });
    // Get the experience data
    const experienceFields = document.querySelectorAll('.experience-entry');
    const experienceData = [];
    experienceFields.forEach((field) => {
        const position = field.querySelector('.position').value;
        const company = field.querySelector('.company').value;
        const duration = field.querySelector('.duration').value;
        const description = field.querySelector('.description').value;
        experienceData.push({ position, company, duration, description });
    });
    // Get the language data
    const languageFields = document.querySelectorAll('.language-entry');
    const languageData = [];
    languageFields.forEach((field) => {
        const language = field.querySelector('.language').value;
        const proficiency = field.querySelector('.proficiency').value;
        languageData.push({ language, proficiency });
    });
    // Get the skills data
    const skillInput = document.getElementById('skillInput');
    const skillsData = skillInput.value.split(',').map((skill) => skill.trim());
    // Populate the resume sections
    nameSection.textContent = fullName;
    profSection.textContent = profession;
    aboutInfo.textContent = about;
    contactInfo.innerHTML = `
    <p>${phone}</p>
    <p>${website}</p>
    <p>${address}</p>
  `;
    educationInfo.innerHTML = educationData
        .map((item) => `
    <div>
      <h3> ≫ ${item.degree}</h3>
      <p> ${item.institution}</p>
      <p>  ${item.year}</p>
    </div>
  `).join('');
    experienceInfo.innerHTML = experienceData
        .map((item) => `
    <div>
      <h3> ≫ ${item.position}</h3>
      <p> ${item.company}</p>
      <p>${item.duration}</p>
      <p>${item.description}</p>
    </div>
  `).join('');
    languageInfo.innerHTML = languageData
        .map((item) => `
    <div>
      <p> ≫ ${item.language}</p>
      <p>${item.proficiency}</p>
    </div>
  `).join('');
    skillsInfo.innerHTML = skillsData
        .map((skill) => `<span class="skill-tag">${skill}</span>`)
        .join('');
    // Set the profile image
    const photo = document.getElementById('photo');
    if (photo.files && photo.files.length > 0) {
        const profilePic = URL.createObjectURL(photo.files[0]);
        profileImage.style.backgroundImage = `url(${profilePic})`;
    }
    // Show the generated resume and hide the form
    generatedResume.classList.remove('hidden');
    form.classList.add('hidden');
}
function addEducationField() {
    const educationFields = document.getElementById('educationFields');
    const newField = document.createElement('div');
    newField.classList.add('education-entry');
    newField.innerHTML = `
    <div class="form-group">
      <label>Degree</label>
      <input type="text" class="degree">
    </div>
    <div class="form-group">
      <label>Institution</label>
      <input type="text" class="institution">
    </div>
    <div class="form-group">
      <label>Year</label>
      <input type="text" class="year">
    </div>
  `;
    educationFields.appendChild(newField);
}
function addExperienceField() {
    const experienceFields = document.getElementById('experienceFields');
    const newField = document.createElement('div');
    newField.classList.add('experience-entry');
    newField.innerHTML = `
    <div class="form-group">
      <label>Position</label>
      <input type="text" class="position">
    </div>
    <div class="form-group">
      <label>Company</label>
      <input type="text" class="company">
    </div>
    <div class="form-group">
      <label>Duration</label>
      <input type="text" class="duration">
    </div>
    <div class="form-group">
      <label>Description</label>
      <textarea class="description" rows="3"></textarea>
    </div>
  `;
    experienceFields.appendChild(newField);
}
function addLanguageField() {
    const languageFields = document.getElementById('languageFields');
    const newField = document.createElement('div');
    newField.classList.add('language-entry');
    newField.innerHTML = `
    <div class="form-group">
      <label> ≫ Language</label>
      <input type="text" class="language">
    </div>
    <div class="form-group">
      <label>Proficiency</label>
      <select class="proficiency">
        <option value="Basic">Basic</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Advanced">Advanced</option>
        <option value="Native">Native</option>
      </select>
    </div>
  `;
    languageFields.appendChild(newField);
}
