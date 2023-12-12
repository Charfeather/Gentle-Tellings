import { TextField } from "@mui/material"

function SearchBar({setSearch}){
    const handleChange=(e)=>{
        setSearch(e.target.value)
        console.log(e.target.value)
    }
    return(
        <TextField
            id="search"
            label="Type a Username here"
            variant="filled"
            onChange={handleChange}
        />
    )
}
export default SearchBar