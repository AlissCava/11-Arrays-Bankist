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

/*
// Funzione per calcolare e visualizzare il saldo
const calcDisplayBalance = function (movements) {
  // Calcola il saldo totale sommando tutti i movimenti
  const balance = movements.reduce((acc, mov) => acc + mov, 0);
  // Visualizza il saldo nel label appropriato
  labelBalance.textContent = `${balance} EUR`;
};
*/
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

// Funzione per calcolare e visualizzare il riepilogo
const calcDisplaySummary = function (acc) {
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

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

let currentAccount

// Gestore evento click per il pulsante di login (pulsante di accesso)
btnLogin.addEventListener('click', function(e){
  // Impedisce l'invio del modulo predefinito se applicabile (ad esempio, se il pulsante si trova all'interno di un modulo di login)
  e.preventDefault();

  // Cerca l'account corrispondente in base al nome utente inserito in inputLoginUsername (campo nome utente di login)
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount); // A scopo di debug (può essere rimosso in seguito)

  if (currentAccount && currentAccount.pin === Number(inputLoginPin.value)) {
    // Accesso effettuato correttamente: aggiorna l'interfaccia utente e visualizza il messaggio di benvenuto
    labelWelcome.textContent = `Benvenuto ${currentAccount.owner.split(' ')[0]}`;  // Imposta il testo dell'etichetta di benvenuto
    containerApp.computedStyleMap.opacity = 100; // Rendi visibile l'interfaccia utente dell'applicazione

    // Pulisce i campi di input di login
    inputLoginPin.blur(); // Rimuove lo stato di focus dal campo PIN

    // Aggiorna l'interfaccia utente con le informazioni dell'account corrente (chiama una funzione per aggiornare gli elementi dell'interfaccia utente)
    updateUI(currentAccount);
  } else {
    // Accesso fallito: gestisce le credenziali errate (facoltativo)
    console.error('Nome utente o PIN errati'); // Gestione errori di esempio (considera la visualizzazione di un messaggio all'utente)
  }
});

// Gestore evento click per il pulsante di bonifico
btnTransfer.addEventListener('click', function(e){
  e.preventDefault();

  // Ottiene l'importo del bonifico come numero
  const amount = Number(inputTransferAmount.value);

  // Trova il conto del destinatario in base al nome utente inserito in inputTransferTo (campo nome utente del destinatario del bonifico)
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  // Pulisce i campi di input del bonifico
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 && // Assicura un importo positivo
    receiverAcc && // Assicura che il conto del destinatario sia stato trovato
    currentAccount.balance >= amount && // Assicura un saldo sufficiente
    receiverAcc.username !== currentAccount.username // Evita il bonifico a se stesso
  ) {
    // Il bonifico è valido: esegui il bonifico
    currentAccount.movements.push(-amount); // Aggiungi un movimento negativo (prelievo)
    receiverAcc.movements.push(amount); // Aggiungi un movimento positivo (deposito)

    // Aggiorna l'interfaccia utente con le informazioni aggiornate sull'account (chiama una funzione per aggiornare gli elementi dell'interfaccia utente)
    updateUI(currentAccount);
  } else {
    // Bonifico fallito: gestisci i tentativi di bonifico non validi (facoltativo)
    console.error('Bonifico fallito: importo, destinatario o saldo insufficiente'); // Gestione errori di esempio (considera la visualizzazione di un messaggio di errore chiaro per l'utente)
  }
});

// Gestore evento click per il pulsante di prestito
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Il prestito è valido: aggiungi il movimento e aggiorna l'interfaccia utente
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  } else {
    // Richiesta di prestito non valida: gestisci le richieste di prestito non valide (facoltativo)
    console.error('Richiesta di prestito fallita: importo non valido o movimenti precedenti insufficienti'); // Gestione errori di esempio (considera la visualizzazione di un messaggio di errore chiaro per l'utente)
  }
  inputLoanAmount.value = ''; 
});

// Gestore evento click per il pulsante di chiusura conto (pulsante per chiudere l'account)
btnClose.addEventListener('click', function (e) {
  e.preventDefault();  // Impedisce l'invio del modulo predefinito

  if (
    inputCloseUsername.value === currentAccount.username &&  // Controlla la corrispondenza di nome utente e PIN
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(  // Trova l'indice dell'account da chiudere
      acc => acc.username === currentAccount.username
    );
    console.log(index); // A scopo di debug (può essere rimosso in seguito)

    // Elimina l'account dall'array accounts
    accounts.splice(index, 1);

    // Nascondi l'interfaccia utente dell'applicazione
    containerApp.style.opacity = 0;
  } else {
    // Chiusura del conto fallita: credenziali errate
    console.error('Nome utente o PIN errati per la chiusura del conto'); // Gestione errori di esempio
  }

  // Pulisce i campi di input per la chiusura del conto
  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false; // Flag per tenere traccia dello stato di ordinamento
btnSort.addEventListener('click', function (e) {
  e.preventDefault();  // Impedisce l'invio del modulo predefinito

  // Chiama la funzione displayMovements per visualizzare i movimenti (ordinati o non ordinati)
  displayMovements(currentAccount.movements, !sorted);

  // Inverte il flag sorted per indicare lo stato di ordinamento opposto
  sorted = !sorted;
});

/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

