from sqlalchemy.orm import Session
from infrastructure.databases.mssql import session
from infrastructure.models.Order_DetailModel import OrderDetailModel
from infrastructure.models.OrderModel import OrderModel
from domain.models.Order import Order
from typing import List, Optional
from datetime import datetime


class OrderRepository:
    def __init__(self, session: Session = session):
        self.session = session

    def add(self, order: Order) -> Optional[OrderModel]:
        """Thêm order mới"""
        try:
            orderobj = OrderModel(
                customer_id = order.customer_id,
                status = "Pending",
                created_at = datetime.utcnow(),
                updated_at = datetime.utcnow(),
                address = order.address,
                quantity = order.quantity
            )
            self.session.add(orderobj)
            self.session.commit()
            self.session.refresh(orderobj)
            return orderobj
        finally:
            self.session.close()

    def get_by_id(self, id: int)->Optional[OrderModel]:
        return self.session.query(OrderModel).filter_by(id=id).first()

    def get_all(self)->list[OrderModel]:
        return self.session.query(OrderModel).all()
    
    # def get_all_order(self,order_id)->list[Order]:
    #     return self.session.query(OrderDetailModel).filter_by(order_id=order_id).all()
    
    # def get_by_order_watch(self,order_id:int,watch_id:int)->Optional[OrderDetailModel]:
    #     return self.session.query(OrderDetailModel).filter_by(order_id=order_id,watch_id=watch_id)

    def update(self, order: Order) -> Optional[OrderModel]:
        try:
            order_obj = self.get_by_id(id=order.id)
            if not order_obj:
                return None

            if order.customer_id is not None:
                order_obj.customer_id = order.customer_id
            if order.quantity is not None:
                order_obj.quantity = order.quantity
            if order.status is not None:
                order_obj.status = order.status  # thêm dòng này
            if order.address is not None:
                order_obj.address = order.address

            order_obj.updated_at = datetime.utcnow()
            
            # self.session.merge(order_obj)
            self.session.commit()
            self.session.refresh(order_obj)
            
            return order_obj
        
        except Exception:
            self.session.rollback()
            raise ValueError("Order not found or update failed")
        
        finally:
            self.session.close()


    def delete(self, order: Order) -> bool:
        try:
            orderobj = self.get_by_id(id=order.id)
            if orderobj:
                self.session.delete(orderobj)
                self.session.commit()

                details = self.session.query(OrderDetailModel).filter_by(order_id=order.id).all()
                if details:
                    for d in details:
                        self.session.delete(d)
                    self.session.commit()

                return True
            return False
        except Exception:
            self.session.rollback()
            raise
        finally:
            self.session.close()


    def get_customer(self,id:int)->list[OrderModel]:
        return self.session.query(OrderModel).filter(OrderModel.customer_id==id).all()
    
    def status_change(self, id: int, new_status: str) -> Optional[OrderModel]:
        try:
            order_obj = self.get_by_id(id=id)
            if not order_obj:
                return None

            # Quy tắc chuyển trạng thái
            valid_transitions = {
                "Pending": ["Shipping", "Cancelled"],
                "Shipping": ["Completed", "Cancelled"],
                "Completed": [],
                "Cancelled": []
            }

            current_status = order_obj.status
            print(f"[DEBUG] Current: {current_status} -> New: {new_status}")

            if new_status not in valid_transitions.get(current_status, []):
                raise ValueError(
                    f"Không thể đổi trạng thái từ '{current_status}' sang '{new_status}'"
                )

            # Cập nhật trạng thái đơn hàng
            order_obj.status = new_status
            order_obj.updated_at = datetime.utcnow()

            # Nếu Shipping hoặc Completed → đồng hồ ko còn tồn tại để bán
            if new_status in ["Shipping", "Completed"]:
                for d in order_obj.details:
                    if d.watch and d.watch.existing_status:
                        d.watch.existing_status = False
                        print(f"[INFO] Watch {d.watch.id} set existing_status = False (Order {order_obj.id})")

            self.session.commit()
            self.session.refresh(order_obj)
            return order_obj

        except Exception:
            self.session.rollback()
            raise
        finally:
            self.session.close()

