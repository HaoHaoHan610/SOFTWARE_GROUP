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

![Biểu đồ tác nhân](DOC/Diagram/bieudotacnhan.png)

## Các chức năng chính

***Sellers:***

- Đăng sản phẩm: Cho phép người bán thêm thông tin sản phẩm gồm hình ảnh, mô tả, năm sản xuất, hãng, tình trạng, giá.

- Gửi thẩm định: Gửi yêu cầu đến chuyên gia để xác thực đồng hồ.

- Chỉnh sửa sản phẩm: Cập nhật thông tin hoặc giá bán dựa trên báo cáo thẩm định.

- Quản lý sản phẩm: Xem, sửa, hoặc xóa sản phẩm đã đăng.

- Xem trạng thái giao dịch: Theo dõi tình hình đơn hàng và phản hồi của người mua.

***Buyer:***

- Tìm kiếm sản phẩm: Lọc theo hãng, giá, tình trạng, năm sản xuất.

- Xem chi tiết sản phẩm: Hiển thị mô tả, hình ảnh, thông tin người bán.

- Xem báo cáo thẩm định: Kiểm tra tính xác thực và giá trị đồng hồ trước khi mua.

- Mua sản phẩm: Thực hiện thanh toán qua hệ thống.

- Xác nhận giao hàng: Hoàn tất giao dịch sau khi nhận hàng.

- Đánh giá: Đưa ra nhận xét về sản phẩm và người bán.

***Appraisers:***

- Xem yêu cầu thẩm định: Truy cập danh sách sản phẩm cần kiểm định.

- Đánh giá sản phẩm: Kiểm tra độ nguyên bản, tình trạng, độ hiếm, lịch sử sản phẩm.

- Tạo báo cáo: Gửi báo cáo thẩm định gồm tính xác thực, giá trị thị trường, đề xuất giá.

***Admin:***

- Quản lý tài khoản: Phê duyệt chuyên gia, quản lý người bán và người mua.

- Quản lý sản phẩm: Kiểm tra, tạm khóa hoặc gỡ sản phẩm khi phát hiện bất thường.

- Xử lý tranh chấp: Giải quyết khi có vấn đề giữa người mua và người bán.

- Quản lý hệ thống: Kiểm tra nhật ký, cập nhật phần mềm, đảm bảo an toàn dữ liệu.

***Customer Support Agents:***

- Tiếp nhận yêu cầu: Nhận thắc mắc và sự cố từ người dùng.

- Hỗ trợ trực tiếp: Trả lời câu hỏi, hướng dẫn sử dụng hệ thống.

- Chuyển tiếp sự cố: Gửi cho bộ phận liên quan khi cần xử lý kỹ thuật.

- Ghi nhận phản hồi: Thu thập ý kiến cải tiến dịch vụ

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
}- 

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

![Biểu đồ tác nhân](DOC/Diagram/bieudousecasetongquan.png)

### Biểu đồ Use Case chi tiết

#### Chức năng Seller

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

![Biểu đồ tác nhân](DOC/Diagram/bieudousecaseseller.png)

#### Chức năng buyers

<details>

<summary>Code PlantUML</summary

@startuml "Biểu đồ Use Case chức năng Buyer"
left to right direction

actor Buyers

rectangle System {
  usecase "Report Management" as UC1
  usecase "Transactions" as UC2
  usecase "Escrow" as UC3
  usecase "List Items" as UC4
  usecase "Appraisal" as UC5
  usecase "Browse Listings" as UC6
  usecase "Log in" as UC7
  usecase "User management" as UC8
}

Buyers --> UC1
Buyers --> UC2
Buyers --> UC4
Buyers --> UC7

UC2 --> UC3 : <<include>>
UC2 --> UC5 : <<extend>>
UC4 --> UC6 : <<extend>>
UC7 --> UC8 : <<include>>

</details>

![Biểu đồ tác nhân](DOC/Diagram/bieudousecasebuyer.png)

#### Chức năng Customer supports Agent

<details>

<summary>Code PlantUML</summary

@startuml "Biểu đồ Use Case chức năng Customer Support Agent"
left to right direction

actor "Customer Support Agent" as CSA

rectangle System {
  usecase "Report Management" as UC1
  usecase "Log in" as UC2
  usecase "User management" as UC3
  usecase "Resolve Queries" as UC4
}

CSA --> UC1
CSA --> UC2
CSA --> UC4

