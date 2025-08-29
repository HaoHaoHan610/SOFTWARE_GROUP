from infrastructure.databases.base import BASE
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, DECIMAL
from sqlalchemy.orm import relationship
from datetime import datetime

class TransactionModel(BASE):
    __tablename__ = "Transaction"
    __table_args__ = {'extend_existing': True}

    id = Column(Integer, primary_key=True, autoincrement=True)
    buyer_id = Column(Integer, ForeignKey("User.id"), nullable=False)
    # seller_id = Column(Integer, ForeignKey("User.id"), nullable=False)
    order_id = Column(Integer, ForeignKey("Order.id"), nullable=False)
    amount = Column(DECIMAL(18,2), nullable=False)
    status = Column(String(50), nullable=False, default="pending")
    created_at = Column(DateTime, default=datetime.utcnow)

    escrow = relationship("EscrowModel", back_populates="transaction", uselist=False)

# each buyer has 1 transaction, when initializing a new transaction due to mutiple escrows for each of sellers
class EscrowModel(BASE):
    __tablename__ = "Escrow"
    __table_args__ = {'extend_existing': True}

    id = Column(Integer, primary_key=True, autoincrement=True)
    transaction_id = Column(Integer, ForeignKey("Transaction.id"), nullable=False)
    seller_id = Column(Integer, ForeignKey("User.id"), nullable=False)
    amount = Column(DECIMAL(18,2), nullable=False)
    status = Column(String(50), nullable=False, default="holding")
    created_at = Column(DateTime, default=datetime.utcnow)
    released_at = Column(DateTime, nullable=True)

    transaction = relationship("TransactionModel", back_populates="escrow")
