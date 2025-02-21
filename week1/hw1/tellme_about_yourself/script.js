
// Personal information variables
const firstName = "Nahum";
const lastName = "Yanez";
const yearsOfStudy = 2;
const goal = "to become a full-stack developer";
const more = "I am want to be fully prepared to join the workforce in IT";

// Bio information
const bioData = {
  name: `${firstName} ${lastName}`,
  bio: `I am a passionate web developer with ${yearsOfStudy}    years of study in Application Development. My goal is         ${goal}. I took my ESL, ABE, and GED programs at Seattle Cetral College, where I also completed a 2 year degree in Global Studies. I also completed a 2-year degree in Application Development at North Seattle College. Currently, pursuing a Certificate in Website Development. I am planning to transfer to take a Web Design Cetificate, and other IT certificates to finally get into my Bachelors degree in Application Development.  ${more}.`,
  interests: ["Web Development", "App Development"],
};

// Update DOM when page loads
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('name').textContent = bioData.name;
  document.getElementById('bio').textContent = bioData.bio;

  const interestsHTML = bioData.interests.map(interest => 
    `<span class="interest-tag">${interest}</span>`
  ).join('');

  document.getElementById('interests').innerHTML = interestsHTML;
});
