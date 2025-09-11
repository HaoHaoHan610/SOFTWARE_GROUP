from sqlalchemy.orm import Session
from infrastructure.databases.mssql import session
from infrastructure.models.Order_DetailModel import OrderDetailModel
from infrastructure.models.OrderModel import OrderModel
from infrastructure.models.WatchModel import WatchModel
from domain.models.Order_Detail import OrderDetail
from sqlalchemy import func
from typing import List, Optional
from datetime import datetime


class OrderDetail_Repository:
    def __init__(self, session: Session = session):
        self.session = session

    def add(self, order_detail: OrderDetail) -> Optional[OrderDetailModel]:
        try:
            watch = self.session.query(WatchModel).filter_by(id=order_detail.watch_id).first()
            order = self.session.query(OrderModel).filter_by(id=order_detail.order_id).first()
            if not watch or not order:
                return None

            existing = self.get_by_order_watch(order_detail.order_id, order_detail.watch_id)
            if existing:
                existing.quantity = (existing.quantity or 1) + order_detail.quantity
                self.session.commit()
                self.session.refresh(existing)
                self._update_order_total(order_id=order_detail.order_id)
                return existing

            orderdetail_obj = OrderDetailModel(
                order_id=order_detail.order_id,
                watch_id=order_detail.watch_id,
                quantity=order_detail.quantity or 1,
            )
            self.session.add(orderdetail_obj)
            self.session.commit()
            self.session.refresh(orderdetail_obj)
            self._update_order_total(order_id=order_detail.order_id)
            return orderdetail_obj

        except Exception:
            self.session.rollback()
            raise


    # def get_by_id(self, id: int)->Optional[OrderDetailModel]:
    #     return self.session.query(OrderDetailModel).filter_by(order_id = id).first()

    def get_all(self)->list[OrderDetailModel]:
        return self.session.query(OrderDetailModel).all()
    
    def get_all_order(self,order_id)->list[OrderDetailModel]:
        return self.session.query(OrderDetailModel).filter_by(order_id=order_id).all()
    
    def get_by_order_watch(self,order_id:int,watch_id:int)->Optional[OrderDetailModel]:
        return self.session.query(OrderDetailModel).filter_by(order_id=order_id,watch_id=watch_id).first()
    
    def get_watch(self,order_id):
        watches = self.session.query(WatchModel).join(OrderDetailModel,WatchModel.id == OrderDetailModel.watch_id).filter(OrderDetailModel.order_id==order_id).all()
        return watches

    def update(self,order_detail:OrderDetail)->Optional[OrderDetailModel]:
        try:
            detail_obj = self.get_by_order_watch(order_id=order_detail.order_id)
            if not detail_obj:
                return None
            
            if order_detail.order_id is not None:
                detail_obj.order_id = order_detail.order_id
            if order_detail.watch_id is not None:
                detail_obj.watch_id = order_detail.watch_id
            
            self.session.merge(detail_obj)
            self.session.commit()
            self.session.refresh(detail_obj)
                        
            # change quantity of order when update new watch
            self._update_order_total(detail_obj.order_id)

            return detail_obj
        
        except Exception:
            self.session.rollback()
            raise ValueError("OrderDetail not found or update failed")
        
        finally:
            self.session.close()


    # def delete(self,detail:OrderDetail)->bool:
    #     try:
    #         detail_obj = self.get_by_order_watch(order_id=detail.id)

    #         if detail_obj:
    #             self.session.delete(detail_obj)
    #             self.session.commit()
    #             return True
    #         return False
    #     except Exception:
    #         self.session.rollback()
    #         raise
    #     finally:
    #         self.session.close()

    def delete_order(self, order_id: int) -> bool:
        try:
            details = self.session.query(OrderDetailModel).filter_by(order_id=order_id).all()
            if details:
                for d in details:
                    self.session.delete(d)
                self.session.commit()
                self._update_order_total(order_id)
                return True
            return False
        except Exception:
            self.session.rollback()
            raise
        finally:
            self.session.close()



    def delete_by_order_and_watch(self, detail: OrderDetail) -> bool:
        try:
            detail_obj = self.get_by_order_watch(detail.order_id, detail.watch_id)
            if detail_obj:
                order_id = detail_obj.order_id
                self.session.delete(detail_obj)
                self.session.commit()
                
                self._update_order_total(order_id)
                return True
            return False
        except Exception:
            self.session.rollback()
            raise
        finally:
            self.session.close()


    def _update_order_total(self, order_id: int):
        """Cập nhật lại tổng số lượng và tổng tiền của Order"""
        order = self.session.query(OrderModel).filter_by(id=order_id).first()
        if not order:
            return

        total_quantity = (
            self.session.query(func.coalesce(func.sum(OrderDetailModel.quantity), 0))
            .filter_by(order_id=order_id)
            .scalar()
        )

        total_amount = (
            self.session.query(func.coalesce(func.sum(OrderDetailModel.quantity * WatchModel.price), 0.0))
            .join(WatchModel, WatchModel.id == OrderDetailModel.watch_id)
            .filter(OrderDetailModel.order_id == order_id)
            .scalar()
        )
        order.updated_at = datetime.utcnow()
        order.quantity = total_quantity
        order.amount = total_amount
        self.session.commit()

