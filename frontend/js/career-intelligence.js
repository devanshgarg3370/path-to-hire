const API_URL =
    "http://127.0.0.1:8000/career-intelligence/";


async function loadCareerReport() {

    try {

        const resumeText =
            localStorage.getItem("resumeText");

        const token =
            localStorage.getItem("token");


        if (!resumeText) {

            alert(
                "Please upload and analyze your resume first."
            );

            return;
        }


        if (!token) {

            alert(
                "Please login again."
            );

            return;
        }


        const requestBody = {

            resume_text: resumeText

        };


        const response =
            await fetch(API_URL, {

                method: "POST",

                headers: {

                    Authorization:
                        `Bearer ${token}`,

                    "Content-Type":
                        "application/json"

                },

                body:
                    JSON.stringify(requestBody)

            });


        console.log("HTTP Status:", response.status);

        const responseData =
            await response.json();

        console.log("Full API Response:");
        console.log(responseData);


        if (!response.ok) {

            alert(
                responseData.detail ||
                "Failed to generate Career Intelligence Report."
            );

            return;

        }


        const report =
            responseData.data;

        console.log("Career Intelligence Report:");
        console.log(report);


        // Rendering will start after we verify the JSON.

    }

    catch (error) {

        console.error(
            "Career Intelligence Error:",
            error
        );

    }

}


loadCareerReport();


function downloadPDF() {

    window.print();

}