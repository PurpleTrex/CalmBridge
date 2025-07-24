function TestApp() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#333', marginBottom: '20px' }}>
        CalmBridge Test Page
      </h1>
      <p style={{ color: '#666', marginBottom: '10px' }}>
        If you can see this, the React app is working!
      </p>
      <div style={{ 
        backgroundColor: '#f0f0f0', 
        padding: '15px', 
        borderRadius: '8px',
        marginTop: '20px'
      }}>
        <h2 style={{ color: '#555', margin: '0 0 10px 0' }}>
          Application Status: ✅ WORKING
        </h2>
        <p style={{ margin: '0', color: '#777' }}>
          The development server is running and React is rendering components successfully.
        </p>
      </div>
    </div>
  )
}

export default TestApp
