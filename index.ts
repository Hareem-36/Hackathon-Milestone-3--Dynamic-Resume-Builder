// Get the form and resume sections
const form = document.getElementById('builder-form') as HTMLFormElement;
const generatedResume = document.getElementById('generatedResume') as HTMLElement;
const resumeContent = document.querySelector('.resume-content') as HTMLElement;
const backToFormBtn = document.getElementById('backToForm') as HTMLButtonElement;

// Get the different sections of the resume
const nameSection = document.getElementById('nameSection') as HTMLElement;
const profSection = document.getElementById('profSection') as HTMLElement;
const aboutInfo = document.getElementById('aboutInfo') as HTMLElement;
const contactInfo = document.getElementById('contactInfo') as HTMLElement;
const educationInfo = document.getElementById('educationInfo') as HTMLElement;
const experienceInfo = document.getElementById('experienceInfo') as HTMLElement;
const languageInfo = document.getElementById('languageInfo') as HTMLElement;
const skillsInfo = document.getElementById('skillsInfo') as HTMLElement;
const profileImage = document.getElementById('profileImage') as HTMLElement;

// Add event listener for the "Generate Resume" button
form.addEventListener('submit', (event: SubmitEvent) => {
  event.preventDefault();
  generateResume();
});

// Add event listener for the "Back" button
backToFormBtn.addEventListener('click', () => {
  generatedResume.classList.add('hidden');
  form.classList.remove('hidden');
});

// Add event listener for the "Add Education" button
(document.getElementById('addEducation') as HTMLButtonElement).addEventListener('click', () => {
  addEducationField();
});

// Add event listener for the "Add Experience" button
(document.getElementById('addExperience') as HTMLButtonElement).addEventListener('click', () => {
  addExperienceField();
});

// Add event listener for the "Add Language" button
(document.getElementById('addLanguage') as HTMLButtonElement).addEventListener('click', () => {
  addLanguageField();
});

function generateResume(): void {
  // Get the form data
  const fullName = (document.getElementById('fullName') as HTMLInputElement).value;
  const profession = (document.getElementById('ProfName') as HTMLInputElement).value;
  const about = (document.getElementById('about') as HTMLInputElement).value;
  const phone = (document.getElementById('phone') as HTMLInputElement).value;
  const website = (document.getElementById('website') as HTMLInputElement).value;
  const address = (document.getElementById('address') as HTMLInputElement).value;

  // Get the education data
  const educationFields = document.querySelectorAll('.education-entry') as NodeListOf<HTMLDivElement>;
  const educationData: { degree: string; institution: string; year: string }[] = [];
  educationFields.forEach((field) => {
    const degree = (field.querySelector('.degree') as HTMLInputElement).value;
    const institution = (field.querySelector('.institution') as HTMLInputElement).value;
    const year = (field.querySelector('.year') as HTMLInputElement).value;
    educationData.push({ degree, institution, year });
  });

  // Get the experience data
  const experienceFields = document.querySelectorAll('.experience-entry') as NodeListOf<HTMLDivElement>;
  const experienceData: { position: string; company: string; duration: string; description: string }[] = [];
  experienceFields.forEach((field) => {
    const position = (field.querySelector('.position') as HTMLInputElement).value;
    const company = (field.querySelector('.company') as HTMLInputElement).value;
    const duration = (field.querySelector('.duration') as HTMLInputElement).value;
    const description = (field.querySelector('.description') as HTMLTextAreaElement).value;
    experienceData.push({ position, company, duration, description });
  });

  // Get the language data
  const languageFields = document.querySelectorAll('.language-entry') as NodeListOf<HTMLDivElement>;
  const languageData: { language: string; proficiency: string }[] = [];
  languageFields.forEach((field) => {
    const language = (field.querySelector('.language') as HTMLInputElement).value;
    const proficiency = (field.querySelector('.proficiency') as HTMLSelectElement).value;
    languageData.push({ language, proficiency });
  });

  // Get the skills data
  const skillInput = document.getElementById('skillInput') as HTMLInputElement;
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
      <h3>${item.degree}</h3>
      <p> ≫ ${item.institution}</p>
      <p> ≫ ${item.year}</p>
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
  const photo = document.getElementById('photo') as HTMLInputElement;
  if (photo.files && photo.files.length > 0) {
    const profilePic = URL.createObjectURL(photo.files[0]);
    profileImage.style.backgroundImage = `url(${profilePic})`;
  }

  // Show the generated resume and hide the form
  generatedResume.classList.remove('hidden');
  form.classList.add('hidden');
}

function addEducationField(): void {
  const educationFields = document.getElementById('educationFields') as HTMLElement;
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

function addExperienceField(): void {
  const experienceFields = document.getElementById('experienceFields') as HTMLElement;
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

function addLanguageField(): void {
  const languageFields = document.getElementById('languageFields') as HTMLElement;
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
