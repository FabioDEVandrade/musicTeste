const pdfs = [
  { 
    nome: "Trem das Onze - Adoniram Barbosa", 
    instrumentos: {
      "Clarinete Bb": "https://raw.githubusercontent.com/FabioDEVandrade/pdf-files/main/Adoniram%20Barbosa%20-%20Trem%20das%20Onze%20-%20PDF's/Adoniram%20Barbosa%20-%20Trem%20das%20Onze%20-%20Clarinete%20Bb.pdf",
      "Flauta Doce Soprano": "https://raw.githubusercontent.com/FabioDEVandrade/pdf-files/main/Adoniram%20Barbosa%20-%20Trem%20das%20Onze%20-%20PDF's/Adoniram%20Barbosa%20-%20Trem%20das%20Onze%20-%20Flauta%20Doce%20Soprano.pdf",
      Flauta: "https://raw.githubusercontent.com/FabioDEVandrade/pdf-files/main/Adoniram%20Barbosa%20-%20Trem%20das%20Onze%20-%20PDF's/Adoniram%20Barbosa%20-%20Trem%20das%20Onze%20-%20Flauta.pdf",
      "Saxofone Alto": "https://raw.githubusercontent.com/FabioDEVandrade/pdf-files/main/Adoniram%20Barbosa%20-%20Trem%20das%20Onze%20-%20PDF's/Adoniram%20Barbosa%20-%20Trem%20das%20Onze%20-%20Saxofone%20Alto.pdf",
      "Saxofone Soprano": "https://raw.githubusercontent.com/FabioDEVandrade/pdf-files/main/Adoniram%20Barbosa%20-%20Trem%20das%20Onze%20-%20PDF's/Adoniram%20Barbosa%20-%20Trem%20das%20Onze%20-%20Saxofone%20Soprano.pdf",
      "Saxofone Tenor": "https://raw.githubusercontent.com/FabioDEVandrade/pdf-files/main/Adoniram%20Barbosa%20-%20Trem%20das%20Onze%20-%20PDF's/Adoniram%20Barbosa%20-%20Trem%20das%20Onze%20-%20Saxofone%20Tenor.pdf",
      Trombone: "https://raw.githubusercontent.com/FabioDEVandrade/pdf-files/main/Adoniram%20Barbosa%20-%20Trem%20das%20Onze%20-%20PDF's/Adoniram%20Barbosa%20-%20Trem%20das%20Onze%20-%20Trombone.pdf"
    }
  },
];

pdfs.sort((a, b) => a.nome.localeCompare(b.nome));

const lista = document.getElementById("lista-pdfs");
const searchInput = document.getElementById("search");

function renderList(filtro = "") {
  lista.innerHTML = "";
  pdfs
    .filter(pdf => pdf.nome.toLowerCase().includes(filtro.toLowerCase()))
    .forEach(pdf => {
      const li = document.createElement("li");
      li.style.flexDirection = "column";

      const span = document.createElement("span");
      span.textContent = pdf.nome;
      span.classList.add("music-title");
      li.appendChild(span);

      const ulInstr = document.createElement("ul");
      ulInstr.classList.add("instr-list");
      ulInstr.style.maxHeight = "0px";
      ulInstr.style.overflow = "hidden";

      for (const [instr, link] of Object.entries(pdf.instrumentos)) {
        const liInstr = document.createElement("li");

        const spanInstr = document.createElement("span");
        spanInstr.textContent = instr;
        spanInstr.classList.add("music-title");

        const a = document.createElement("a");
        a.href = link;
        a.target = "_blank";
        a.download = ""; // força o download do PDF
        a.innerHTML = `<i class="bi bi-filetype-pdf"></i>`;

        liInstr.appendChild(spanInstr);
        liInstr.appendChild(a);
        ulInstr.appendChild(liInstr);
      }

      li.appendChild(ulInstr);

      span.addEventListener("click", () => {
        if (ulInstr.style.maxHeight === "0px") {
          ulInstr.style.maxHeight = ulInstr.scrollHeight + "px";
        } else {
          ulInstr.style.maxHeight = "0px";
        }
      });

      lista.appendChild(li);
    });
}

searchInput.addEventListener("input", () => renderList(searchInput.value));
renderList();