UC2 --> UC3 : <<include>>

@enduml

</details>

![Biểu đồ tác nhân](DOC/Diagram/bieudousecaseagent.png)

#### Chức năng Administrator

<details>

<summary>Code PlantUML</summary

@startuml "Biểu đồ Use Case chức năng Customer Support Agent"
left to right direction

actor "Customer Support Agent" as CSA

rectangle System {
  usecase "Report Management" as UC1
  usecase "Log in" as UC2
  usecase "User management" as UC3
  usecase "Resolve Queries" as UC4
}

CSA --> UC1
CSA --> UC2
CSA --> UC4

UC2 --> UC3 : <<include>>

@enduml

</details>

![Biểu đồ tác nhân](DOC/Diagram/bieudousecaseadmin.png)


#### Chức năng Appraisers

<details>

<summary>Code PlantUML</summary

@startuml  "Biểu đồ Use Case chức năng Customer Support Appraisers"
left to right direction

actor "Appraisers" as App

rectangle System {
  usecase "Report Management" as UC1
  usecase "Log in" as UC2
  usecase "User management" as UC3
  usecase "Communicate" as UC4
  usecase "Appraisal" as UC5
  usecase "List Items" as UC6
  usecase "Browse Listings" as UC7
}

App --> UC1
App --> UC2
App --> UC4
App --> UC5

UC2 --> UC3 : <<include>>
UC5 --> UC6 : <<extend>>
UC6 --> UC7 : <<extend>>

@enduml

</details>

![Biểu đồ tác nhân](DOC/Diagram/bieudousecaseappraiser.png)

### Quy trình hoạt động

#### Quy trình mua hàng

<details>

<summary>Code PlantUML</summary

@startuml "Biểu Đồ Quy trình mua hàng" 
|Customer|
start
:Chọn sản phẩm;
:Thêm vào giỏ hàng;

|System|
:Hiển thị giỏ hàng;

|Customer|
:Kiểm tra giỏ hàng;
:Nhập thông tin giao hàng;
:Chọn phương thức thanh toán;

|System|
:Kiểm tra thanh toán;
if ("Thanh toán thành công?") then (Yes)
  :Xác nhận đơn hàng;
  :Cập nhật kho;
  :Gửi thông báo cho khách hàng;
else (No)
  :Thông báo lỗi;

  |Customer|
  :Chọn lại phương thức thanh toán;
  :Chọn phương thức thanh toán;
endif

stop
@enduml

</details>

![Biểu đồ tác nhân](DOC/Diagram/quytrinhmuahang.png)

#### Quy trình bán hàng

<details>

<summary>Code PlantUML</summary

@startuml
|Khách hàng| "Biểu Đồ Quy trình bán hàng" 
start
:Đăng nhập hệ thống;
:Chọn sản phẩm;
:Thêm vào giỏ hàng;
:Đặt hàng;

|Hệ thống|
:Kiểm tra tồn kho;

if (Sản phẩm có sẵn?) then (Có)
  :Xác nhận đơn hàng;
  :Xác nhận thanh toán;
  |Khách hàng|
  :Nhận thông báo đặt hàng;
  :Nhận sản phẩm;
else (Hết hàng)
  |Hệ thống|
  :Thông báo hết hàng;
  |Khách hàng|
  :Nhận thông báo hết hàng;
endif

@enduml

</details>

![Biểu đồ tác nhân](DOC/Diagram/quytrinhbanhang.png)

#### Quy trình thanh toán

<details>

<summary>Code PlantUML</summary

@startuml   “ Biểu Đồ quy trình thanh toán”

|Customer|
start
:Chọn sản phẩm/dịch vụ;
:Thêm vào giỏ hàng;
:Xác nhận giỏ hàng;
:Chọn phương thức thanh toán;
:Nhập thông tin thanh toán;
:Xác nhận thanh toán;

|System|
:Kiểm tra thông tin thanh toán;
if (Thông tin hợp lệ?) then (Có)
  :Xử lý thanh toán;
  if (Thanh toán thành công?) then (Có)
    :Tạo đơn hàng;
    :Gửi thông báo xác nhận cho Customer;
  else (Không)
    :Thông báo lỗi thanh toán;
  endif
else (Không)
  :Thông báo thông tin không hợp lệ;
endif

stop
@enduml

</details>

![Biểu đồ tác nhân](DOC/Diagram/quytrinhthanhtoan.png)

