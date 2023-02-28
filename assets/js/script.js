$(document).ready(function () {
    let nameInp = $(".name-inp");
    let surnameInp = $(".surname-inp");
    let users = [];

    function openModal() {
        $(".open-btn").click(function () {
            $(".body-modal").slideDown();
            $(".body-modal").removeClass("d-none");
            $(".overlay").css("display", "block")
            $("ul").css("z-index", "-1")
            $(".slider").css("z-index", "-1")

        })
    }
    openModal();
    closeModal();

    function closeModal() {
        $(".close-btn").click(function () {
            $(".body-modal").slideUp();
            $(".body-modal").addClass("d-none");
            $(".overlay").css("display", "none")
            $("ul").css("z-index", "1")
            $(".slider").css("z-index", "1")
        })
    }
    if (localStorage.getItem("users") != null) {
        users = JSON.parse(localStorage.getItem("users"));
    }

    $(".add-btn").click(function () {
        $("ul").html("");
        users.push({
            id: uuidv4(),
            name: nameInp.val()[0].toUpperCase().concat(nameInp.val().slice(1)),
            surname: surnameInp.val()[0].toUpperCase().concat(surnameInp.val().slice(1))
        })

        localStorage.setItem("users", JSON.stringify(users))
        addUi();
        $(".body-modal").slideUp();
        $(".body-modal").addClass("d-none");
        $(".overlay").css("display", "none");
        $("ul").css("z-index", "1")
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
             <li data-id="${dbUser.id}" class="list-group-item">${dbUser.name} ${dbUser.surname} <i class="fa-solid fa-trash-can item"></i></li>
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
