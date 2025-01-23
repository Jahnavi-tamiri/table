import React, {useState} from 'react'

const Table = () => {
  const [column1Options] = useState(['Option 1', 'Option 2', 'Option 3'])
  const [selectedColumn1Options, setSelectedColumn1Options] = useState([])
  const [column2Options, setColumn2Options] = useState([
    'Option A',
    'Option B',
    'Option C',
  ])
  const [rows, setRows] = useState([
    {id: Date.now().toString(), column1: '', column2: []},
  ])

  const handleColumn1Change = (rowId, value) => {
    setRows(prevRows =>
      prevRows.map(row => (row.id === rowId ? {...row, column1: value} : row)),
    )
    setSelectedColumn1Options([...selectedColumn1Options, value])
  }

  const handleColumn2Change = (rowId, value) => {
    setRows(prevRows =>
      prevRows.map(row => {
        if (row.id === rowId) {
          return {
            ...row,
            column2: row.column2.includes(value)
              ? row.column2.filter(item => item !== value)
              : [...row.column2, value],
          }
        }
        return row
      }),
    )
  }

  const handleAddRow = () => {
    setRows([...rows, {id: Date.now().toString(), column1: '', column2: []}])
  }

  const handleAddColumn2Option = () => {
    const newOption = prompt('Enter new option:')
    if (newOption) {
      setColumn2Options(prevOptions => [...prevOptions, newOption])
    }
  }

  const filteredColumn1Options = column1Options.filter(
    option => !selectedColumn1Options.includes(option),
  )

  return (
    <div>
      <table border="1" style={{width: '100%', textAlign: 'left'}}>
        <thead>
          <tr>
            <th>Label 1</th>
            <th>Label 2</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr key={row.id}>
              <td>
                <select
                  value={row.column1}
                  onChange={e => handleColumn1Change(row.id, e.target.value)}
                  disabled={row.column1 !== ''}
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  {filteredColumn1Options.map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                {column2Options.map(option => (
                  <label key={option} style={{marginRight: '10px'}}>
                    <input
                      type="checkbox"
                      value={option}
                      checked={row.column2.includes(option)}
                      onChange={e =>
                        handleColumn2Change(row.id, e.target.value)
                      }
                    />
                    {option}
                  </label>
                ))}
                <button
                  type="submit"
                  onClick={handleAddColumn2Option}
                  style={{marginLeft: '10px'}}
                >
                  + Add Option
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleAddRow} style={{marginTop: '10px'}}>
        Add New Row
      </button>
    </div>
  )
}

export default Table
