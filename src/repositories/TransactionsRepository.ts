import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const totalIncome = this.transactions.reduce(
      (accumulator, currentValue) => {
        if (currentValue.type === 'income') {
          return accumulator + currentValue.value;
        }
        return accumulator;
      },
      0,
    );

    const totalOutcome = this.transactions.reduce(
      (accumulator, currentValue) => {
        if (currentValue.type === 'outcome') {
          return accumulator + currentValue.value;
        }
        return accumulator;
      },
      0,
    );

    const balance = {
      income: totalIncome,
      outcome: totalOutcome,
      total: totalIncome - totalOutcome,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransaction): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
