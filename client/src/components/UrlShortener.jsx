import { useState } from "react"
import axios from "axios"
import {CopyToClipboard} from 'react-copy-to-clipboard';

const UrlShortener = ()=>{

    const [text, setText] = useState("")
    const [shortUrl, setShortUrl] = useState("")



    const handleShort = async ()=>{
        const payload = {
            longUrl:text
        }
        const res = await axios.post("https://alturl.herokuapp.com/short", payload);
        setShortUrl(res.data.shortUrl)
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
                    <h2>Your Shornened URL is : </h2>
                    <h2>{shortUrl}</h2>
                    <CopyToClipboard text={shortUrl}> 
                        <button>Copy to Clipboard</button>
                    </CopyToClipboard>
                </div>
            }

        </div>
    )
}


export {UrlShortener}