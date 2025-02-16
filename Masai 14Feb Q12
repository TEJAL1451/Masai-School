function createBankAccount(initialBalance) {
    let balance = initialBalance; 
  
    return {
      deposit: function (amount) {
        if (amount > 0) {
          balance += amount;
          return balance;
        }
        return "Deposit amount must be positive.";
      },
  
      withdraw: function (amount) {
        if (amount > balance) {
          return "Insufficient funds.";
        }
        if (amount > 0) {
          balance -= amount;
          return balance;
        }
        return "Withdrawal amount must be positive.";
      },
  
      getBalance: function () {
        return balance;
      }
    };
  }
  
  const account = createBankAccount(100);
  
  console.log(account.deposit(50)); 
  console.log(account.withdraw(30)); 
  console.log(account.getBalance()); 
  console.log(account.withdraw(200)); 
  console.log(account.balance); 
  
