const paths_form = document.getElementById('paths');
paths_form.addEventListener('submit', (event) => {
    event.preventDefault();
    const raw = document.getElementById('raw_path').value;
    const out = document.getElementById('out_path').value;

    fetch('/paths', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            raw: raw,
            out: out 
        })
    })
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error('Network response was not ok');
            }
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
});






next_button = document.getElementById("next");
repeat_button = document.getElementById("repeat");

function combedData() {
    const prompt = document.getElementById("prompt").value;
    const target = document.getElementById("target").value;
    return { "prompt": prompt, "target": target };
}

next_button.addEventListener("click", function () {
    console.log("went")
    let data = combedData();
    data.repeat = false;
    fetch("/next", {
        method: "POST",
        body: JSON.stringify(combedData()),
    })
    .then(response => response.text())
    .then(data => {
        if (data == "paths_not_set") {
            alert("Need to set the paths to the prompt and target files");
        } else {
            console.log("Successfully going to next data");
        }
    })
    .catch((error) => {
        console.error("Error:", error);
    });
});


