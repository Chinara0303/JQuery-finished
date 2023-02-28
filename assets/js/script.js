$(document).ready(function () {
    let nameInp = $(".name-inp");
    let surnameInp = $(".surname-inp");
    let users = [];

    if (JSON.parse(localStorage.getItem("users")) != null) {
        users = JSON.parse(localStorage.getItem("users"));
    }

    $(document).on("click", "button", function () {
        $("ul").html("");
        users.push({
            id: uuidv4(),
            name: nameInp.val()[0].toUpperCase().concat(nameInp.val().slice(1)),
            surname: surnameInp.val()[0].toUpperCase().concat(surnameInp.val().slice(1))
        })

        localStorage.setItem("users", JSON.stringify(users))
        addUi()

    })

    addUi();
    function uuidv4() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }
    function addUi() {
        for (const dbUser of users) {
            $("ul").append(`
             <li data-id="${dbUser.id}" class="list-group-item item">${dbUser.name} ${dbUser.surname}</li>
            `);
            nameInp.val("")
            surnameInp.val("")
        }
    }
    function delItems(id) {
        let existUser = users.filter(u => u.id != id);
        users = existUser;
        localStorage.setItem("users", JSON.stringify(users))
    }

    $(document).on("click", ".item", function () {
        for (const user of users) {
            if (user.id == $(this).attr("data-id")) {
                delItems(user.id);

                $(this).remove()
            }
        }
    })
})


