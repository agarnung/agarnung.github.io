function ageCalculator() {
    var today = new Date();
    var birthDate = new Date("2000-10-06"); // ISO-8601 format
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    document.querySelector("#age").innerHTML = age;
}

ageCalculator();
