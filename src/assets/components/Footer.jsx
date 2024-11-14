import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className='container-fluid p-3 bg-info'>
      <Row>
        <Col>
          <h3>Project Fair 2024</h3>
          <p style={{ textAlign: 'justify', color: 'black' }}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam in esse adipisci molestiae eaque minima fugiat, ducimus dolore labore saepe. Recusandae at adipisci molestiae nam exercitationem dignissimos maiores sapiente harum.</p>
        </Col>
        <Col>
          <h3>Links</h3>
          <div className="d-flex flex-column justify-content-around">
            <Link to="/" className="text-light">Landing</Link>
            <Link to="/auth" className="text-light">Login</Link>
          </div>
        </Col>
        <Col>
          <h3>Feedback</h3>
          <textarea name="" className='form-control my-3' id=""></textarea>
          <button className="btn btn-success">Send</button>
        </Col>
      </Row>

    </div>
  )
}

export default Footer