import React from 'react'

const Head = (props) =>{

    let data = props.data.map((row,i)=>{
        let td = row.map((t,j)=>{
            return (
                <td key={j} >
                    {t}
                </td>
            )
        })
        return(
            <tr key={i} className="table-row">
                {td}
            </tr>
        )
    });

    let columns = props.columns.map((col,i)=>{
        return (
            <th key={i}>
                {col.name}
            </th>
        )
    })

    return(
        <table>
            <thead>
                <tr className="table-head">
                    {columns}
                </tr>
            </thead>
            <tbody>
                {data}
            </tbody>
        </table>
    )
}

export default Head;