import React, { useState } from 'react'
import { InputGroup, Input } from 'reactstrap'
import '../../App.css'

function SearchBar() {
  const [searchText, setSearchText] = useState()
  return (
    <InputGroup style={{ paddingLeft: '8px', paddingRight: '8px' }}>
      <Input
        className="App"
        placeholder="Search"
        type="text"
        name="search"
        onChange={(e) => setSearchText(e.target.value)}
        style={{
          borderRadius: '30px',
          boxSizing: 'border-box',
          border: '2px solid #ccc',
          backgroundColor: 'white',
          backgroundImage: `url('https://www.pngfind.com/pngs/m/104-1043692_search-icon-transparent-white-search-icon-apple-png.png')`,
          backgroundPosition: '7px',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          padding: '12px 20px 12px 40px'
        }}
      />
    </InputGroup>
  )
}

export default SearchBar
