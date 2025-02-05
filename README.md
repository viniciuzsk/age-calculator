# Age Calculator App

Um aplicativo web que calcula a idade com base na data de nascimento fornecida, apresentando animações suaves nos resultados.

![Preview](/screenshot.png) <!-- Adicione uma imagem de preview se disponível -->

[Acesse](https://viniciuzsk.github.io/age-calculator/)

## Funcionalidades

- Validação de formulário em tempo real
- Cálculo preciso de idade (anos, meses e dias)
- Animações suaves com GSAP
- Design responsivo
- Mensagens de erro detalhadas

## Tecnologias Utilizadas

- HTML5
- CSS3 (Flexbox, Grid)
- JavaScript (Date Object, Validação de Formulários)
- GSAP (GreenSock Animation Platform)
- Google Fonts (Poppins)

## O que Aprendi

### Date Object

Aprofundei no uso do objeto `Date` para manipulação de datas, cálculos precisos e validação de datas inválidas.

### Validação de Formulários

Implementei validações complexas considerando:

- Campos obrigatórios
- Faixas numéricas (dia: 1-31, mês: 1-12, ano: 1980-ano atual)
- Datas inválidas (ex: 31/04 ou 29/02 em anos não bissextos)
- Verificação de datas futuras

### GSAP Animations

Utilizei a biblioteca GSAP para criar animações fluidas nos resultados numéricos:

- Contagem progressiva
- Easing personalizado
- Sincronização de múltiplas animações

## Trechos de Código Interessantes

### Validação de Data Completa

```javascript
function isValidDate(day, month, year) {
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === parseInt(year) &&
    date.getMonth() === month - 1 &&
    date.getDate() === parseInt(day)
  );
}
```

### Cálculo da Idade

```javascript
const birthDate = new Date(year, month - 1, day);
let diffInMs = date - birthDate;
const totalDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

let ageYears = date.getFullYear() - birthDate.getFullYear();
let ageMonths = date.getMonth() - birthDate.getMonth();
let ageDays = date.getDate() - birthDate.getDate();

// Ajuste para valores negativos
if (ageDays < 0) {
  ageMonths--;
  const prevMonth = new Date(date.getFullYear(), date.getMonth(), 0);
  ageDays += prevMonth.getDate();
}

if (ageMonths < 0) {
  ageYears--;
  ageMonths += 12;
}
```

### Animação com GSAP

```javascript
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
```

## Como Usar

1. Clone o repositório

```bash
git clone https://github.com/viniciuzsk/age-calculator.git
```

2. Abra o arquivo `index.html` no navegador

3. Insira sua data de nascimento:

   - Dia (DD)
   - Mês (MM)
   - Ano (YYYY)

4. Clique no botão de seta para ver sua idade animada!

## Desafios e Soluções

- **Datas Inválidas:** Implementei uma verificação em três etapas (campo individual, intervalo numérico e validade da data combinada)
- **Animações Simultâneas:** Usei GSAP para animar múltiplos elementos com sincronização precisa
- **Cálculo Preciso:** Desenvolvi um algoritmo que considera diferentes números de dias em cada mês e anos bissextos

## Melhorias Futuras

- [ ] Adicionar suporte a internacionalização
- [ ] Implementar modo escuro
- [ ] Adicionar visualização de calendário
- [ ] Criar versão mobile-first

## Créditos

- Desafio por [Frontend Mentor](https://www.frontendmentor.io)
- Desenvolvido por [Vinicius](https://github.com/viniciuzsk)
