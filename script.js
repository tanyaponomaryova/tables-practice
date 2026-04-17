const colorPairs = [
  { bg: "#ffebb5", data: "#ff00b3", table: "#ff907d" },
  { bg: "#c3ebbe", data: "#ff0000", table: "#00c7eb" },
  { bg: "#a4d2eb", data: "#7d45ff", table: "#ff2424" },
  { bg: "#9bab91", data: "#ffff00", table: "#ffd6ff" },
  { bg: "#e0c8e0", data: "#050505", table: "#ff00fb" },
  { bg: "#f5f0e6", data: "#e629f0", table: "#00ba73" },
];

const currentColors = { bg: "#ffebb5", data: "#ff00b3" };

const rows = document.querySelectorAll("tbody tr");
console.log(rows);

rows.forEach((row) => {
  row.addEventListener("mouseover", () => {
    const random = colorPairs[Math.floor(Math.random() * colorPairs.length)];

    row.querySelectorAll("td").forEach((td) => {
      td.style.backgroundColor = random.data;
      td.style.color = random.bg;
    });
  });

  row.addEventListener("mouseout", () => {
    row.querySelectorAll("td").forEach((td) => {
      td.style.backgroundColor = "var(--bg-color)";
      td.style.color = "var(--data-color)";
    });
  });
});

// Фильтрация
// Собираем все уникальные теги из таблице
const allTagsInTable = new Set();

rows.forEach((row) => {
  const tags = row.querySelectorAll("td:nth-child(3) span");

  tags.forEach((tag) => allTagsInTable.add(tag));
});

const buttons = document.querySelectorAll(".tags button");

buttons.forEach((clickedButton) => {
  clickedButton.addEventListener("click", () => {
    // Фильтруем по тексту на кнопке
    filterTable(clickedButton.textContent);

    const random = colorPairs[Math.floor(Math.random() * colorPairs.length)];

    document.documentElement.style.setProperty("--bg-color", random.bg);
    document.documentElement.style.setProperty("--data-color", random.data);
    document.documentElement.style.setProperty(
      "--table-header-color",
      random.table,
    );

    buttons.forEach((button) => {
      if (button === clickedButton) {
        button.style.color = "var(--table-header-color)";
      } else {
        button.style.color = "var(--data-color)";
      }
    });
  });
});

function filterTable(selectedTag) {
  if (selectedTag === "Все теги") {
    rows.forEach((row) => {
      row.style.display = "";
    });
  } else {
    rows.forEach((row) => {
      const spans = row.querySelectorAll("td:nth-child(3) span");
      const tags = Array.from(spans).map((span) => span.textContent.trim());

      if (tags.includes(selectedTag)) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  }
}
