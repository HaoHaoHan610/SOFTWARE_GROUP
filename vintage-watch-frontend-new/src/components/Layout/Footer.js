import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #2c3e50;
  color: white;
  padding: 2rem 0;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const FooterSection = styled.div`
  h3 {
    font-family: 'Playfair Display', serif;
    margin-bottom: 1rem;
    color: #ecf0f1;
  }
  
  p, a {
    color: #bdc3c7;
    text-decoration: none;
    line-height: 1.6;
  }
  
  a:hover {
    color: #3498db;
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid #34495e;
  margin-top: 2rem;
  padding-top: 1rem;
  text-align: center;
  color: #95a5a6;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>About Us</h3>
          <p>
            Vintage Timepiece Evaluation and Trading Platform - Your trusted marketplace 
            for authentic vintage watches with professional appraisals.
          </p>
        </FooterSection>
        
        <FooterSection>
          <h3>Services</h3>
          <p>• Watch Appraisals</p>
          <p>• Secure Trading</p>
          <p>• Authentication</p>
          <p>• Customer Support</p>
        </FooterSection>
        
        <FooterSection>
          <h3>Contact</h3>
          <p>Email: support@vintagewatch.com</p>
          <p>Phone: +1 (555) 123-4567</p>
          <p>Hours: Mon-Fri 9AM-6PM EST</p>
        </FooterSection>
        
        <FooterSection>
          <h3>Legal</h3>
          <p>• Terms of Service</p>
          <p>• Privacy Policy</p>
          <p>• Return Policy</p>
          <p>• Authentication Guarantee</p>
        </FooterSection>
      </FooterContent>
      
      <FooterBottom>
        <p>&copy; 2024 Vintage Watch Trading Platform. All rights reserved.</p>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;
