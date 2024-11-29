document.addEventListener("DOMContentLoaded", function () {
    const adminContent = document.getElementById("admin-content");

    // گرفتن سوالات از localStorage
    const questions = JSON.parse(localStorage.getItem("questions")) || [];

    if (questions.length === 0) {
        adminContent.innerHTML = "<p>در حال حاضر هیچ سوالی موجود نیست.</p>";
        return;
    }

    // ساخت لیست سوالات
    const questionList = document.createElement("ul");
    questionList.className = "question-list";

    questions.forEach((question, index) => {
        const listItem = document.createElement("li");
        listItem.className = "question-item";

        // دکمه و مخفی کردن عکس
        let imageHtml = '';
        if (question.imageUrl) {
            imageHtml = `
                <button class="view-image-button" data-index="${index}">نمایش عکس</button>
                <div class="question-image-container" id="image-container-${index}" style="display: none;">
                    <img src="${question.imageUrl}" alt="Question Image" class="question-image" />
                </div>
            `;
        }

        listItem.innerHTML = `
            <h3>${question.title}</h3>
            <p><strong>نام:</strong> ${question.name}</p>
            <p><strong>موضوع:</strong> ${question.topic}</p>
            <p><strong>توضیحات:</strong> ${question.description}</p>
            ${imageHtml}
            <p><small>تاریخ ارسال: ${question.date}</small></p>
            <button class="delete-button" data-index="${index}">حذف سوال</button>
        `;

        questionList.appendChild(listItem);
    });

    adminContent.innerHTML = "";
    adminContent.appendChild(questionList);

    // اضافه کردن قابلیت نمایش عکس
    document.querySelectorAll(".view-image-button").forEach((button) => {
        button.addEventListener("click", function () {
            const index = this.getAttribute("data-index");
            const imageContainer = document.getElementById(`image-container-${index}`);
            
            // نمایش یا مخفی کردن عکس
            if (imageContainer.style.display === "none") {
                imageContainer.style.display = "block";
            } else {
                imageContainer.style.display = "none";
            }
        });
    });

    // اضافه کردن قابلیت حذف سوال
    document.querySelectorAll(".delete-button").forEach((button) => {
        button.addEventListener("click", function () {
            const index = this.getAttribute("data-index");

            // حذف سوال از آرایه
            questions.splice(index, 1);

            // ذخیره دوباره در localStorage
            localStorage.setItem("questions", JSON.stringify(questions));

            // بازسازی لیست سوالات
            location.reload();
        });
    });
});
