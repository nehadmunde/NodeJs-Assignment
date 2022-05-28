import React,{useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [state,setState]= useState([]);
  const [value,setValue]=useState({
    name:'',
    password:''
});
   const [flag,setFlag]=useState(false);
  const handleChange=(event)=>{
    setValue({...value,[event.target.name]:event.target.value});
    console.log('value from handleChange',value)
  }

  const handleSubmit=()=>{
    axios.post("http://localhost:9000/post",value).then(res=>{
      console.log('value from axios',value);
      alert('Data is Saved.');
      setFlag(!flag)
    }).catch(err=>{
      console.log(err);
    })
    
  }
  useEffect(()=>{
    
    axios.get("http://localhost:9000").then(res=>{
       setState(res.data);
       console.log('setState from useEffect',state);
    }).catch(err=>{
      console.log(err);
    })
  },[flag])
    return (
    <div className="App col-md-9 offset-2">

      <h1>Basic Express App</h1>
     
      <br/>
      
      <input type='text' name='name' placeholder='Enter User Name Here' className='form-control' onChange={handleChange} />
      <br/>
      <input type='password' name='password' placeholder='Enter Password Here' className='form-control' onChange={handleChange} />
      <br/>
      <button className='btn btn-info' onClick={handleSubmit}>Submit</button>
    
    <h4>Data from Server </h4>
    <hr/>
      <table className="table table-striped">
  <thead>
    <tr>
    <th scope="col">ID</th>
      <th scope="col">User Name</th>
      <th scope="col">Password</th>
    </tr>
  </thead>
  <tbody>
    {
     state.map((ele,id)=>(

    <tr key={id} >
        <td>{id+1}</td>
      <td>{ele.name}</td>
      <td>{ele.password}</td>

    </tr>
     ))
  }
  </tbody>
</table>
      

    
    </div>
  );
}

export default App;
