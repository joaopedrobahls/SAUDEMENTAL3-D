// TESTE EDUCATIVO
const formTeste = document.getElementById("formTeste");
if (formTeste) {
    formTeste.addEventListener("submit", function(e) {
        e.preventDefault();
        const perguntas = ["q1","q2","q3","q4"];
        let pontuacao = 0;
        for (const pergunta of perguntas) {
            const resposta = document.querySelector(`input[name="${pergunta}"]:checked`);
            if (!resposta) { alert("Responda todas as perguntas antes de continuar."); return; }
            pontuacao += Number(resposta.value);
        }
        const resultado = document.getElementById("resultado");
        let mensagem = "";
        if (pontuacao <= 2) {
            mensagem = "<strong>Resultado educativo</strong><br><br>Suas respostas indicam uma percepção relativamente positiva do seu bem-estar. Continue cuidando da sua rotina e mantendo relações de apoio.";
        } else if (pontuacao <= 5) {
            mensagem = "<strong>Resultado educativo</strong><br><br>Algumas respostas indicam possíveis dificuldades no seu bem-estar. Converse com alguém de confiança e considere buscar orientação profissional.";
        } else {
            mensagem = "<strong>Resultado educativo</strong><br><br>Suas respostas indicam que pode ser importante conversar com alguém de confiança e buscar orientação profissional. Este resultado não representa diagnóstico.";
        }
        resultado.innerHTML = mensagem;
        resultado.style.display = "block";
        resultado.scrollIntoView({behavior:"smooth",block:"center"});
    });
}

// CADASTRO
const cadastroForm = document.getElementById("cadastroForm");
if (cadastroForm) {
    const choices = document.querySelectorAll(".choice");
    const professionalFields = document.getElementById("professionalFields");
    const formTitle = document.getElementById("formTitle");
    const idadeField = document.getElementById("idadeField");
    let tipo = "jovem";
    choices.forEach(choice => choice.addEventListener("click", () => {
        choices.forEach(c => c.classList.remove("active"));
        choice.classList.add("active");
        tipo = choice.dataset.type;
        const profissional = tipo === "psicologo";
        professionalFields.classList.toggle("hidden", !profissional);
        formTitle.textContent = profissional ? "Cadastro de psicólogo" : "Cadastro de usuário";
        idadeField.classList.toggle("hidden", profissional);
    }));
    cadastroForm.addEventListener("submit", e => {
        e.preventDefault();
        const msg = document.getElementById("cadastroMsg");
        msg.textContent = tipo === "psicologo"
            ? "Cadastro enviado! No sistema real, os dados profissionais seriam analisados antes da publicação."
            : "Cadastro realizado no protótipo! Agora você pode explorar o MenteJovem.";
        msg.style.display = "block";
        cadastroForm.reset();
    });
}

// MURAL
function enviarRelato() {
    const campo = document.getElementById("relato");
    const relatos = document.getElementById("relatos");
    if (!campo || !relatos) return;
    const texto = campo.value.trim();
    if (!texto) { alert("Digite um relato antes de enviar."); return; }
    const novo = document.createElement("div");
    novo.className = "relato";
    const p = document.createElement("p");
    p.textContent = texto;
    const small = document.createElement("small");
    small.textContent = "Relato enviado para moderação • Anônimo";
    novo.appendChild(p);
    novo.appendChild(document.createElement("br"));
    novo.appendChild(small);
    relatos.prepend(novo);
    campo.value = "";
    alert("Relato enviado! No sistema completo, ele passará por moderação antes da publicação.");
}

// BUSCA DE PSICÓLOGOS
const buscaPsi = document.getElementById("buscaPsi");
const filtroPsi = document.getElementById("filtroPsi");
function filtrarPsicologos() {
    const termo = (buscaPsi?.value || "").toLowerCase();
    const filtro = filtroPsi?.value || "";
    document.querySelectorAll(".psych-card").forEach(card => {
        const texto = card.textContent.toLowerCase();
        const tags = card.dataset.tags || "";
        const aparece = texto.includes(termo) && (!filtro || tags.includes(filtro));
        card.style.display = aparece ? "block" : "none";
    });
}
if (buscaPsi) buscaPsi.addEventListener("input", filtrarPsicologos);
if (filtroPsi) filtroPsi.addEventListener("change", filtrarPsicologos);

function abrirPerfil(nome, especialidade, nota, avaliacoes, tags) {
    const modal = document.getElementById("profileModal");
    const content = document.getElementById("modalContent");
    if (!modal || !content) return;
    content.innerHTML = `<div class="modal-avatar">🧑‍⚕️</div>
    <span class="verified">✓ Perfil verificado*</span>
    <h2>${nome}</h2>
    <p class="specialty">${especialidade}</p>
    <div class="rating">★★★★★ <b>${nota}</b> <small>(${avaliacoes} avaliações)</small></div>
    <p><strong>Especialidades:</strong> ${tags}</p>
    <p class="review">“Profissional acolhedor(a), atencioso(a) e respeitoso(a).”<br><small>— Avaliação anônima demonstrativa</small></p>
    <button class="btn" onclick="fecharPerfil()">Fechar</button>`;
    modal.classList.add("show");
}
function fecharPerfil() {
    const modal = document.getElementById("profileModal");
    if (modal) modal.classList.remove("show");
}
window.addEventListener("click", e => {
    const modal = document.getElementById("profileModal");
    if (e.target === modal) fecharPerfil();
});
