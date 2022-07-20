import { useState } from "react"
import axios from "axios"
import {CopyToClipboard} from 'react-copy-to-clipboard';

const UrlShortener = ()=>{

    const [text, setText] = useState("")
    const [shortUrl, setShortUrl] = useState("")
    const [err, setErr] = useState(false)



    const handleShort = async ()=>{

        try {

            const payload = {
                longUrl:text
            }
            const res = await axios.post("https://alturl.herokuapp.com/short", payload);
            setShortUrl(res.data.shortUrl)
            setErr(false)
            
        } catch (error) {
            setShortUrl(error.response.data.message)
            setErr(true)
        }
    }

    return(
        <div>
            <h1>URL Shortner</h1>
            <input type="text" placeholder="Enter Your URL"
            onChange={(e)=>setText(e.target.value)}
            style={{width:"80%"}}
            />
            <br /><br />
            <button onClick={handleShort}>Shorten</button>


            {
                shortUrl!=="" && <div>
                    {
                        err ? 
                        <h2>Something wrong in your URL</h2>
                        :
                        <h2>Your Shornened URL is : </h2>
                    }
                    
                    <h2>{shortUrl}</h2>

                    {
                        err ? 
                        null 
                        : 
                        <CopyToClipboard text={shortUrl}> 
                            <button>Copy to Clipboard</button>
                        </CopyToClipboard>
                    }

                    
                </div>
            }

        </div>
    )
}


export {UrlShortener}