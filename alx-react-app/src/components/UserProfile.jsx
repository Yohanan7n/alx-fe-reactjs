const UserProfile = (props) => {
  return (
    <div style={{ 
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '20px',
      margin: '15px 0',
      backgroundColor: '#f9f9f9',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ 
        color: '#2c3e50',
        marginTop: 0,
        borderBottom: '2px solid #eee',
        paddingBottom: '10px'
      }}>{props.name}</h2>
      <p style={{ 
        fontSize: '1.1rem',
        margin: '8px 0'
      }}>Age: <span style={{ 
        fontWeight: 'bold',
        color: '#e74c3c'
      }}>{props.age}</span></p>
      <p style={{ 
        fontStyle: 'italic',
        color: '#7f8c8d',
        lineHeight: '1.5'
      }}>Bio: {props.bio}</p>
    </div>
  );
};

export default UserProfile;
