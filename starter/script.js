'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Funzione per visualizzare i movimenti
const displayMovements = function(movements) {
  // Pulisce il contenitore dei movimenti
  containerMovements.innerHTML = ' ';

  // Itera su ciascun movimento
  movs.forEach(function (mov, i) {
    // Determina il tipo di movimento: deposito o prelievo
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    // Crea il codice HTML per ciascun movimento
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;

    // Inserisce il codice HTML nel contenitore dei movimenti
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// Funzione per calcolare e visualizzare il saldo
const calcDisplayBalance = function (movements) {
  // Calcola il saldo totale sommando tutti i movimenti
  const balance = movements.reduce((acc, mov) => acc + mov, 0);
  // Visualizza il saldo nel label appropriato
  labelBalance.textContent = `${balance} EUR`;
};

// Funzione per calcolare e visualizzare il riepilogo
const calcDisplaySummary = function (movements) {
  // Calcola il totale degli introiti
  const incomes = acc.movements
    .filter(mov => mov > 0) // Filtra solo i movimenti positivi (introiti)
    .reduce((acc, mov) => acc + mov, 0); // Somma tutti gli introiti
  labelSumIn.textContent = `${incomes}€`; // Visualizza il totale degli introiti

  // Calcola il totale delle uscite
  const out = acc.movements
    .filter(mov => mov < 0) // Filtra solo i movimenti negativi (uscite)
    .reduce((acc, mov) => acc + mov, 0); // Somma tutte le uscite
  labelSumOut.textContent = `${Math.abs(out)}€`; // Visualizza il totale delle uscite in valore assoluto

  // Calcola gli interessi
  const interest = acc.movements
    .filter(mov => mov > 0) // Filtra solo i movimenti positivi (introiti)
    .map(deposit => (deposit * acc.interestRate) / 100) // Calcola gli interessi su ogni deposito
    .filter((int, i, arr) => {
      return int >= 1; // Filtra solo gli interessi maggiori o uguali a 1
    })
    .reduce((acc, int) => acc + int, 0); // Somma tutti gli interessi
  labelSumInterest.textContent = `${interest}€`; // Visualizza il totale degli interessi
};

// Calcola e visualizza il saldo per account1 e i movimenti
calcDisplayBalance(account1, movements);

// Funzione per creare i nomi utente
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    // Crea il nome utente prendendo le iniziali dei nomi
    acc.username = acc.owner 
      .toLowerCase() // Converte tutto in minuscolo
      .split(' ') // Divide il nome completo in un array di parole
      .map(name => name[0]) // Prende la prima lettera di ogni parola
      .join(''); // Unisce le lettere per creare il nome utente
  });
};
// Crea i nomi utente per tutti gli account
createUsernames(accounts);


/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

