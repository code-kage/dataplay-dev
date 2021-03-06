import React,{ useState,useEffect } from 'react';
import axios from 'axios';
import { useDispatch,useSelector } from 'react-redux'

import Upload from './Upload'
import Loading from '../Loading'
import Uploaded from './Uploaded'
import Overview from './Overview'


const Data = (props) =>{

    // init

    let overview = useSelector(state=>state.overview)
    let columns = useSelector(state=>state.columns)
    let [rend,rendState] = useState(null)
    let [loading,loadingState] = useState(false)

    useEffect(()=>{
        async function fetch(){
            if(overview.file_name){
                await axios({
                    url:"http://localhost:8080/overview",
                    method :"POST",
                    data: {
                        type:"overview",
                        user:'viraj',
                        filename:overview.file_name
                    },
                    }).then(respomse=>{
                        console.log(respomse.data)
                        window.overview = respomse.data
                        rendState(<Overview data={respomse.data} columns={respomse.data.columns} />)
                })
            }
            else{
                rendState(<Upload upload={upload} />)
            }
        }
        loadingState(true)
        fetch()
        loadingState(false)
    },[])

    // Functions

    async function upload (e) {
        let formData = new FormData();
        formData.append("data", e.target.files[0]);
        formData.append("user","viraj")
        loadingState(true)
        await axios({
            url:"http://localhost:8080/upload",
            method :"POST",
            headers:{

            },
            data: formData,
            }).then(respomse=>{
                console.log(respomse.data)
                window.overview = respomse.data
                rendState(<Overview data={respomse.data} columns={respomse.data.columns} />)
            })
            loadingState(false)
        }

    

    return(
        <div className="container-par">
            <div className="splash">
            </div>
            <div>
                <div className="container flex-center">
                    {loading ?
                        <div className="card flex-center">
                            <Loading className="loading"/>
                        </div>  
                        : rend}
                </div>
            </div>
        </div>
    )
}

export default Data;