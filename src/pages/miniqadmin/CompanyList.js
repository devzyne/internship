import React from 'react'
import Sidenav from "../../components/sidenav/Sidenav";
import { Container, Row, Col } from 'react-bootstrap';
import BottomNav from "../../components/bottomNav/BottomNav";
import Button from "../../components/button/Button";
import {Link , Redirect , useHistory} from 'react-router-dom';
import './CompanyList.css'
function CompanyList(){
    let history= useHistory();
    const handleViewSubmit =() => {
    
        history.push("/miniq/admin/home");
    }
    const handleAdd = () => {
        history.push("/miniq/company/company-add")
    }
    return (
        <div id="companyList">
            <Sidenav/>
            <Container fluid className="contain">
            <h3>List of company</h3>
            <li>
                <ul>

                </ul>
               
            </li>
            <Row>
                <Col className="button-col">
                    <Button
                    className="button"
                    type="submit"
                    text="Add Company"
                    onClick={() =>history.push("/company/add")}
                    />
                </Col>
                <Col className="button-col">
                    <Button
                    className="button"
                    type="submit"
                    text="View Company"
                    onClick= {()=>history.push("/company/view")}
                    />
                </Col>
            </Row>
           
            
           
            </Container>
            <BottomNav/>
        </div>
    )
}

export default CompanyList
