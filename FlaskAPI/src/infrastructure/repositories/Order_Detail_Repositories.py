from sqlalchemy.orm import Session
from infrastructure.databases.mssql import session
from infrastructure.models.Order_DetailModel import OrderDetailModel
from domain.models.Order_Detail import OrderDetail
from typing import List, Optional
from datetime import datetime


class OrderDetail_Repository:
    def __init__(self, session: Session = session):
        self.session = session

    def add(self, order_detail: OrderDetail) -> Optional[OrderDetailModel]:
        """Thêm order_detail mới"""
        try:
            orderdeatil_obj = OrderDetailModel(
                order_id = order_detail.order_id,
                watch_id = order_detail.watch_id
            )
            self.session.add(orderdeatil_obj)
            self.session.commit()
            self.session.refresh(orderdeatil_obj)
            return orderdeatil_obj
        finally:
            self.session.close()

    def get_by_id(self, id: int)->Optional[OrderDetailModel]:
        return self.session.query(OrderDetailModel).filter_by(id=id).first()

    def get_all(self)->list[OrderDetailModel]:
        return self.session.query(OrderDetailModel).all()
    
    def get_all_order(self,order_id)->list[OrderDetailModel]:
        return self.session.query(OrderDetailModel).filter_by(order_id=order_id).all()
    
    def get_by_order_watch(self,order_id:int,watch_id:int)->Optional[OrderDetailModel]:
        return self.session.query(OrderDetailModel).filter_by(order_id=order_id,watch_id=watch_id)

    def update(self,order_detail:OrderDetail)->Optional[OrderDetailModel]:
        try:
            detail_obj = self.get_by_id(id=order_detail.id)
            if not detail_obj:
                return None
            
            if order_detail.order_id is not None:
                detail_obj.order_id = order_detail.order_id
            if order_detail.watch_id is not None:
                detail_obj.watch_id = order_detail.watch_id
            

            self.session.merge(detail_obj)
            self.session.commit()
            self.session.refresh(detail_obj)
            
            return detail_obj
        
        except Exception:
            self.session.rollback()
            raise ValueError("OrderDetail not found or update failed")
        
        finally:
            self.session.close()


    def delete(self,detail:OrderDetail)->bool:
        try:
            detail_obj = self.get_by_order_watch(order_id=detail.id)

            if detail_obj:
                self.session.delete(detail_obj)
                self.session.commit()
                return True
            return False
        except Exception:
            self.session.rollback()
            raise
        finally:
            self.session.close()

    def delete_by_order_and_watch(self, detail:OrderDetail) -> bool:
        """Xóa order detail theo order_id và watch_id"""
        try:
            detail_obj = self.get_by_order_watch(order_id=detail.order_id, watch_id=detail.watch_id)
            if detail_obj:
                self.session.delete(detail_obj)
                self.session.commit()
                return True
            return False
        except Exception:
            self.session.rollback()
            raise
        finally:
            self.session.close()