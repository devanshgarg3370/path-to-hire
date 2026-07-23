/* =====================================================
        PATH TO HIRE - PROFILE JS
===================================================== */


document.addEventListener("DOMContentLoaded", () => {


    // ==============================
    // SELECT ELEMENTS
    // ==============================


    const profileForm =
    document.getElementById("profileForm");


    const nameInput =
    document.getElementById("fullName");


    const emailInput =
    document.getElementById("email");


    const bioInput =
    document.getElementById("bio");


    const profileImage =
    document.getElementById("profileImage");


    const avatarUpload =
    document.getElementById("avatarUpload");


    const skillsContainer =
    document.getElementById("skillsContainer");


    const resumeHistory =
    document.getElementById("resumeHistory");


    const emptyResumeState =
    document.getElementById("emptyResumeState");




    // ==============================
    // USER DATABASE
    // ==============================


    let userData =
    JSON.parse(
        localStorage.getItem("pathToHireUser")
    )
    ||
    {

        name:"",

        email:"",

        bio:"",

        image:
        "images/default-avatar.png",


        skills:[

            "HTML",
            "CSS",
            "JavaScript",
            "React",
            "Node.js"

        ],


        resumes:[]

    };





    // ==============================
    // LOAD PROFILE
    // ==============================


    function loadProfile(){


        nameInput.value =
        userData.name;


        emailInput.value =
        userData.email;


        bioInput.value =
        userData.bio;


        profileImage.src =
        userData.image;


        renderSkills();


        renderResume();


    }



    loadProfile();







    // ==============================
    // SAVE PROFILE
    // ==============================


    function saveProfile(){


        localStorage.setItem(

            "pathToHireUser",

            JSON.stringify(userData)

        );


    }







    // ==============================
    // FORM VALIDATION + SAVE
    // ==============================


    profileForm.addEventListener(
    "submit",
    (e)=>{


        e.preventDefault();



        let name =
        nameInput.value.trim();



        let email =
        emailInput.value.trim();



        let bio =
        bioInput.value.trim();






        // NAME CHECK


        if(name==="")
        {

            showToast(
            "Full name is required",
            "error"
            );


            nameInput.focus();

            return;

        }



        if(name.length < 3)
        {

            showToast(
            "Name must contain at least 3 characters",
            "error"
            );


            nameInput.focus();

            return;

        }






        // EMAIL CHECK


        if(email==="")
        {

            showToast(
            "Email is required",
            "error"
            );


            emailInput.focus();

            return;

        }




        let emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;



        if(!emailRegex.test(email))
        {

            showToast(
            "Enter a valid email address",
            "error"
            );


            emailInput.focus();

            return;


        }







        // BIO CHECK


        if(bio.length>0 && bio.length<10)
        {

            showToast(
            "Bio should contain minimum 10 characters",
            "error"
            );


            bioInput.focus();

            return;

        }






        // UPDATE DATA


        userData.name =
        name;


        userData.email =
        email;


        userData.bio =
        bio;



        saveProfile();



        showToast(
        "Profile updated successfully 🚀",
        "success"
        );



    });








    // ==============================
    // IMAGE UPLOAD
    // ==============================


    avatarUpload.addEventListener(
    "change",
    ()=>{


        let file =
        avatarUpload.files[0];



        if(!file)
        return;




        if(file.size > 2*1024*1024)
        {


            showToast(
            "Image size should be less than 2MB",
            "error"
            );


            return;


        }





        if(!file.type.startsWith("image"))
        {


            showToast(
            "Only image files allowed",
            "error"
            );


            return;


        }






        let reader =
        new FileReader();



        reader.onload =
        ()=>{


            profileImage.src =
            reader.result;



            userData.image =
            reader.result;



            saveProfile();



            showToast(
            "Profile photo updated",
            "success"
            );


        };



        reader.readAsDataURL(file);



    });









    // ==============================
    // DISPLAY SKILLS
    // ==============================


    function renderSkills(){


        skillsContainer.innerHTML="";



        userData.skills.forEach(
        (skill,index)=>{


            let tag =
            document.createElement("div");



            tag.className="skill";



            tag.innerHTML=
            `

            ${skill}

            <i 
            class="fa-solid fa-xmark"
            data-id="${index}">
            </i>

            `;



            skillsContainer.appendChild(tag);



        });



    }








    // ==============================
    // REMOVE SKILL
    // ==============================


    skillsContainer.addEventListener(
    "click",
    (e)=>{


        if(
        e.target.classList.contains(
        "fa-xmark"
        ))
        {


            let index =
            e.target.dataset.id;



            userData.skills.splice(
            index,
            1
            );



            saveProfile();



            renderSkills();



            showToast(
            "Skill removed",
            "success"
            );

        }



    });








    // ==============================
    // ADD NEW SKILL
    // ==============================


    window.addSkill =
    function(skill){


        if(
        skill &&
        !userData.skills.includes(skill)
        )
        {


            userData.skills.push(skill);



            saveProfile();



            renderSkills();



        }


    };









    // ==============================
    // RESUME HISTORY
    // ==============================


    function renderResume(){


        resumeHistory.innerHTML="";



        if(userData.resumes.length===0)
        {


            emptyResumeState.style.display =
            "block";


            return;


        }



        emptyResumeState.style.display =
        "none";





        userData.resumes.forEach(
        (resume,index)=>{


            let card =
            document.createElement("div");



            card.className =
            "resume-card";



            card.innerHTML=
            `

            <div>


            <i class="fa-solid fa-file-pdf"></i>


            </div>



            <div class="resume-info">


            <h3>
            ${resume.name}
            </h3>


            <p>
            Uploaded :
            ${resume.date}
            </p>


            <p>
            ATS Score :
            <b>${resume.score}%</b>
            </p>


            </div>



            <button 
            onclick="deleteResume(${index})">

            Delete

            </button>



            `;



            resumeHistory.appendChild(card);



        });



    }







    // ==============================
    // DELETE RESUME
    // ==============================


    window.deleteResume =
    function(index)
    {


        userData.resumes.splice(
        index,
        1
        );



        saveProfile();



        renderResume();



        showToast(
        "Resume deleted",
        "success"
        );


    };








    // ==============================
    // TOAST SYSTEM
    // ==============================


    function showToast(message,type){


        let toast =
        document.createElement("div");



        toast.className =
        "toast "+type;



        toast.innerText =
        message;



        document.body.appendChild(toast);



        setTimeout(
        ()=>{


            toast.remove();


        },
        3000
        );



    }



});