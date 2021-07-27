import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


interface Transaction {
  good: String,
  price: Number
}


@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {

  constructor() { }
  public goodName: String = "";
  public goodPrice: number = 0;
  public income: number = 0;
  public incomeBack: number = 0;
  public totalCost: number = 0;
  public button: number = 1;
  public total: number = 0;
  public incomeAmount: number = 0;
  public transactionTot: number = 0;
  public transactionArr: Array<Transaction> = []

  ngOnInit(): void {
    // console.log(this.actRoute.params.value.todo);

  }


  addIncome() {
    if (this.income !== 0) {
      this.incomeAmount = this.income
      this.incomeBack = this.income
      this.button = 0
      this.income = 0
    } else {
      alert('enter valid amount')
    }
  }
  addGood() {
    if (this.incomeAmount > 0) {
      if (this.incomeAmount >= this.goodPrice) {
        if (this.goodPrice > 0) {
          this.transactionArr.unshift({ good: this.goodName, price: this.goodPrice })
          this.incomeAmount = this.incomeAmount - this.goodPrice
          this.goodName = ''
          this.goodPrice = 0

          let cost: any = this.transactionArr.map((val) => val.price)
          for (let i = 0; i < cost.length; i++) {
            this.totalCost += cost[i]
          }
          this.total = this.totalCost
          this.totalCost = 0
        } else {
          alert("price cannot be less than 1  ")
        }
      } else {
        alert("sorry your budget balance is lower than the transaction amount, kindly add budget")
      }
    } else {
      alert("kindly add budget")
    }


  }
  deleteTrans(i: any) {
    if (confirm("are you sure?")) {

      let newArr = this.transactionArr.filter((val, ind) => ind !== i)
      let currentDelete: any = this.transactionArr.find((val, index) => index === i)
      this.transactionArr = newArr
      let cost: any = this.transactionArr.map((val) => val.price)
      for (let i = 0; i < cost.length; i++) {
        this.totalCost += cost[i]
      }
      this.incomeAmount += currentDelete.price

      this.total = this.totalCost
      this.totalCost = 0
    }
  }

}


