import React from "react"

const Filter = ({ valFilter, handleFilter }) => {
    return (
          <form>
            <div>
                filter shown with <input value={valFilter} onChange={handleFilter} />
            </div>
        </form>
    )
}

export default Filter