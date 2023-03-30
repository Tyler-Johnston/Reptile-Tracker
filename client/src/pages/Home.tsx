export const Home = () => {

    return (
      <div>
        <html>

<head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous">
      </link>
    <title>Homepage</title>

    
</head>

<body>
    <div className="jumbotron p-5 mb-4 bg-light rounded-3">
        <h1 className="display-5 fw-bold">Reptile Tracker</h1>
    </div>
    <div className="container">
        <h3>This is a reptile husbandry applet. You can use it to do the following:</h3>
        <ul>
            <li>Create an individual reptile</li>
            <li>create a schedule for said reptile</li>
            <li>Create a husbandry record for a reptile</li>
            <li>Record what and when you fed a reptile</li>
        </ul>
    </div>
    <div style={{display:"flex"}}>
        <button className="w-50 btn btn-lg btn-success" style={{margin:"10px"}} type="submit">Sign Up</button>
        <button className="w-50 btn btn-lg btn-primary" style={{margin:"10px"}} type="submit">Log In</button>
    </div>
    
</body>

</html>

      </div>
    )
  }