from infrastructure.repositories.Transaction_Repositories import TransactionRepository, EscrowRepository
from infrastructure.repositories.Order_Repositories import OrderRepository
from infrastructure.repositories.Order_Detail_Repositories import OrderDetail_Repository
from infrastructure.repositories.Watch_Repositories import WatchRepository
from infrastructure.models.TransactionModel import TransactionModel, EscrowModel
from typing import Optional, List

class TransactionService:
    def __init__(self, transaction_repo: TransactionRepository):
        self.transaction_repo = transaction_repo

    def create_transaction(self, order_id: int, amount: Optional[float]=None) -> Optional[TransactionModel]:
        return self.transaction_repo.create_transaction(order_id, amount)

    def get_transaction(self, transaction_id: int) -> Optional[TransactionModel]:
        return self.transaction_repo.get_transaction(transaction_id)

    def list_transactions(self) -> List[TransactionModel]:
        return self.transaction_repo.list_transactions()
    


class EscrowService:
    def __init__(self, escrow_repo: EscrowRepository):
        self.escrow_repo = escrow_repo
        self.transaction_repo = TransactionRepository
        self.details = OrderDetail_Repository
        self.watchs = WatchRepository

    def create_escrow(self, transaction_id: int, amount: float,buyer_id:int,seller_id:int
                      ) -> EscrowModel:
        return self.escrow_repo.create_escrow(transaction_id, amount,buyer_id=buyer_id,seller_id=seller_id)

    def release_escrow(self, escrow_id: int) -> Optional[EscrowModel]:
        return self.escrow_repo.release_escrow(escrow_id)
    
    def update_transactions_status(self,transaction_id:int,status:str)->list[EscrowModel]:
        transactions = self.escrow_repo.get_transaction(transaction_id=transaction_id)
        for tran in transactions:
            self.escrow_repo.update_escrow(id=tran.id,status=status)
        return transactions

    def create_TransactionEscrow(self,transaction_id:int)->list[EscrowModel]:
        return self.escrow_repo.create_EscrowTransaction(transaction_id=transaction_id)

    def release_AllTransactions(self,transaction_id:int)->list[EscrowModel]:
        return self.escrow_repo.release_escrow_all_transactions(transaction_id=transaction_id)
