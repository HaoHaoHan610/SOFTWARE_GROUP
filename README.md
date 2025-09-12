# Vintage Timepiece Evaluation and Trading Platform

## I. Tổng quan dự án

### Mục tiêu

Mục tiêu của dự án là xây dựng một website mua bán đồng hồ cũ, giúp nguời dùng giao dịch đồng hồ cổ một cách chuyên nghiệp, an toàn và minh bạch. Hệ thống phục vụ nhiều đối tượng khác nhau như người bán, người mua, chuyên gia thẩm định, quản trị viên và nhân viên hỗ trợ.

### Phạm vi

Phạm vi dự án bao gồm các chức năng chính : đăng và quản lý sản phẩm, tìm kiếm và mua hàng, thẩm định đồng hồ, quản lý tài khoản và giao dịch, xử lý tranh chấp, hỗ trợ khách hàng, quản trị hệ thống và bảo mật.

### Giả định và ràng buộc   

Hệ thống phục vụ cho việc giao dịch đồng hồ cũ, không phải là một sàn thương mại điện tử tổng hợp.

Hệ thống chỉ hỗ trợ mua bán, thẩm định và thanh toán, không bao gồm các dịch vụ tài chính khác (ví dụ: cho vay, trả góp).

Hệ thống chỉ tập trung vào đồng hồ cổ và đồng hồ chính hãng, không hỗ trợ các mặt hàng khác.

Hệ thống hỗ trợ giao dịch trực tuyến, nhưng không trực tiếp chịu trách nhiệm về quá trình vận chuyển hàng hóa.

Hệ thống yêu cầu người dùng cung cấp thông tin chính xác (sản phẩm, giao dịch, tài khoản), ban quản trị không chịu trách nhiệm nếu người dùng cố tình khai báo sai.

## II. Yêu cầu chức năng

### Các tác nhân

- Hệ thống có 5 tác nhân chính:Customer Support Agents,Administrators,Appraisers,Buyers,Sellers.

<details>

<summary>Code PlantUML</summary

@startuml “BIỂU ĐỒ TÁC NHÂN”
actor "Buyer" as Buyer
actor "Seller" as Seller
actor "Appraiser" as Appraiser
actor "Customer Support Agent" as CSA
actor "Administrator" as Admin

rectangle "Hệ thống" {
  (Đăng nhập/Đăng ký) as UC1
  (Quản lý sản phẩm) as UC2
  (Đặt hàng & Thanh toán) as UC3
  (Định giá sản phẩm) as UC4
  (Hỗ trợ khách hàng) as UC5
  (Quản trị hệ thống) as UC6
}

Buyer --> UC1
Buyer --> UC3

Seller --> UC1
Seller --> UC2

Appraiser --> UC4

CSA --> UC5

Admin --> UC6
@enduml>

</details>


## Các chức năng chính

### Sellers:

Đăng sản phẩm: Cho phép người bán thêm thông tin sản phẩm gồm hình ảnh, mô tả, năm sản xuất, hãng, tình trạng, giá.

Gửi thẩm định: Gửi yêu cầu đến chuyên gia để xác thực đồng hồ.

Chỉnh sửa sản phẩm: Cập nhật thông tin hoặc giá bán dựa trên báo cáo thẩm định.

Quản lý sản phẩm: Xem, sửa, hoặc xóa sản phẩm đã đăng.

Xem trạng thái giao dịch: Theo dõi tình hình đơn hàng và phản hồi của người mua.

### Buyer:

Tìm kiếm sản phẩm: Lọc theo hãng, giá, tình trạng, năm sản xuất.

Xem chi tiết sản phẩm: Hiển thị mô tả, hình ảnh, thông tin người bán.

Xem báo cáo thẩm định: Kiểm tra tính xác thực và giá trị đồng hồ trước khi mua.

Mua sản phẩm: Thực hiện thanh toán qua hệ thống.

Xác nhận giao hàng: Hoàn tất giao dịch sau khi nhận hàng.

