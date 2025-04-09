/**
 * Tipe untuk navigasi transaksi
 * @extends Record<string, object | undefined>
 */
export interface TransactionsStackParamList extends Record<string, object | undefined> {
  TransactionsList: undefined;
  TransactionDetail: { transactionId: string };
  AddTransaction: undefined;
  EditTransaction: { transactionId: string };
  ScanReceipt: undefined;
}
