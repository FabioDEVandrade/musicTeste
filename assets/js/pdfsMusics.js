const repoOwner = "FabioDEVandrade";
const repoName = "pdf-files";
const branch = "main";
const CACHE_KEY = "lyven_pdfs_cache_v1";
const CACHE_TTL = 1000 * 60 * 60 * 6;
const lista = document.getElementById("lista-pdfs");
const searchInput = document.getElementById("search");

function salvarCache(data) {
  localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data }));
}
function lerCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Date.now() - parsed.ts > CACHE_TTL) return null;
    return parsed.data;
  } catch {
    return null;
  }
}

function renderizarLista(pdfs, filtro = "") {
  lista.innerHTML = "";
  pdfs
    .filter(pdf => pdf.nome.toLowerCase().includes(filtro.toLowerCase()))
    .sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"))
    .forEach(pdf => {
      const li = document.createElement("li");
      li.classList.add("music-item");

      const span = document.createElement("span");
      span.textContent = pdf.nome;
      span.classList.add("music-title");
      li.appendChild(span);

      const ulInstr = document.createElement("ul");
      ulInstr.classList.add("instr-list");

      for (const instr of pdf.instrumentos) {
        const liInstr = document.createElement("li");

        // extrai só o nome do instrumento
        const nomeInstrumento = instr.name
          .replace(pdf.nome, "")
          .replace(/[-–_]/g, "")
          .trim();

        const spanInstr = document.createElement("span");
        spanInstr.textContent = nomeInstrumento;

        const a = document.createElement("a");
        a.href = instr.url;
        a.target = "_blank";
        a.download = "";
        a.innerHTML = `<i class="bi bi-filetype-pdf"></i>`;
        a.classList.add("pdf-icon-link");

        liInstr.appendChild(spanInstr);
        liInstr.appendChild(a);
        ulInstr.appendChild(liInstr);
      }

      li.appendChild(ulInstr);

      // abrir/fechar lista de instrumentos
      span.addEventListener("click", () => {
        const aberto = ulInstr.classList.toggle("open");
        ulInstr.style.maxHeight = aberto ? ulInstr.scrollHeight + "px" : "0px";
      });

      lista.appendChild(li);
    });
}

async function buscarDoServidor() {
  const resp = await fetch("https://server-lyven-music.onrender.com/api/pdfs");
  if (!resp.ok) throw new Error("Erro ao buscar PDFs no servidor.");
  return await resp.json();
}


async function carregarPDFs() {
  lista.innerHTML = "<li style='text-align:center;padding:20px;'>Carregando músicas...</li>";

  const cache = lerCache();
  if (cache) {
    renderizarLista(cache);
    buscarDoServidor()
  .then(d => { salvarCache(d); renderizarLista(d); })
  .catch(e => console.warn("Atualização silenciosa falhou:", e));

  }

  try {
    const pdfs = await buscarDoServidor();
    renderizarLista(pdfs);
  } catch (err) {
    lista.innerHTML = `<li style='text-align:center;color:#f88;padding:20px;'>Erro: ${err.message}</li>`;
  }
}

searchInput.addEventListener("input", e => {
  const cache = lerCache();
  if (cache) renderizarLista(cache, e.target.value);
});

carregarPDFs();
