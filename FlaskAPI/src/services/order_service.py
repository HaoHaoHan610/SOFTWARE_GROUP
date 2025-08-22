from infrastructure.models.OrderModel import OrderModel
from infrastructure.repositories.orderRepositories import OrderRepository
from datetime import datetime
from typing import Optional, List


class OrderService:
    def __init__(self, repository: OrderRepository):
        self.repository = repository

    def create_order(
        self,
        user_id: int,
        watch_id: int,
        quantity: int,
        total_price: float,
        status: str = "pending",
        created_at: Optional[datetime] = None,
        updated_at: Optional[datetime] = None
    ) -> OrderModel:
        """Tạo order mới"""
        if created_at is None:
            created_at = datetime.utcnow()
        if updated_at is None:
            updated_at = datetime.utcnow()

        order = OrderModel(
            user_id=user_id,
            watch_id=watch_id,
            quantity=quantity,
            total_price=total_price,
            status=status,
            created_at=created_at,
            updated_at=updated_at,
        )
        return self.repository.add(order)

    def get_order(self, user_id: int, watch_id: int) -> Optional[OrderModel]:
        """Lấy order theo (user_id, watch_id)"""
        return self.repository.get_by_id(user_id, watch_id)

    def list_orders(self) -> List[OrderModel]:
        """Lấy tất cả order"""
        return self.repository.get_all()

    def update_order(
        self,
        user_id: int,
        watch_id: int,
        quantity: int,
        total_price: float,
        status: str,
        updated_at: Optional[datetime] = None,
    ) -> Optional[OrderModel]:
        """Cập nhật order"""
        if updated_at is None:
            updated_at = datetime.utcnow()

        order = OrderModel(
            user_id=user_id,
            watch_id=watch_id,
            quantity=quantity,
            total_price=total_price,
            status=status,
            created_at=datetime.utcnow(),
            updated_at=updated_at,
        )
        return self.repository.update(order)

    def delete_order(self, user_id: int, watch_id: int) -> bool:
        """Xóa order theo khóa chính"""
        return self.repository.delete(user_id, watch_id)

    def list_by_user(self, user_id: int) -> List[OrderModel]:
        """Lấy tất cả order của một user"""
        return self.repository.get_by_user_id(user_id)

    def list_by_status(self, status: str) -> List[OrderModel]:
        """Lấy tất cả order theo trạng thái"""
        return self.repository.get_by_status(status)

    def change_status(self, user_id: int, watch_id: int, new_status: str) -> Optional[OrderModel]:
        """Thay đổi trạng thái order"""
        return self.repository.update_status(user_id, watch_id, new_status)

    def calculate_user_total(self, user_id: int) -> float:
        """Tính tổng giá trị đơn hàng của 1 user"""
        return self.repository.calculate_total_price(user_id)
