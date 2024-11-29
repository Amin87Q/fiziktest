document.getElementById("question-form").addEventListener("submit", function (event) {
    event.preventDefault();

    // گرفتن اطلاعات فرم
    const name = document.getElementById("name").value;
    const title = document.getElementById("title").value;
    const topic = document.getElementById("topic").value;
    const description = document.getElementById("description").value;
    const imageFile = document.getElementById("image").files[0];

    // خواندن عکس (اگر وجود داشته باشد)
    let imageUrl = null;
    if (imageFile) {
        const reader = new FileReader();
        reader.onloadend = function () {
            imageUrl = reader.result; // تبدیل عکس به Base64
            saveQuestion();
        };
        reader.readAsDataURL(imageFile); // خواندن عکس
    } else {
        saveQuestion(); // اگر عکسی نبود، سوال را ذخیره می‌کنیم
    }

    // تابع ذخیره سوال در localStorage
    function saveQuestion() {
        const question = {
            name: name,
            title: title,
            topic: topic,
            description: description,
            date: new Date().toLocaleString(),
            imageUrl: imageUrl // ذخیره مسیر عکس
        };

        // گرفتن سوالات موجود در localStorage
        let questions = JSON.parse(localStorage.getItem("questions")) || [];

        // اضافه کردن سوال جدید به لیست
        questions.push(question);

        // ذخیره دوباره در localStorage
        localStorage.setItem("questions", JSON.stringify(questions));

        alert("سوال شما با موفقیت ارسال شد!");

        // پاک کردن فرم
        document.getElementById("question-form").reset();
    }
});
