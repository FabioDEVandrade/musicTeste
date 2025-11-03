const pdfs = [
  { 
    nome: "Aquarela do Brasil", 
    instrumentos: {
      trompete: "pdfs/aquarela_trompete.pdf",
      trombone: "pdfs/aquarela_trombone.pdf"
    }
  },
  { 
    nome: "Garota de Ipanema", 
    instrumentos: {
      trompete: "pdfs/garota_trompete.pdf",
      trombone: "pdfs/garota_trombone.pdf"
    }
  },
  { 
    nome: "Trem das Onze", 
    instrumentos: {
      trompete: "pdfs/trem_trompete.pdf",
      trombone: "pdfs/trem_trombone.pdf"
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
      li.style.flexDirection = "column"; // garante que instrumentos fiquem abaixo

      // Nome da música
      const span = document.createElement("span");
      span.textContent = pdf.nome;
      span.classList.add("music-title");
      li.appendChild(span);

      // Lista de instrumentos
      const ulInstr = document.createElement("ul");
      ulInstr.classList.add("instr-list");
      ulInstr.style.maxHeight = "0px";
      ulInstr.style.overflow = "hidden";

      for (const [instr, link] of Object.entries(pdf.instrumentos)) {
        const liInstr = document.createElement("li");
        liInstr.style.display = "flex";
        liInstr.style.justifyContent = "space-between";
        liInstr.style.alignItems = "center";

        const spanInstr = document.createElement("span");
        spanInstr.textContent = instr;
        spanInstr.classList.add("music-title"); // mesma formatação que música

        const a = document.createElement("a");
        a.href = link;
        a.target = "_blank";
        a.innerHTML = `<i class="bi bi-filetype-pdf"></i>`; // ícone de PDF

        liInstr.appendChild(spanInstr);
        liInstr.appendChild(a);
        ulInstr.appendChild(liInstr);
      }

      li.appendChild(ulInstr);

      // Toggle lista de instrumentos
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
