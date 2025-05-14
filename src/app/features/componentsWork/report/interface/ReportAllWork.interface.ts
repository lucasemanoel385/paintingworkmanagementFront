import { ViewExtraWork } from "../../../componentsExtraWork/interface/ViewExtraWork.interface";
import { Expense } from "../../expense/interface/Expense.interface";
import { PaymentEmployee } from "../../interface/PaymentEmployee.interface";
import { Revenue } from "../../revenue/interface/Revenue.interface";
import { PaymentEmployeeReport } from "./PaymentEmployeeReport.interface";

export interface ReportAllWork{
    extraWorkList: ViewExtraWork[],
    expensesList: Expense[],
    revenueList: Revenue[],
    paymentList: PaymentEmployee[],
    paymentEmployeeList: PaymentEmployeeReport[],
    totalExtraWork: number,
    totalRevenue: number,
    totalExpense: number,
    totalPayment: number,
    totalPaymentEmployee: number,
    totalLiquid: number



}