### Luồng xử lý

#### Luồng xử lý đăng ký

<details>

<summary>Code PlantUML</summary

@startuml “Biểu Đồ Luồng xử lý đăng ký”
autonumber

actor Khách as customer
participant "Giao diện" as ui
participant "Hệ thống" as system
database CSDL as db

system -> system: Tạo mã xác thực email
system -> ui: Gửi email xác thực
activate ui

ui --> customer: Thông báo đăng ký thành công
ui --> customer: Chuyển đến trang xác thực email
deactivate ui

customer -> ui: Truy cập form đăng ký
customer -> ui: Điền thông tin (họ tên, email, SĐT, mật khẩu)
ui -> system: Gửi thông tin đăng ký
activate system

system -> system: Kiểm tra thông tin

alt Thông tin hợp lệ
    system -> db: Lưu thông tin tài khoản
    activate db
    db --> system: Xác nhận lưu thành công
    deactivate db

system -> system: Tạo mã xác thực email
system -> ui: Gửi email xác thực
activate ui

ui --> customer: Thông báo đăng ký thành công
ui --> customer: Chuyển đến trang xác thực email
deactivate ui

else Thông tin không hợp lệ
    system --> ui: Trả về lỗi
    activate ui
    ui --> customer: Hiển thị thông báo lỗi
    deactivate ui
end

</details>

![Biểu đồ tác nhân](DOC/Diagram/Luongxulydangki.png)

#### Luồng xử lý mua

<details>

<summary>Code PlantUML</summary

@startuml “Biểu Đồ Luồng xử lý mua”
autonumber
actor Buyer
participant "Giao diện" as UI
participant "Hệ thống" as System
actor Seller

Buyer -> UI: Chọn sản phẩm
activate UI
UI -> System: Lấy thông tin sản phẩm
activate System
System --> UI: Hiển thị chi tiết sản phẩm
deactivate System
deactivate UI

Buyer -> UI: Thêm vào giỏ hàng
Buyer -> UI: Chọn phương thức thanh toán
activate UI
UI -> System: Gửi yêu cầu đặt hàng
activate System
System -> Seller: Thông báo đơn hàng mới
activate Seller

Seller --> System: Xác nhận đơn hàng
deactivate Seller
System --> UI: Xác nhận đơn hàng thành công
deactivate System

UI --> Buyer: Hiển thị thông tin đơn hàng
deactivate UI

note right of Seller
  Seller sẽ xử lý và gửi hàng sau
end note

@enduml

</details>

![Biểu đồ tác nhân](DOC/Diagram/luongxulymua.png)

#### Luồng xử lý POST

<details>

<summary>Code PlantUML</summary

@startuml “Biểu Đồ Luồng xử lý POST”
participant Seller
participant "Giao diện" as UI
participant "Hệ thống" as System
database "Database (Watches)" as DB

Seller -> UI: 1. Mở form đăng sản phẩm
UI --> Seller: 2. Hiển thị form
Seller -> UI: 3. Nhập thông tin watch + ảnh
UI -> System: 4. Gửi yêu cầu đăng sản phẩm (POST /watches)
System -> DB: 5. Lưu watch vào bảng watches
DB --> System: 6. Trả watch_id
System --> UI: 7. Xác nhận đăng bán thành công
UI --> Seller: 8. Hiển thị thông báo "Đã đăng bán"

@enduml

</details>

![Biểu đồ tác nhân](DOC/Diagram/luongxulypost.png)

#### Luồng xử lý Admin

<details>

<summary>Code PlantUML</summary

@startuml “Biểu Đồ Luồng xử lý POST”
participant Seller
participant "Giao diện" as UI
participant "Hệ thống" as System
database "Database (Watches)" as DB

Seller -> UI: 1. Mở form đăng sản phẩm
UI --> Seller: 2. Hiển thị form
Seller -> UI: 3. Nhập thông tin watch + ảnh
UI -> System: 4. Gửi yêu cầu đăng sản phẩm (POST /watches)
System -> DB: 5. Lưu watch vào bảng watches
DB --> System: 6. Trả watch_id
System --> UI: 7. Xác nhận đăng bán thành công
UI --> Seller: 8. Hiển thị thông báo "Đã đăng bán"

@enduml

</details>

![Biểu đồ tác nhân](DOC/Diagram/Luongxulyadmin.png)

#### Luồng xử lý Định giá

<details>