Đánh giá: Đưa ra nhận xét về sản phẩm và người bán.

### Appraisers:

Xem yêu cầu thẩm định: Truy cập danh sách sản phẩm cần kiểm định.

Đánh giá sản phẩm: Kiểm tra độ nguyên bản, tình trạng, độ hiếm, lịch sử sản phẩm.

Tạo báo cáo: Gửi báo cáo thẩm định gồm tính xác thực, giá trị thị trường, đề xuất giá.

### Admin:

Quản lý tài khoản: Phê duyệt chuyên gia, quản lý người bán và người mua.

Quản lý sản phẩm: Kiểm tra, tạm khóa hoặc gỡ sản phẩm khi phát hiện bất thường.

Xử lý tranh chấp: Giải quyết khi có vấn đề giữa người mua và người bán.

Quản lý hệ thống: Kiểm tra nhật ký, cập nhật phần mềm, đảm bảo an toàn dữ liệu.

### Customer Support Agents:

Tiếp nhận yêu cầu: Nhận thắc mắc và sự cố từ người dùng.

Hỗ trợ trực tiếp: Trả lời câu hỏi, hướng dẫn sử dụng hệ thống.

Chuyển tiếp sự cố: Gửi cho bộ phận liên quan khi cần xử lý kỹ thuật.

Ghi nhận phản hồi: Thu thập ý kiến cải tiến dịch vụ

## Biểu đồ Use Case

<details>

<summary>Code PlantUML</summary

@startuml "Biểu đồ Use Case tổng quan"
left to right direction
actor Buyers
actor "Customer support Agent" as CSA
actor Administrator
actor Sellers
actor Appraisers

rectangle "Vintage Timepiece Evaluation and Trading Platform" {

  usecase "Browse Listings" as UC_Browse
  usecase "List Items" as UC_List
  usecase "Log in" as UC_Login
  usecase "Transactions" as UC_Transactions
  usecase "Communicate" as UC_Communicate
  usecase "Manage listings" as UC_Manage
  usecase "Escrow" as UC_Escrow
  usecase "Report Management" as UC_Report
  usecase "Appraisal" as UC_Appraisal
  usecase "Resolve Queries" as UC_Resolve
  usecase "User management" as UC_UserMgmt
  usecase "Maintain System Security" as UC_Security
  usecase "Update Platform" as UC_Update
}

' --- Associations ---
Buyers --> UC_Browse
Buyers --> UC_List
Buyers --> UC_Login
Buyers --> UC_Transactions
Buyers --> UC_Communicate

Sellers --> UC_List
Sellers --> UC_Login
Sellers --> UC_Transactions
Sellers --> UC_Communicate
Sellers --> UC_Manage

Appraisers --> UC_Appraisal

CSA --> UC_Resolve

Administrator --> UC_UserMgmt
Administrator --> UC_Security
Administrator --> UC_Update

' --- Includes / Extends ---
UC_Transactions --> UC_Escrow : <<include>>
UC_Report ..> UC_Transactions : <<extend>>

@enduml

</details>

# Biểu đồ Use Case chi tiết

## Chức năng Seller

<details>

<summary>Code PlantUML</summary

@startuml "Biểu đồ Use Case chức năng Seller"
left to right direction

actor Seller

rectangle System {
  usecase "Report Management" as UC1
  usecase "Transactions" as UC2
  usecase "Escrow" as UC3
  usecase "List Items" as UC4
  usecase "Appraisal" as UC5
  usecase "Browse Listings" as UC6
  usecase "Communicate" as UC7
  usecase "Log in" as UC8
  usecase "User management" as UC9
  usecase "Manage listings" as UC10
}

Seller --> UC1
Seller --> UC2
Seller --> UC4
Seller --> UC7
Seller --> UC8
Seller --> UC10

UC2 --> UC3 : <<include>>
UC4 --> UC5 : <<extend>>
UC4 --> UC6 : <<extend>>
UC8 --> UC9 : <<include>>

@enduml

</details>