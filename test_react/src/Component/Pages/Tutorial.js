import React from "react";
import { Container, Col, Form, FormGroup, Label, Row } from "reactstrap";

import "./Tutorial.css";
import system from "../../Component/img/simit.png";

function Tutorial() {
  return (
    <Container className="tutorial">
      <Col className="tutorial-text-container">
        <Form className="tutorial-text">
          <h2>Quy trình lọc nước sẽ gồm có 3 giai đoạn:</h2>
          <h3>Giai đoạn 1: Tiền xử lý nước</h3>

          <a>
            Nước thô được bơm và lắng tại bồn chứa, sau đó sẽ được bơm qua các
            cột lọc như cột lọc đa tầng, cột lọc hấp thụ Carbon, cột lọc làm
            mềm, cột lọc tinh,… Các cột lọc này giúp loại bỏ các tạp chất có
            trong nước như bùn, đất, chì, mangan,… Sau đó nước sẽ được chứa tại
            bồn trung gian.
          </a>
          <h3>Giai đoạn 2: Lọc thẩm thấu ngược RO</h3>
          <a>
            Nước sẽ được bơm cao áp đẩy qua các thanh lọc RO với áp suất cao.
            Màng lọc chỉ cho các phần tử nước tinh khiết lọt qua. Các thành kim
            loại, tạp chất, vi khuẩn sẽ bị văng ra ngoài theo đường nước thải.
            Nước thành phẩm sẽ được chứa vào bồn chờ cho việc sử dụng.
          </a>
          <h3>Giai đoạn 3: Khử trùng diệt khuẩn</h3>
          <a>
            Máy Ozone được gắn vào bồn nước thành phẩm để sát khuẩn còn tồn tại
            khi chứa trong bồn.Nước sẽ tiếp tục đi qua bộ lọc cặn tinh khiết 1
            micron sau đó qua đèn diệt khuẩn UV trước khi ra vòi chiết rót để sử
            dụng.
          </a>
        </Form>
      </Col>
      <Col className="tutorial-diagram-container">
        <Form className="tutorial-diagram">
          <img className="simit" src={system} />
          <a>
            Vận hành bể lọc áp gồm 3 pha: pha lọc (Service), rửa ngược (
            Backwash) và xả bỏ (Rinse).
          </a>
        </Form>
      </Col>
    </Container>
  );
}

export default Tutorial;
