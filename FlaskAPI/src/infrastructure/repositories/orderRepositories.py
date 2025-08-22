from sqlalchemy.orm import Session
from infrastructure.databases.mssql import session
from infrastructure.models.OrderModel import OrderModel
from typing import List, Optional
from datetime import datetime

class OrderRepository:
    def __init__(self, session: Session = session):
        self.session = session

    def add(self, order: OrderModel) -> OrderModel:
        """Thêm một order mới"""
        try:
            self.session.add(order)
            self.session.commit()
            self.session.refresh(order)
            return order
        except Exception as e:
            self.session.rollback()
            raise e
        finally:
            self.session.close()

    def get_by_id(self, user_id: int, watch_id: int) -> Optional[OrderModel]:
        """Lấy order theo cặp khóa chính (user_id, watch_id)"""
        return self.session.query(OrderModel).filter_by(
            user_id=user_id, watch_id=watch_id
        ).first()

    def get_all(self) -> List[OrderModel]:
        """Lấy tất cả order"""
        return self.session.query(OrderModel).all()

    def update(self, order: OrderModel) -> Optional[OrderModel]:
        """Cập nhật order (theo user_id + watch_id)"""
        try:
            self.session.merge(order)
            self.session.commit()
            return order
        except Exception:
            self.session.rollback()
            raise ValueError("Order not found or update failed")
        finally:
            self.session.close()

    def delete(self, user_id: int, watch_id: int) -> bool:
        """Xóa order theo cặp khóa chính"""
        try:
            order = self.get_by_id(user_id, watch_id)
            if order:
                self.session.delete(order)
                self.session.commit()
                return True
            return False
        except Exception:
            self.session.rollback()
            raise
        finally:
            self.session.close()

    def get_by_user_id(self, user_id: int) -> List[OrderModel]:
        """Lấy tất cả order của một user"""
        return self.session.query(OrderModel).filter_by(user_id=user_id).all()

    def get_by_status(self, status: str) -> List[OrderModel]:
        """Lấy tất cả order theo trạng thái (pending, completed, canceled, ...)"""
        return self.session.query(OrderModel).filter_by(status=status).all()

    def update_status(self, user_id: int, watch_id: int, new_status: str) -> Optional[OrderModel]:
        """Cập nhật trạng thái order"""
        try:
            order = self.get_by_id(user_id, watch_id)
            if not order:
                return None
            order.status = new_status
            order.updated_at = datetime.now()
            self.session.commit()
            self.session.refresh(order)
            return order
        except Exception:
            self.session.rollback()
            raise
        finally:
            self.session.close()

    def calculate_total_price(self, user_id: int) -> float:
        """Tính tổng giá trị tất cả order của một user"""
        orders = self.get_by_user_id(user_id)
        return sum(order.total_price for order in orders)

