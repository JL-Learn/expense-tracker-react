import React, { useEffect, useState } from 'react'

const Footer = () => {
  const [Year, setYear] = useState();

  useEffect(() => {
      const getYear = () => setYear(new Date().getFullYear());
      getYear();
  }, []);

  return (
   <>
      <footer style={{textAlign: 'center', backgroundColor: '#bcfaae'}}>
          <br/>
          <div>
            <p>Copyright<span className='text-base font-bold'> &copy;</span> All Reserved Rights <span style={{fontWeight: 'bold'}}> - JLSystem {Year}</span></p>
          </div>
          <br/>
      </footer>
   </>
  )
}

export default Footer