<summary>Code PlantUML</summary

@startuml “Biểu Đồ Luồng xử lý Định giá”
participant Seller
participant "Giao diện" as UI
participant "Hệ thống" as System
participant Appraiser
database "Database (Appraisals)" as DB

Seller -> UI: 1. Gửi yêu cầu thẩm định cho Watch X
UI -> System: 2. Gửi request thẩm định
System -> Appraiser: 3. Thông báo/assign request tới Appraiser (notification)
Appraiser -> System: 4. Lấy thông tin Watch để thẩm định
Appraiser -> System: 5. Gửi kết quả thẩm định (value, note, status)
System -> DB: 6. Lưu appraisal record
DB --> System: 7. Trả kết quả lưu
System --> UI: 8. Thông báo kết quả thẩm định
UI -> Seller: 9. Cập nhật giá/ghi chú hiển thị

@enduml

</details>

![Biểu đồ tác nhân](DOC/Diagram/luongxulydanhgia.png)

#### Luồng xử lý Feedback

<details>

<summary>Code PlantUML</summary

@startuml “Biểu Đồ Luồng xử lý Feedback”
participant Buyer
participant "Giao diện" as UI
participant "Hệ thống" as System
participant Seller
database "Database (Feedback)" as DB

Buyer -> UI: 1. Viết feedback cho Seller/Watch
UI -> System: 2. Gửi feedback (POST /feedback)
System -> DB: 3. Lưu feedback (sender, receiver, content, rating)
DB --> System: 4. Trả feedback_id
System --> UI: 5. Xác nhận "Cảm ơn bạn đã đánh giá"
System -> Seller: 6. Thông báo có feedback mới (notification)
Seller -> System: 7. (tùy) Xem/Phản hồi feedback

</details>


![Biểu đồ tác nhân](DOC/Diagram/luongxulyfeedback.png)

#### Luồng xử lý payment

<details>

<summary>Code PlantUML</summary

@startuml “Biểu Đồ Luồng xử lý payment”
participant Buyer
participant UI
participant System
participant "Payment Gateway" as PG
participant "Escrow Service" as ES
participant Seller
database "Database (Orders/Tx/Escrow)" as DB

Buyer -> UI: 1. Chọn đơn hàng để thanh toán
UI -> System: 2. Gửi yêu cầu thanh toán (order_id)
System -> DB: 3. Kiểm tra đơn hàng (status = Pending)
DB --> System: 4. Trả thông tin đơn hàng
System -> PG: 5. Gửi yêu cầu thanh toán (amount, buyer info)
PG --> System: 6. Xác nhận giao dịch thành công
System -> ES: 7. Tạo tài khoản ký quỹ (escrow record)
ES -> DB: 8. Lưu giao dịch escrow (order_id, amount, status=HOLD)
DB --> ES: 9. OK
ES --> System: 10. Xác nhận lưu ký quỹ
System --> UI: 11. Thông báo "Thanh toán thành công - đang giữ tiền"
UI -> Buyer: 12. Thông báo có đơn hàng đã được thanh toán (đang ký quỹ)
note right of ES
Tiền sẽ được giữ phòng cho Seller
sau khi Buyer xác nhận nhận hàng
hoặc sau thời gian bảo đảm
end note

</details>

![Biểu đồ tác nhân](DOC/Diagram/luongxulypayment.png)

#### Luồng dữ liệu

<details>

<summary>Code PlantUML</summary

@startuml “Biểu Đồ Luồng Dữ liệu”
skinparam linetype ortho

actor Seller
actor Appraiser
actor Buyer
actor Admin

rectangle "1.0 Quản lý Tài khoản" as AccountManagement
rectangle "5.0 Quản lý Hệ thống" as SystemManagement
rectangle "3.0 Quản lý Thanh toán" as PaymentManagement
rectangle "4.0 Quản lý Thẩm định" as AppraisalManagement
rectangle "2.0 Quản lý Đơn hàng" as OrderManagement

database "D1 Users" as UsersDB
database "D2 Orders" as OrdersDB
database "D3 Transactions" as TransactionsDB
database "D4 Escrow" as EscrowDB
database "D5 Appraisals" as AppraisalsDB

' ------------------ User Interactions ------------------

