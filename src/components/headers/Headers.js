import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import BackIcon from './resources/back.svg'
import './Headers.css'

const Headers = ({header, handleShow, showAll, handleGoback, manager, handleAddManager}) => {
    return (
        <Row>
            {
                manager || (showAll && (<Col onClick={handleGoback} xs='auto'><img src={BackIcon} alt='Go Back' className='header-back' /></Col>))
            }
            <Col>
                <h4 className='header-title'>
                    {header}
                </h4>
            </Col>
            {
                manager || (showAll || (<Col xs='auto'><button onClick={handleShow} className='header-link'>See all</button></Col>))
            }
            {
                manager && (<Col xs='auto'><button onClick={handleAddManager}>+</button></Col>)
            }
        </Row>   
    )
}

export default Headers
