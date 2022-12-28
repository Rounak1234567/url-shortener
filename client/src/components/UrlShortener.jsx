import { useState } from "react"
import axios from "axios"
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { ChakraProvider } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { Heading } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { Link } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'

const UrlShortener = ()=>{

    const [text, setText] = useState("")
    const [shortUrl, setShortUrl] = useState("")
    const [err, setErr] = useState(false)



    const handleShort = async ()=>{

        try {

            const payload = {
                longUrl:text
            }
            const res = await axios.post("https://urlshortner-cv4s.onrender.com/", payload);
            setShortUrl(res.data.shortUrl)
            setErr(false)
            
        } catch (error) {
            setShortUrl(error.response.data.message)
            setErr(true)
        }
    }

    return(
        <ChakraProvider>
        <div>
            <br /><br />
            <Heading>URL Shortner</Heading>
            <br /><br />
            <Input variant='filled' placeholder='Enter Your URL' focusBorderColor='lime' onChange={(e)=>setText(e.target.value)} maxW="70%"/>
            
            <br /><br />
            <Button onClick={handleShort} colorScheme='blue'>Shorten</Button>
            <br /><br />


            {
                shortUrl!=="" && <div>
                    {
                        err ? 
                        <div>
                            <Text fontSize='3xl'>{shortUrl}</Text>
                        </div>
                        

                        :
                        <div>
                            <Text fontSize='3xl'>Your Shornened URL is : </Text>
                            <Link href={shortUrl} isExternal>
                                {shortUrl}<ExternalLinkIcon mx='2px' />
                            </Link>
                    <br /><br /> 
                        </div>
                        
                    }
                    
                     
                    {
                        err ? 
                        null 
                        : 
                        <CopyToClipboard text={shortUrl}> 
                            <Button colorScheme='blue'>Copy Link to Clipboard</Button>
                        </CopyToClipboard>
                    }

                    
                </div>
            }

        </div>
        </ChakraProvider>
    )
}


export {UrlShortener}


//https://urlshortner-cv4s.onrender.com