Seller --> OrderManagement: Đăng bán sản phẩm
Appraiser --> AppraisalManagement: Cập nhật kết quả thẩm định
Buyer --> PaymentManagement: Thanh toán
Buyer --> SystemManagement: Đăng ký / Đăng nhập
Admin --> SystemManagement: Đăng ký / Đăng nhập
Admin --> SystemManagement: Quản lý User/Order/Transaction

' ------------------ System Flow ------------------

Seller --> AppraisalManagement: Yêu cầu thẩm định
Appraiser --> AppraisalManagement
AppraisalManagement --> AppraisalsDB: Đọc/Ghi
AppraisalManagement --> OrderManagement: Cập nhật tình trạng đơn hàng

Buyer --> AppraisalManagement: Yêu cầu thẩm định
Buyer --> OrderManagement: Đặt hàng
Seller --> OrderManagement: Xem trạng thái đơn hàng
OrderManagement --> OrdersDB: Đọc/Ghi đơn hàng

Buyer --> PaymentManagement: Thanh toán
PaymentManagement --> TransactionsDB: Ghi transaction
PaymentManagement --> EscrowDB: Tạo Escrow

SystemManagement --> AccountManagement
SystemManagement --> PaymentManagement
SystemManagement --> AppraisalManagement
SystemManagement --> OrderManagement
SystemManagement --> UsersDB: Đọc/Ghi thông tin user

Buyer <-- PaymentManagement: Nhận tiền sau Escrow Released

@enduml

</details>

![Biểu đồ tác nhân](DOC/Diagram/luongdulieu.png)

### Các trạng thái thực thể trong hệ thống

<details>

<summary>Code PlantUML</summary

@startuml “ Biểu đồ Các trạng thái thực thể trong hệ thống”
state "Draft" as Draft
state "PendingEvaluation" as PendingEvaluation
state "UnderEvaluation" as UnderEvaluation
state "Evaluated" as Evaluated
state "ListedForSale" as ListedForSale
state "Reserved" as Reserved
state "Shipped" as Shipped
state "Disputed" as Disputed
state "Completed" as Completed
state "Cancelled" as Cancelled

[*] --> Draft

Draft --> PendingEvaluation: Gửi yêu cầu thẩm định
PendingEvaluation --> UnderEvaluation: Chuyên gia nhận kiểm định
UnderEvaluation --> Evaluated: Gửi báo cáo thẩm định
Evaluated --> ListedForSale: Người bán niêm yết sản phẩm
ListedForSale --> Reserved: Người mua đặt hàng + thanh toán
Reserved --> Shipped: Người bán giao hàng
Shipped --> Completed: Người mua xác nhận nhận hàng
Shipped --> Disputed: Khiếu nại
Reserved --> Disputed: Khiếu nại
Disputed --> Completed: Admin xử lý thành công
Disputed --> Cancelled: Admin hủy giao dịch
Reserved --> Cancelled: Hủy giao dịch
ListedForSale --> Cancelled: Người bán hủy niêm yết
Completed --> []
Cancelled --> []
@enduml

</details>

![Biểu đồ tác nhân](DOC/Diagram/cactrangthaithuctehethong.png)

## IV. Công nghệ:

* ***Frontend***: Sử dụng ReactJS để xây dựng giao diện người dùng.

* ***Backend:*** Sử dụng python để phát triển các dịch vụ backend.

* ***API:*** Sử dụng chuẩn REST API flask để giao tiếp giữa frontend và backend.

* ***Cơ sở dữ liệu:*** Sử dụng MS SQL để lưu trữ dữ liệu. 

* ***Triển khai:*** Sử dụng Docker để đóng gói và triển khai ứng dụng.

* ***Quản lý mã nguồn:*** Sử dụng Git để quản lý mã nguồn và GitHub để lưu trữ ma nguồn.

## V. Yêu cầu thiết kế

### Mô hình kiến trúc

Mô hình kiến trúc của hệ thống sẽ bao gồm các thành phần sau:

* ***Client:*** Giao diện người dùng, xây dựng bằng ReactJS, kết nối với API để lấy dữ liệu.

* ***Server:*** Dịch vụ API, xây dựng bằng ASP Net Web API  Web API, sử dụng kiến trúc 3 lớp để xử lý    logic.

    * ***Presentation:*** Xử lý các yêu cầu từ client, gọi các phương thức từ lớp Service.

    * ***Business Logic:*** Chứa logic xử lý chính của ứng dụng, gọi các phương thức từ lớp Repository.

    * ***Data Access:*** Tương tác với cơ sở dữ liệu, thực hiện các thao tác CRUD.

