/* payment courses and free */
/* payment courses and free */
function downloadReceipt() {
    // Get form values
    const name = document.getElementById('name').value;
    const student_id = document.getElementById('student_id').value;
    const course = document.getElementById('course').value;
    const course_type = document.getElementById('course_type').value;
    let payment_method = document.getElementById('payment_method').value;

    // Handle Free vs Paid course
    if(course_type === "Free Course" || payment_method === "") {
        payment_method = "N/A";
    }

    // Create receipt content
    const content =
        "Enrollment Receipt\n\n" +
        "Full Name: " + name + "\n" +
        "Student ID: " + student_id + "\n" +
        "Course: " + course + "\n" +
        "Course Type: " + course_type + "\n" +
        "Payment Method: " + payment_method + "\n";

    // Create blob and trigger download
    const blob = new Blob([content], { type: "application/msword" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Enrollment_Receipt.docx";
    link.click();
}






/* USER AUTHENTICATION */

const loginBox = document.getElementById("loginBox");
const signupBox = document.getElementById("signupBox");
const dashboard = document.getElementById("dashboard");
const message = document.getElementById("message");
const username = document.getElementById("username");
const profilePic = document.getElementById("profilePic");

function showSignup() {
  loginBox.style.display = "none";
  signupBox.style.display = "block";
}

function showLogin() {
  signupBox.style.display = "none";
  loginBox.style.display = "block";
}

function register() {
  localStorage.setItem("username", document.getElementById("regUser").value);
  localStorage.setItem("password", document.getElementById("regPass").value);
  message.innerHTML = "Account created successfully. Please login.";
  showLogin();
}

function login() {
  if (
    document.getElementById("loginUser").value === localStorage.getItem("username") &&
    document.getElementById("loginPass").value === localStorage.getItem("password")
  ) {
    loginBox.style.display = "none";
    signupBox.style.display = "none";
    dashboard.style.display = "block";
    username.innerHTML = localStorage.getItem("username");
    message.innerHTML = "";
  } else {
    message.innerHTML = "Invalid username or password!";
  }
}

function updateUsername() {
  let newUser = prompt("Enter new username:");
  if (newUser) {
    localStorage.setItem("username", newUser);
    username.innerHTML = newUser;
    alert("Username updated successfully!");
  }
}

function updatePassword() {
  let newPass = prompt("Enter new password:");
  if (newPass) {
    localStorage.setItem("password", newPass);
    alert("Password updated successfully!");
  }
}

function updatePicture() {
  let input = document.createElement("input");
  input.type = "file";
  input.onchange = function (e) {
    let reader = new FileReader();
    reader.onload = function () {
      profilePic.src = reader.result;
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  input.click();
}

function recoverPassword() {
  alert("Password recovery instructions have been sent to your email.");
}

/* progress tracker */
let progress = 0;
let lessons = 0;
let quizzes = 0;

function updateProgress() {
    if (progress < 100) {
        progress += 20;
        lessons += 2;
        quizzes += 1;

        document.getElementById("percent").innerText = progress;
        document.getElementById("lessons").innerText = lessons;
        document.getElementById("quizzes").innerText = quizzes;
        document.getElementById("progressBar").value = progress;
    }

    if (progress >= 100) {
        document.getElementById("certificate").innerHTML =
            "🏆 <strong>Certificate Earned!</strong>";
    }
}

function downloadReport() {
    let report =
        "Course: Web Development Basics\n" +
        "Progress: " + progress + "%\n" +
        "Lessons Watched: " + lessons + "\n" +
        "Quizzes Taken: " + quizzes + "\n" +
        "Status: " + (progress >= 100 ? "Completed" : "In Progress");

    let blob = new Blob([report], { type: "text/plain" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Progress_Report.txt";
    link.click();
}

/* FORUM */
  function vote(btn, value) {
    const count = btn.parentElement.querySelector(".count");
    count.innerText = parseInt(count.innerText) + value;
}

function toggleReply() {
    const box = document.getElementById("replyBox");
    box.style.display = box.style.display === "block" ? "none" : "block";
}

function submitThread() {
    const title = document.getElementById("threadTitle").value.trim();
    const content = document.getElementById("threadContent").value.trim();

    if (title === "" || content === "") {
        alert("Please fill in title and content");
        return;
    }

    // Create post element
    const post = document.createElement("div");
    post.className = "post-card";

    post.innerHTML = `
        <div class="vote">
            <button onclick="vote(this,1)">▲</button>
            <span class="count">0</span>
            <button onclick="vote(this,-1)">▼</button>
        </div>

        <div class="content">
            <p class="author"><b>You</b> · Discussion · just now</p>
            <h3>${title}</h3>
            <p>${content}</p>

            <div class="actions">
                <span onclick="toggleReplyDynamic(this)">💬 Reply</span>
            </div>

            <div class="reply-box">
                <textarea placeholder="Type your reply..."></textarea>
                <button onclick="postReply()">Post Reply</button>
            </div>
        </div>
    `;

    // Add post to forum
    document.getElementById("threadList").prepend(post);

    // Clear input
    document.getElementById("threadTitle").value = "";
    document.getElementById("threadContent").value = "";

    closeModal();
}


function openModal() {
    document.getElementById("modal").style.display = "flex";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

function submitThread() {
    alert("New thread created");
    closeModal();
}

function showNotifications() {
    alert("No new notifications");
}

