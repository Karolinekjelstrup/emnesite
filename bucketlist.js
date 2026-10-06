const lists = document.querySelectorAll(".todo");
const allBoxes = document.querySelectorAll(".todo input");
const progress = document.querySelector(".progress p");

function update() {
  let total = 0;

  lists.forEach(function (list) {
    const boxes = list.querySelectorAll("input");
    const done = list.querySelectorAll("input:checked").length;

    list.nextElementSibling.textContent = done + " / " + boxes.length + " done";
    total = total + done;
  });

  progress.textContent = "Your progress " + total + " / " + allBoxes.length + " done";
}

allBoxes.forEach(function (box) {
  box.addEventListener("change", update);
});

update();

/* filtre */
const filters = document.querySelectorAll(".progress ul li");
const categories = document.querySelectorAll(".grid_1-1");

filters.forEach(function (filter, index) {
  filter.addEventListener("click", function () {
    filters.forEach(function (f) {
      f.classList.remove("active");
    });
    filter.classList.add("active");

    categories.forEach(function (category, i) {
      if (index === 0 || index === i + 1) {
        category.classList.remove("hide");
      } else {
        category.classList.add("hide");
      }
    });
  });
});

/* download liste som pdf */
const downloadButton = document.querySelector("#download");

downloadButton.addEventListener("click", function (event) {
  event.preventDefault();

  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();
  let y = 25;

  pdf.setTextColor(43, 43, 43);
  pdf.setFontSize(22);
  pdf.text("THE AUTUMN EDIT", 20, y);
  y = y + 9;
  pdf.setFontSize(12);
  pdf.text("Autumn bucketlist", 20, y);
  y = y + 16;

  categories.forEach(function (category) {
    if (y > 240) {
      pdf.addPage();
      y = 25;
    }

    pdf.setFontSize(16);
    pdf.text(category.querySelector("h2").textContent, 20, y);
    y = y + 9;

    pdf.setFontSize(11);
    category.querySelectorAll(".todo li").forEach(function (item) {
      const checked = item.querySelector("input").checked;

      pdf.rect(20, y - 3.5, 4, 4);
      if (checked) {
        pdf.line(20, y - 3.5, 24, y + 0.5);
        pdf.line(24, y - 3.5, 20, y + 0.5);
      }

      pdf.text(item.textContent.trim(), 28, y);
      y = y + 7;
    });

    pdf.setFontSize(9);
    pdf.text(category.querySelector(".todo + p").textContent, 20, y + 2);
    y = y + 16;
  });

  pdf.save("autumn-bucketlist.pdf");
});
