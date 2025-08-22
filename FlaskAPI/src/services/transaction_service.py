from infrastructure.models.TransactionModel import TransactionModel
from infrastructure.repositories.Transaction_Repositories import TransactionRepository
from domain.models.Transaction import Transaction
from datetime import datetime
from typing import Optional,List

class TransactionService:
    def __init__(self, repository: TransactionRepository):
        self.repository = repository
    
    def create_transaction(self, price: str, status: str,order_id: int,created_at:Optional[datetime] = None) -> TransactionModel:
        if created_at is None:
            created_at = datetime.utcnow()

        transaction = TransactionModel(
            id=None,
            price = price,
            status=status,
            order_id= order_id,
            date = created_at
        )
        return self.repository.add(transaction)
    
    def get_user(self,id: int): #-> Optional[UserModel]:
        return self.repository.get_by_id(id)
    
    def update(self, id: int, price: Optional[float] = None, status: Optional[str] = None,
        order_id: Optional[int] = None, created_at: Optional[datetime] = None) -> Optional[TransactionModel]:
    # lấy user gốc
        transaction = self.repository.get_by_id(id)
        if not transaction:
            return None

        if price is not None:
            transaction.price = price
        if status is not None:
            transaction.status = status
        if order_id is not None:
            transaction.order_id = order_id
        if created_at is not None:
            transaction.date = created_at

        return self.repository.update(transaction)
    
    def list(self):
        return self.repository.get_all_user()
    
    def delete(self,id: int) -> None:
        self.repository.delete(id)