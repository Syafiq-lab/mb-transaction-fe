import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class TransactionsComponent implements OnInit {
  transactions: any[] = [];
  selectedTransaction: any = {};
  errorMessage: string | null = null;
  page: number = 0;
  size: number = 10;
  searchTerm: string = '';

  constructor(private transactionService: TransactionService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.fetchTransactions();
  }

  fetchTransactions(): void {
    if (this.searchTerm.trim()) {
      this.transactionService.searchTransactionsAnyField(this.searchTerm, this.page, this.size).subscribe(
        response => {
          if (response && response.data && response.data.transactions) {
            this.transactions = response.data.transactions;
          } else {
            console.error('Unexpected response structure', response);
            this.errorMessage = 'Failed to fetch transactions: Unexpected response structure';
          }
        },
        error => {
          console.error('Failed to fetch transactions', error);
          this.errorMessage = 'Failed to fetch transactions';
        }
      );
    } else {
      this.transactionService.searchTransactions('', '', '', this.page, this.size).subscribe(
        response => {
          if (response && response.data && response.data.transactions) {
            this.transactions = response.data.transactions;
          } else {
            console.error('Unexpected response structure', response);
            this.errorMessage = 'Failed to fetch transactions: Unexpected response structure';
          }
        },
        error => {
          console.error('Failed to fetch transactions', error);
          this.errorMessage = 'Failed to fetch transactions';
        }
      );
    }
  }

  nextPage(): void {
    this.page++;
    this.fetchTransactions();
  }

  previousPage(): void {
    if (this.page > 0) {
      this.page--;
      this.fetchTransactions();
    }
  }

  onSearch(): void {
    this.page = 0;
    this.fetchTransactions();
  }

  openUpdateModal(modalContent: any, transaction: any): void {
    this.selectedTransaction = { ...transaction };
    this.modalService.open(modalContent);
  }

  submitUpdate(): void {
    this.transactionService.updateTransaction(this.selectedTransaction).subscribe(
      response => {
        this.fetchTransactions();
        this.modalService.dismissAll();
      },
      error => {
        console.error('Failed to update transaction', error);
        this.errorMessage = 'Failed to update transaction';
      }
    );
  }
}
