
let books = JSON.parse(localStorage.getItem("books")) || [];

const table = document.querySelector("tbody");

// Display Books

function displayBooks() {

    if (!table) return;

    table.innerHTML = "";

    books.forEach((book, index) => {

        table.innerHTML += `
        <tr>
            <td>${book.id}</td>
            <td>${book.name}</td>
            <td>${book.author}</td>
            <td>${book.status}</td>
            <td>
                <button onclick="deleteBook(${index})">
                Delete
                </button>
            </td>
        </tr>
        `;
    });

    localStorage.setItem(
        "books",
        JSON.stringify(books)
    );
}

displayBooks();

function addBook() {

    const bookName =
        document.getElementById("bookName");

    const authorName =
        document.getElementById("authorName");

    if (!bookName || !authorName) return;

    if (
        bookName.value === "" ||
        authorName.value === ""
    ) {
        alert("Please Fill All Fields");
        return;
    }

    books.push({
        id: Date.now(),
        name: bookName.value,
        author: authorName.value,
        status: "Available"
    });

    displayBooks();

    bookName.value = "";
    authorName.value = "";

    showNotification("Book Added Successfully 📚");
}

function deleteBook(index) {

    books.splice(index, 1);

    displayBooks();

    showNotification("Book Deleted ❌");
}

const searchBox =
    document.getElementById("searchBox");

if (searchBox) {

    searchBox.addEventListener(
        "keyup",
        function () {

            const value =
                this.value.toLowerCase();

            const rows =
                document.querySelectorAll("tbody tr");

            rows.forEach(row => {

                row.style.display =
                    row.innerText
                    .toLowerCase()
                    .includes(value)
                    ? ""
                    : "none";
            });

        }
    );
}

const darkBtn =
    document.getElementById("darkModeBtn");

if (darkBtn) {

    darkBtn.addEventListener(
        "click",
        () => {

            document.body.classList.toggle("dark");

            localStorage.setItem(
                "theme",
                document.body.classList.contains("dark")
            );
        }
    );
}

if (
    localStorage.getItem("theme")
    === "true"
) {
    document.body.classList.add("dark");
}

window.addEventListener(
    "load",
    () => {

        setTimeout(() => {

            showNotification(
                "Welcome To Library Management System 🚀"
            );

        }, 1000);

    }
);

function showNotification(message) {

    const notification =
        document.createElement("div");

    notification.innerText = message;

    notification.style.position = "fixed";
    notification.style.top = "20px";
    notification.style.right = "20px";
    notification.style.background = "#2563eb";
    notification.style.color = "white";
    notification.style.padding = "15px";
    notification.style.borderRadius = "10px";
    notification.style.zIndex = "1000";

    document.body.appendChild(notification);

    setTimeout(() => {

        notification.remove();

    }, 3000);
}

document
.querySelectorAll("nav a")
.forEach(link => {

    link.addEventListener(
        "click",
        function (e) {

            e.preventDefault();

            const target =
                document.querySelector(
                    this.getAttribute("href")
                );

            if (target) {

                target.scrollIntoView({
                    behavior: "smooth"
                });
            }
        }
    );
});


const topBtn =
    document.createElement("button");

topBtn.innerHTML = "⬆";

topBtn.style.position = "fixed";
topBtn.style.bottom = "20px";
topBtn.style.right = "20px";
topBtn.style.padding = "12px";
topBtn.style.border = "none";
topBtn.style.borderRadius = "50%";
topBtn.style.background = "#2563eb";
topBtn.style.color = "white";
topBtn.style.cursor = "pointer";
topBtn.style.display = "none";

document.body.appendChild(topBtn);

window.addEventListener(
    "scroll",
    () => {

        if (window.scrollY > 300) {

            topBtn.style.display =
                "block";

        } else {

            topBtn.style.display =
                "none";
        }
    }
);

topBtn.addEventListener(
    "click",
    () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);