const paths_form = document.getElementById('paths');
paths_form.addEventListener('submit', (event) => {
    event.preventDefault();
    fetch('/paths', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            raw: document.getElementById('raw_path').value,
            out: document.getElementById('out_path').value
        })
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Network response was not ok');
        }
    })
    .then(data => {
        if (data["code"] === "200") {
            setTextBoxes(data);
        } else {
            alert(data["message"]);
        }
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

function setTextBoxes(pair) {
    document.getElementById("prompt").value = pair["prompt"];
    document.getElementById("target").value = pair["target"];
}

next_button.addEventListener("click", function () {
    let data = combedData();
    data.repeat = false;
    fetch("/next", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data["code"] == "400") {
            alert(data["message"]);
        } else {
            setTextBoxes(data);
        }
    })
    .catch((error) => {
        console.error("Error:", error);
    });
})
