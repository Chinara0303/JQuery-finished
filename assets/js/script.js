$(document).ready(function () {

    //add user task
    let nameInp = $(".name-inp");
    let surnameInp = $(".surname-inp");
    let users = [];

    //enabled button
    $(".input input").keyup(function () {
        $(".add-btn").removeAttr("disabled");
    })

    //check localstorage
    if (localStorage.getItem("users") != null) {
        users = JSON.parse(localStorage.getItem("users"));
    }
    $(".add-btn").click(function () {
        if ($(".name-inp").val() == " " || $(".surname-inp").val() == " ") {
            removeDnone();
        }
        else {
            $(".add-btn").removeAttr("disabled");
            addDnone();
            $("ul").html("");
            users.push({
                id: uuidv4(),
                name: nameInp.val()[0].toUpperCase().concat(nameInp.val().slice(1)),
                surname: surnameInp.val()[0].toUpperCase().concat(surnameInp.val().slice(1))
            })
            localStorage.setItem("users", JSON.stringify(users));

            addUi();
            closeModal()
        }
    })


    //open modal
    function openModal() {
        $(".body-modal").slideDown();
        $(".body-modal").removeClass("d-none");
        $(".overlay").css("display", "block")
        $("ul").css("z-index", "-1")
        $(".slider").css("z-index", "-1")
        $(".add-btn").attr("disabled", true);
    }
    $(".open-btn").click(openModal);

    //close modal
    function closeModal() {
        $(".body-modal").slideUp();
        $(".body-modal").addClass("d-none");
        $(".body-modal-edit").slideUp();
        $(".body-modal-edit").addClass("d-none");
        $(".overlay").css("display", "none")
        $("ul").css("z-index", "1")
        $(".slider").css("z-index", "1")
    }
    $(".close-btn").click(closeModal);

    //check inputs
    function removeDnone() {
        if ($(".empty").hasClass("d-none")) {
            $(".empty").removeClass("d-none")
        }

    }
    function addDnone() {
        if (!($(".empty").hasClass("d-none"))) {
            $(".empty").addClass("d-none")
        }

    }


    //get random id
    function uuidv4() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }

    //add ui
    addUi();
    function addUi() {
        for (const dbUser of users) {
            $("ul").append(
                `
                <li data-id="${dbUser.id}" class="list-group-item">
                    <span>${dbUser.name} ${dbUser.surname} </span>
                    <i class="fa-solid fa-trash-can del"></i>
                    <i class="fa-solid fa-pen-to-square edit"></i>
                </li>
            `
            );
            nameInp.val("")
            surnameInp.val("")
        }
    }


    //delete items
    function delItems(id) {
        let existUser = users.filter(u => u.id != id);
        users = existUser;
        localStorage.setItem("users", JSON.stringify(users))
    }
    $(document).on("click", ".del", function () {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                for (const user of users) {
                    if (user.id == $(this).parent().attr("data-id")) {
                        delItems(user.id);
                        $(this).parent().remove()
                    }
                }
                Swal.fire(
                    'Deleted!',
                    'Your data has been deleted.',
                    'success'
                )
            }
        })

    })

    //edit items
    function openEditModal() {
        $(".body-modal-edit").slideDown();
        $(".body-modal-edit").removeClass("d-none");
    }
    function editItems(id) {
        let dbUser = users.find(u => u.id == id);
        let index = users.indexOf(dbUser);

        $(".edit-inp-name").val(`${dbUser.name}`);
        $(".edit-inp-surname").val(`${dbUser.surname}`);

        $(document).on("click", ".save-btn", function () {
            for (let user of users) {
                user = dbUser;
                user.name = $(".edit-inp-name").val()[0].toUpperCase().concat($(".edit-inp-name").val().slice(1));
                user.surname = $(".edit-inp-surname").val()[0].toUpperCase().concat($(".edit-inp-surname").val().slice(1))

            }

            localStorage.setItem("users", JSON.stringify(users));
            $(this).parent().parent().parent().parent().next().children().eq(index)
               .html(`
               <span>${dbUser.name} ${dbUser.surname} </span>
               <i class="fa-solid fa-trash-can del"></i>
               <i class="fa-solid fa-pen-to-square edit"></i>`);
            closeModal();
        })
    }
    $(document).on("click", ".edit", function () {
        openEditModal();
        for (const user of users) {
            if (user.id == $(this).parent().attr("data-id")) {
                editItems(user.id)
            }
        }
    })






    //slider
    function rigthSlider() {

        let activeSlider = $(".active-slider");
        if (activeSlider.next().length != 0) {
            activeSlider.removeClass("active-slider");
            activeSlider.next().addClass("active-slider");
        }
        else {
            activeSlider.removeClass("active-slider");
            activeSlider.parent().children().eq(0).addClass("active-slider");
        }

    }
    function leftSlider() {
        let activeSlider = $(".active-slider");
        if (activeSlider.prev().length != 0) {
            activeSlider.removeClass("active-slider");
            activeSlider.prev().addClass("active-slider");
        }
        else {
            activeSlider.removeClass("active-slider");
            activeSlider.parent().children().eq(2).addClass("active-slider");
        }
    }

    $(document).on("click", ".left", leftSlider)
    $(document).on("click", ".right", rigthSlider)
    $(document).on("mouseover", ".left", leftSlider)
    $(document).on("mouseover", ".right", rigthSlider)

    setInterval(() => {
        rigthSlider()
    }, 2000);
})
