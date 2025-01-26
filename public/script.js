function showContent(sectionId) {
    document.querySelectorAll('.content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

let currentLanguage = "ru";

function updateLanguageSelection(language) {
    document.querySelectorAll('.language-icons a').forEach(icon => {
        icon.classList.remove('selected');
    });
    document.querySelector(`.language-icons img[alt='${language === 'ru' ? 'Russian' : 'English'}']`).parentElement.classList.add('selected');
}

async function loadTranslations(language) {
    updateLanguageSelection(language);
    if (language === "ru") {
        location.reload();
        return;
    }

    try {
        const response = await fetch(`translations/${language}.json`);
        const translations = await response.json();

        document.querySelector(".header-container h1").textContent =
            translations.header.name;
        document.querySelector(".header-container p").textContent =
            translations.header.profession;

        document.getElementById("contact-title").textContent = translations.contact.title;
        document.getElementById("about-title").textContent = translations.about.title;

        const contactListItems = document.getElementById("about").querySelectorAll("ul li");
        contactListItems[0].innerHTML = `${translations.contact.phone}: +993 65 624071`;
        contactListItems[1].innerHTML = `${translations.contact.email}: <a href="mailto:v.begmedow@gmail.com" target="_blank">v.begmedow@gmail.com</a>`;
        contactListItems[2].innerHTML = `${translations.contact.github}: <a href="https://github.com/VepaB" target="_blank">VepaB</a>`;
        contactListItems[3].innerHTML = `${translations.contact.instagram}: <a href="https://instagram.com/begmedow.job" target="_blank">@begmedow.job</a>`;
        contactListItems[4].innerHTML = `${translations.contact.telegram}: <a href="https://t.me/lazzzzy_cat" target="_blank">@lazzzzy_cat</a>`;

        document.getElementById("nav-about").textContent = translations.navigation.about;
        document.getElementById("nav-skills").textContent = translations.navigation.skills;
        document.getElementById("nav-projects").textContent = translations.navigation.projects;
        document.getElementById("nav-additional").textContent = translations.navigation.additional;

        document.getElementById("about-description").textContent = translations.about.description;

        const skillsSection = document.getElementById("skills");
        skillsSection.querySelector("h2").textContent =
            translations.skills.title;

        const skillsList = skillsSection.querySelector("ul");
        skillsList.innerHTML = "";
        translations.skills.list.forEach((skill) => {
            const li = document.createElement("li");
            li.textContent = skill;
            skillsList.appendChild(li);
        });

        const projectsSection = document.getElementById("projects");
        projectsSection.querySelector("h2").textContent =
            translations.projects.title;

        const projectList = projectsSection.querySelector("ul");
        projectList.innerHTML = "";
        translations.projects.items.forEach((project) => {
            const li = document.createElement("li");
            li.innerHTML = `<strong>${project.name}:</strong> ${project.description}`;
            const featureList = document.createElement("ul");
            project.features.forEach((feature) => {
                const featureItem = document.createElement("li");
                featureItem.textContent = feature;
                featureList.appendChild(featureItem);
            });
            li.appendChild(featureList);
            projectList.appendChild(li);
        });

        const additionalSection = document.getElementById("additional");
        additionalSection.querySelector("h2").textContent =
            translations.additional.title;

        const additionalList = additionalSection.querySelector("ul");
        additionalList.innerHTML = "";
        translations.additional.list.forEach((info) => {
            const li = document.createElement("li");
            li.textContent = info;
            additionalList.appendChild(li);
        });
    } catch (error) {
        console.error("Error loading translations:", error);
    }
}

document
    .querySelector(".language-icons img[alt='Russian']")
    .addEventListener("click", () => loadTranslations("ru"));
document
    .querySelector(".language-icons img[alt='English']")
    .addEventListener("click", () => loadTranslations("en"));
