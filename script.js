const form = document.getElementById("form-age-calculator");
const date = new Date();
const currentYear = Number(date.getFullYear());
// O mês em date começa com zero, então adicionei +1 pra fazer a comparação da forma correta
const currentMonth = date.getMonth() + 1;
const currentDay = date.getDate();

// Seletores para dia, mês e ano
const dayElements = {
  textDay: document.querySelector(".day label"),
  span: document.querySelector(".day span"),
  input: document.querySelector(".day input"),
};

const monthElements = {
  textMonth: document.querySelector(".month label"),
  span: document.querySelector(".month span"),
  input: document.querySelector(".month input"),
};

const yearElements = {
  textYear: document.querySelector(".year label"),
  span: document.querySelector(".year span"),
  input: document.querySelector(".year input"),
};

// Função de validação de data completa
function isValidDate(day, month, year) {
  const date = new Date(year, month - 1, day); // Mês começa em 0 no JS
  return (
    date.getFullYear() === parseInt(year) &&
    date.getMonth() === month - 1 &&
    date.getDate() === parseInt(day)
  );
}

// Função que valida e impede envio se inválido
function mostraValores(event) {
  event.preventDefault();

  const day = parseInt(dayElements.input.value);
  const month = parseInt(monthElements.input.value);
  const year = parseInt(yearElements.input.value);

  const dataAtual = new Date();
  const mesAtual = dataAtual.getMonth();
  const mesAtualFormatado = mesAtual + 1;
  console.log(mesAtualFormatado);

  let hasError = false;

  // Validação do dia
  if (isNaN(day) || day < 1 || day > 31) {
    dayElements.span.innerText = "Must be a validit day";
    dayElements.input.classList.add("invalid");
    hasError = true;
  } else {
    dayElements.span.innerText = "";
    dayElements.input.classList.remove("invalid");
  }

  // Validação do mês
  if (isNaN(month) || month < 1 || month > 12) {
    monthElements.span.innerText = "Must be a validit month";
    monthElements.input.classList.add("invalid");
    hasError = true;
  } else {
    monthElements.span.innerText = "";
    monthElements.input.classList.remove("invalid");
  }

  // Validação do ano
  if (isNaN(year) || year < 1980 || year > currentYear) {
    yearElements.span.innerText = "Must be a validit year";
    yearElements.input.classList.add("invalid");
    hasError = true;
  } else {
    yearElements.span.innerText = "";
    yearElements.input.classList.remove("invalid");
  }

  // Verificação da data completa
  if (!hasError && !isValidDate(day, month, year)) {
    dayElements.span.innerText = "Must be a validit day";
    monthElements.span.innerText = " ";
    yearElements.span.innerText = " ";
    hasError = true;
  }
  if (year > currentYear) {
    console.log("Você não pode nascer no futuro, dog!");
    hasError = true;
  } else if (year === currentYear) {
    if (month > currentMonth) {
      console.log("Você não pode nascer em um mês futuro, dog!");
      hasError = true;
    } else if (month === currentMonth && day > currentDay) {
      console.log("Você não pode nascer em um dia futuro, dog!");
      hasError = true;
    }
  }

  // Se não houver erro, prossiga
  if (!hasError) {
    const date = new Date();
    const birthDate = new Date(year, month - 1, day); // mês começa do 0 no JS

    // Calcula a diferença em milissegundos
    let diffInMs = date - birthDate;

    // Converte para dias totais
    const totalDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    // Calcula anos, meses e dias
    let ageYears = date.getFullYear() - birthDate.getFullYear();
    let ageMonths = date.getMonth() - birthDate.getMonth();
    let ageDays = date.getDate() - birthDate.getDate();

    if (ageDays < 0) {
      ageMonths--;
      const prevMonth = new Date(date.getFullYear(), date.getMonth(), 0);
      ageDays += prevMonth.getDate();
    }

    if (ageMonths < 0) {
      ageYears--;
      ageMonths += 12;
    }

    gsap.fromTo(
      ".result-year",
      { innerText: 0 }, 
      {
        innerText: ageYears,
        duration: 2,
        snap: { innerText: 1 }, 
        ease: "power1.out",
      }
    );

    gsap.fromTo(
      ".result-month",
      { innerText: 0 },
      {
        innerText: ageMonths,
        duration: 2,
        snap: { innerText: 1 },
        ease: "power1.out", 
      }
    );

    gsap.fromTo(
      ".result-day",
      { innerText: 0 },
      {
        innerText: ageDays,
        duration: 2,
        snap: { innerText: 1 },
        ease: "power1.out",
      }
    );

    // document.querySelector(".result-year").innerText = ageYears;
    // document.querySelector(".result-month").innerText = ageMonths;
    // document.querySelector(".result-day").innerText = ageDays;
  }
}

// Aplica estado inválido quando o campo é alterado
function handleFormChange(event) {
  const target = event.target;
  const value = target.value;

  function aplicarEstadoInvalido(element, condition) {
    for (let chave in element) {
      element[chave].classList.toggle("invalid", condition);
    }
  }

  if (target.name === "day") {
    aplicarEstadoInvalido(dayElements, value > 31 || value < 1);
  }
  if (target.name === "month") {
    aplicarEstadoInvalido(monthElements, value > 12 || value < 1);
  }
  if (target.name === "year") {
    aplicarEstadoInvalido(yearElements, value < 1980 || value > currentYear);
  }
}

// Eventos
form.addEventListener("submit", mostraValores);
form.addEventListener("change", handleFormChange);
