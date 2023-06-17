import React from "react";
import { Header } from "../../components/Header";
import { Subheader } from "../../components/Subheader";
import { Bottom } from "../../components/Bottom";
import emailjs from "emailjs-com";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const Faleconosco = () => {
  const userID = "cbca-MchY2yjUctY2";
  const templateID = "template_9r78aye";
  const serviceID = "service_xd712o1";

  function sendEmail(e) {
    e.preventDefault();
    emailjs
      .sendForm(serviceID, templateID, e.target, userID)
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  }

  return (
    <div>
      <Subheader />
      <Header />

      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <div className="form_wrapper">
              <Form onSubmit={sendEmail}>
                <Form.Group controlId="formName">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    type="text"
                    name="from_name"
                    placeholder="Seu nome completo"
                  />
                </Form.Group>

                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="user_email"
                    placeholder="insira seu E-mail"
                  />
                </Form.Group>

                <Form.Group controlId="formPhone">
                  <Form.Label>Telefone</Form.Label>
                  <Form.Control
                    type="phone"
                    name="phone"
                    placeholder="DDD + Telefone"
                  />
                </Form.Group>

                <Form.Group controlId="formSubject">
                  <Form.Label>Assunto</Form.Label>
                  <Form.Control
                    type="text"
                    name="subject"
                    placeholder="Assunto"
                  />
                </Form.Group>

                <Form.Group controlId="formMessage">
                  <Form.Label>Mensagem</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name="message"
                    placeholder="Insira aqui seu texto"
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Enviar
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>

      <Bottom />
    </div>
  );
};

export { Faleconosco };
