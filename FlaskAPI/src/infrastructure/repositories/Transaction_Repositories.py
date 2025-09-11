from sqlalchemy.orm import Session
from infrastructure.models.TransactionModel import TransactionModel, EscrowModel
from infrastructure.models.Order_DetailModel import OrderDetailModel
from infrastructure.models.OrderModel import OrderModel
from infrastructure.models.WatchModel import WatchModel
from infrastructure.databases.mssql import session
from typing import Optional, List
from datetime import datetime

class TransactionRepository:
    def __init__(self, session: Session = session):
        self.session = session

    def create_transaction(self,order_id: int, amount: Optional[float]=None) -> Optional[TransactionModel]:
        order = self.session.query(OrderModel).filter(OrderModel.status == "Pending",OrderModel.id == order_id).first()
        if not order:
            return None 
        order_details = self.session.query(OrderDetailModel).filter_by(order_id=order_id).all()
        if not order_details:
            return None
        
        if not amount:
            amount = order.amount

        transaction = TransactionModel(
            buyer_id=order.customer_id,
            # seller_id=seller_id,
            order_id=order_id,
            amount=amount,
            status="pending",
            created_at=datetime.utcnow()
        )
        self.session.add(transaction)
        self.session.commit()
        self.session.refresh(transaction)
        return transaction

    def get_transaction(self, transaction_id: int) -> Optional[TransactionModel]:
        return self.session.query(TransactionModel).filter_by(id=transaction_id).first()

    def list_transactions(self) -> List[TransactionModel]:
        return self.session.query(TransactionModel).all()

    def update_transaction(self, transaction_id: int, status: Optional[str] = None,
                           amount: Optional[float] = None) -> Optional[TransactionModel]:
        tx = self.session.query(TransactionModel).filter_by(id=transaction_id).first()
        if not tx:
            return None
        if status is not None:
            tx.status = status
        if amount is not None:
            tx.amount = amount
        self.session.commit()
        self.session.refresh(tx)
        return tx


class EscrowRepository:
    def __init__(self, session: Session = session):
        self.session = session

    def create_escrow(self,seller_id:int, transaction_id: int, amount: float) -> EscrowModel:

        escrow = EscrowModel(
            seller_id = seller_id,
            transaction_id=transaction_id,
            amount=amount,
            status="holding",
            created_at=datetime.utcnow()
        )
        self.session.add(escrow)
        self.session.commit()
        self.session.refresh(escrow)
        return escrow
    
    def get_by(self,id:int):
        return self.session.query(EscrowModel).filter_by(id=id).first()
    
    def update_escrow(self,id:int,status:Optional[str]=None,seller_id:Optional[int]=None,transaction_id:Optional[int]=None,amount:Optional[float]=None)->Optional[EscrowModel]:
        escrow = self.get_by(id=id)
        
        if not escrow:
            return None 
        
        if seller_id is not None:
            escrow.seller_id = seller_id
        if transaction_id is not None:
            escrow.transaction_id = transaction_id
        if amount is not None:
            escrow.amount = amount
        if status is not None:
            escrow.status = status

        self.session.commit()
        self.session.refresh(escrow)

        return escrow


    def get_transaction(self,transaction_id:int):
        return self.session.query(EscrowModel).filter_by(transaction_id = transaction_id).all()

    def release_escrow(self, escrow_id: int) -> Optional[EscrowModel]:
        escrow = self.session.query(EscrowModel).filter_by(id=escrow_id).first()
        if escrow:
            escrow.status = "released"
            escrow.released_at = datetime.utcnow()
            self.session.commit()
            self.session.refresh(escrow)
        return escrow
    
    def create_EscrowTransaction(self, transaction_id: int) -> list[EscrowModel]:
        transaction = self.session.query(TransactionModel).filter_by(id=transaction_id).first()
        if not transaction:
            return []

        details = (
            self.session.query(OrderDetailModel)
            .filter_by(order_id=transaction.order_id)
            .all()
        )
        if not details:
            return []

        # Aggregate amount per seller: sum(quantity * price)
        seller_amounts: dict[int, float] = {}
        for detail in details:
            watch = self.session.query(WatchModel).filter_by(id=detail.watch_id).first()
            if not watch:
                continue
            amount = float(watch.price) * (detail.quantity or 1)
            seller_amounts[watch.seller_id] = seller_amounts.get(watch.seller_id, 0.0) + amount

        for seller_id, amount in seller_amounts.items():
            self.create_escrow(
                seller_id=seller_id,
                transaction_id=transaction.id,
                amount=amount,
            )

        return self.get_transaction(transaction_id=transaction.id)
    

    def release_escrow_all_transactions(self,transaction_id:int):
        transactions = self.get_transaction(transaction_id=transaction_id)
        for trans in transactions:
            self.release_escrow(trans.id)
        return transactions