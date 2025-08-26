from sqlalchemy.orm import Session
from infrastructure.models.TransactionModel import TransactionModel, EscrowModel
from infrastructure.models.Order_DetailModel import OrderDetailModel
from infrastructure.databases.mssql import session
from typing import Optional, List
from datetime import datetime

class TransactionRepository:
    def __init__(self, session: Session = session):
        self.session = session

    def create_transaction(self, buyer_id: int, seller_id: int, order_id: int, amount: Optional[float]=None) -> TransactionModel:
        order_details = self.session.query(OrderDetailModel).filter_by(order_id=order_id).all()

        if not order_details:
            return None
        
        total_amount = sum([detail.price for detail in order_details])
        transaction = TransactionModel(
            buyer_id=buyer_id,
            seller_id=seller_id,
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


class EscrowRepository:
    def __init__(self, session: Session = session):
        self.session = session

    def create_escrow(self, transaction_id: int, amount: float) -> EscrowModel:
        escrow = EscrowModel(
            transaction_id=transaction_id,
            amount=amount,
            status="holding",
            created_at=datetime.utcnow()
        )
        self.session.add(escrow)
        self.session.commit()
        self.session.refresh(escrow)
        return escrow

    def release_escrow(self, escrow_id: int) -> Optional[EscrowModel]:
        escrow = self.session.query(EscrowModel).filter_by(id=escrow_id).first()
        if escrow:
            escrow.status = "released"
            escrow.released_at = datetime.utcnow()
            self.session.commit()
            self.session.refresh(escrow)
        return escrow
