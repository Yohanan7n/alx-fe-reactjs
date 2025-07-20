const Footer = () => {
  return (
    <footer style={{ 
      backgroundColor: '#34495e',
      color: 'white',
      textAlign: 'center',
      padding: '15px',
      position: 'fixed',
      bottom: 0,
      width: '100%',
      boxShadow: '0 -2px 5px rgba(0,0,0,0.1)'
    }}>
      <p style={{ 
        margin: 0,
        fontSize: '0.9rem'
      }}>© 2023 My Favorite Cities App. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