* ***Database:*** Cơ sở dữ liệu MS SQL Server, lưu trữ thông tin người dùng, lịch hẹn, dịch vụ...

![Biểu đồ tác nhân](DOC/Diagram/database.png)
<details>

<summary>Code PlantUML</summary

@startuml "Mô hình kiến trúc"
package "Client" {
  [ReactJS]
}

package "Server" {
  [Controller]
  [Service]
  [Repository]
}

database "Database" as DB

[ReactJS] ..> [Controller] : REST API
[Controller] --> [Service]
[Service] --> [Repository]
[Repository] --> DB
@enduml

</details>

### Mô hình cơ sở dữ liệu:

Cơ sở dữ liệu sẽ bao gồm các bảng sau:

<details>

<summary>Code PlantUML</summary

@startuml "Mô hình cơ sở dữ liệu"

class User {
  +id : int
  +username : string
  +email : string
  +password : string
  +created_at : datetime
  +role : string
}

class Transaction {
  +id : int
  +buyer_id : int
  +order_id : int
  +amount : float
  +status : string
  +created_at : datetime
}

class Escrow {
  +id : int
  +transaction_id : int
  +amount : float
  +status : string
  +created_at : datetime
  +released_at : datetime
}

class Order {
  +id : int
  +customer_id : int
  +status : string
  +created_at : datetime
  +updated_at : datetime
  +quantity : int
  +address : int
  +amount : float
}

class OrderDetail {
  +order_id : int
  +watch_id : int
  +quantity : int
}

class Watch {
  +id : int
  +brand : string
  +name : string
  +price : float
  +created_at : datetime
  +existing_status : boolean
  +img : string
  +seller_id : int
}

class Appraisal {
  +id : int
  +appraiser_id : int
  +watch_id : int
  +es_value : float
  +auth : boolean
  +con_note : string
  +updated_at : datetime
  +status : string
  +created_at : datetime
}

class Feedback {
  +id : int
  +sender_id : int
  +receiver_id : int
  +content : string
  +created_at : datetime
}

' Relationships
User "1" -- "0.." Transaction : buyer_id
User "1" -- "0.." Feedback : sender_id
User "1" -- "0.." Feedback : receiver_id
User "1" -- "0.." Watch : seller_id

Transaction "1" -- "1" Escrow
Transaction "1" -- "1" Order

Order "1" -- "0.." OrderDetail
Watch "1" -- "0.." OrderDetail
Watch "1" -- "0..*" Appraisal
Appraisal "1" -- "1" User : appraiser_id

@enduml

</details>

![Biểu đồ tác nhân](DOC/Diagram/mohinhcosodulieu.png)


* ***Users:*** Lưu thông tin người dùng, bao gồm tên, email, mật khẩu, quyền...

* ***Watch:*** id,tên thương hiệu,tên sản phẩm,giá tiền, ngày đăng…

* ***Appraisal:*** tên,ảnh đại diện,độ uy tín,kinh nghiệm….

* ***Order:*** tên sản phẩm,id sản phẩm ,địa chỉ giao ,địa chỉ nhận hàng ,ngày giao nhận,thanh toán bằng …

* ***Escrow:*** id sản phẩm ,giá tiền,số lượng,seller id …

#### Giao diện người dùng

Giao diện người dùng sẽ bao gồm các trang sau:

* ***Trang chủ:*** Hiển thị thông tin sản phẩm , các công cụ tim kiếm , sản phẩm  nổi bật.

* ***Trang seller:*** Hiển thị thông tin người bán, cho phép tìm kiếm và xem chi tiết ,thẩm định sản phẩm.

* ***Trang cá nhân:*** Hiển thị thông tin cá nhân, cho phép cập nhật thông tin, đổi mật khẩu, quản lý giỏ hàng.

* ***Trang Appaiser:*** Hiển thị thông tin sản phẩm,hiển thị độ uy tín của nhà thẩm định,cho phép đưa thẩm định cho sản phẩm.

* ***Trang Admin:*** Hiển thị thông tin người dùng trang,cho phép truy cập vào thông tin cá nhân của người mua và bán,giải quyết tranh chấp giữa người mua và bán.

* ***Trang Customer Support Agent:*** Hiển thị thông tin người mua, hỗ trợ người mua sản phẩm,hỗ trợ hoàn trả và thanh toán sản phẩm.