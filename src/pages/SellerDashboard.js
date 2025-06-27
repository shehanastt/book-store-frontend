import { Container, Row, Col, Button } from 'react-bootstrap';
import ListBooks from '../components/ListBooks';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import '../styles/sellerDash.css'; 

const SellerDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="seller-dashboard">
      <Header />
      <Container fluid className="dashboard-body">
        {/* <Row> */}
          <Col md={9} lg={10} className="p-4 main-content">
            <Row className="mb-4 align-items-center">
              <Col>
                <h2 className="fw-bold text-dark">My Uploaded Books</h2>
                <p className="text-muted">Manage all your listings below.</p>
              </Col>
              <Col className="text-end">
                <Button variant="outline-light" className="btn-glass" onClick={() => navigate('/add/book')}>
                  Add New Book
                </Button>
              </Col>
            </Row>

            <Row>
              <Col>
                <ListBooks />
              </Col>
            </Row>
          </Col>
        {/* </Row> */}
      </Container>

      <Footer />
    </div>
  );
};

export default SellerDashboard;
