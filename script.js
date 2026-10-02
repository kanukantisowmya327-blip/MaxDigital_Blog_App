// Get saved blogs from local storage
function getBlogs() {
    return JSON.parse(localStorage.getItem("blogs")) || [];
}

// Save blogs to local storage
function saveBlogs(blogs) {
    localStorage.setItem("blogs", JSON.stringify(blogs));
}

// Create Blog functionality
const blogForm = document.querySelector(".form-box form");

if (
    blogForm &&
    window.location.pathname.endsWith("create-blog.html")
) {
    blogForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const title = blogForm.querySelector('input[type="text"]').value;
        const author = blogForm.querySelectorAll('input[type="text"]')[1].value;
        const category = blogForm.querySelector("select").value;
        const content = blogForm.querySelector("textarea").value;

        const blog = {
            title: title,
            author: author,
            category: category,
            content: content,
            date: new Date().toLocaleDateString()
        };

        const blogs = getBlogs();
        blogs.push(blog);
        saveBlogs(blogs);

        alert("Blog published successfully!");

        blogForm.reset();
    });
}

// Display saved blogs on Home page
if (window.location.pathname.endsWith("index.html")) {
    const blogContainer = document.querySelector(".blog-container");
    const blogs = getBlogs();

    blogs.forEach(function (blog) {
        const card = document.createElement("article");
        card.className = "blog-card";

        const title = document.createElement("h3");
        title.textContent = blog.title;

        const author = document.createElement("p");
        author.textContent = "By " + blog.author;

        const content = document.createElement("p");
        content.textContent = blog.content;

        const category = document.createElement("p");
        category.textContent = "Category: " + blog.category;

        card.append(title, author, category, content);
        blogContainer.appendChild(card);
    });
}