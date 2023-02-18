import loading from './loading.svg'

const Spinner =()=>{
    return (
      <div style={{display:"flex" , justifyContent:"center"}} >
        <img   src={loading} alt="loading..." />
      </div>
    )
}

export default Spinner
