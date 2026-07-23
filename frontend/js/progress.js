/* ==========================================
   PATH TO HIRE - PROGRESS TRACKING JS
========================================== */


document.addEventListener("DOMContentLoaded", () => {


    /* ===============================
       GET ELEMENTS
    =============================== */


    const jobReadiness =
        document.getElementById("jobReadiness");

    const completedTasks =
        document.getElementById("completedTasks");

    const interviewsTaken =
        document.getElementById("interviewsTaken");

    const resumeAnalyses =
        document.getElementById("resumeAnalyses");


    const timeline =
        document.getElementById("activityTimeline");

    const emptyState =
        document.getElementById("emptyState");



    /* ===============================
       USER PROGRESS DATA

       Later replace with API data
    =============================== */


    let progressData =
    JSON.parse(localStorage.getItem("progressData")) || {


        readinessScore: 72,


        tasksCompleted: 18,


        interviews: 5,


        resumes: 3,


        activities:[

            {
                title:"Resume Analysis Completed",
                date:"Today",
                icon:"fa-file-lines"
            },


            {
                title:"AI Mock Interview Attempted",
                date:"Yesterday",
                icon:"fa-user-tie"
            },


            {
                title:"JavaScript Roadmap Completed",
                date:"2 Days Ago",
                icon:"fa-code"
            },


            {
                title:"Profile Updated",
                date:"5 Days Ago",
                icon:"fa-user"
            }


        ],


        trend:[

            30,
            45,
            55,
            60,
            68,
            72

        ]

    };



    /* ===============================
       SAVE DATA
    =============================== */


    localStorage.setItem(
        "progressData",
        JSON.stringify(progressData)
    );




    /* ===============================
       ANIMATED COUNTER
    =============================== */


    function animateCounter(
        element,
        value,
        suffix=""
    ){

        let start = 0;


        let duration = 1200;


        let increment =
        value/(duration/20);



        let counter =
        setInterval(()=>{


            start += increment;



            if(start >= value)
            {

                element.innerHTML =
                value + suffix;

                clearInterval(counter);

            }

            else
            {

                element.innerHTML =
                Math.floor(start)+suffix;

            }


        },20);


    }





    animateCounter(
        jobReadiness,
        progressData.readinessScore,
        "%"
    );


    animateCounter(
        completedTasks,
        progressData.tasksCompleted
    );


    animateCounter(
        interviewsTaken,
        progressData.interviews
    );


    animateCounter(
        resumeAnalyses,
        progressData.resumes
    );






    /* ===============================
       EMPTY STATE CHECK
    =============================== */


    if(progressData.activities.length === 0)
    {

        emptyState.style.display="block";

        timeline.style.display="none";

    }

    else
    {

        emptyState.style.display="none";

        timeline.style.display="block";


        loadTimeline();

    }





    /* ===============================
       CREATE TIMELINE
    =============================== */


    function loadTimeline()
    {


        timeline.innerHTML="";


        progressData.activities.forEach(activity=>{


            let item =
            document.createElement("div");


            item.className="timeline-item";



            item.innerHTML = `


                <div class="timeline-icon">

                    <i class="fa-solid ${activity.icon}"></i>

                </div>



                <div class="timeline-content">


                    <h3>

                        ${activity.title}

                    </h3>


                    <p>

                        ${activity.date}

                    </p>


                </div>



            `;



            timeline.appendChild(item);



        });



    }







    /* ===============================
       READINESS CHART
    =============================== */


    const ctx =
    document
    .getElementById("readinessChart")
    .getContext("2d");



    new Chart(ctx, {


        type:"line",


        data:{


            labels:[

                "Week 1",
                "Week 2",
                "Week 3",
                "Week 4",
                "Week 5",
                "Week 6"

            ],



            datasets:[{


                label:
                "Job Readiness %",



                data:
                progressData.trend,



                borderWidth:3,



                tension:0.4,



                fill:true



            }]



        },



        options:{


            responsive:true,


            plugins:{


                legend:{


                    display:true


                }


            },



            scales:{


                y:{


                    beginAtZero:true,


                    max:100


                }


            }


        }



    });






});