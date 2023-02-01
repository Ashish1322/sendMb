import React, {useState,createContext, useEffect, useRef} from "react";
import Peer from "peerjs";
export const FileContext = createContext();

const FileContextProvider = ({children}) => {
    // Creating States
    const [id,setId] = useState("")
    const [peer,setPeer] = useState(null)
    const [isConnected, setIsConnected] = useState(false)
    const [connection,setConnection] = useState(null)
    const [files,setFiles] = useState([])
    const [loading,setLoading] = useState(false)
    const [progress,setProgress] = useState(0);


    // some fast updating variables
    var receivedSize = 0;
    var arrayToStoreChunks = [];

    //handle the receved data from connectin
    const handleReceiveData = (data) => {

        receivedSize+=data.message.byteLength;
        setProgress((receivedSize/data.file_size)*100)
        arrayToStoreChunks.push(data.message);
        if(data.last)
        {
        const blob = new Blob(arrayToStoreChunks, {type: data.mime});
        const url = URL.createObjectURL(blob);
        setFiles(da => [...da, {url: url, name: data.file_name}])
        receivedSize = 0;
        arrayToStoreChunks = []
        }

    }

    // Setting up all the listener &  initial states
    useEffect(() => {
      
        // creating peer 
        const peer = new Peer();
        setPeer(peer)
        // setting id of peer
        peer.on('open',(peerId) => {
            setId(peerId)
        })
        
        
        // When this peer got connected to anyone else then
        peer.on("connection",(conn) => {
            // connection is secure
            conn.on("open",() => {
              setIsConnected(true)
              setConnection(conn)
            })
            // Handle the data receive
            conn.on("data",(data) => {
                // if data received is file
                if(data.file_name)
                {
                    if(data.last)
                    conn.send({progress : 100})
                    else
                        conn.send({ progress: (receivedSize/data.file_size)*100})
                    handleReceiveData(data)
                    // while receiving the data make it true
                    setLoading(true)
                }
                else
                handleSendingProgress(data)
                // if data received is progress info
            })
            // handling the close
            conn.on("close",() => {
                window.location.reload()
            })
          })
    }, [])

    // method to handle the data received from receiver data = percentage of file received 
    const handleSendingProgress = (data) => {
        setProgress(data.progress)
    }
    // Method to connect
    const connect = (remoteId) => {

        const conn = peer.connect(remoteId,{reliable: true})
        conn.on("open",() => {
            setIsConnected(true)
            setConnection(conn)
        })
        // handling the close
        conn.on("close",() => {
            window.location.reload()
        })
        // handling the data sent by receiver
        conn.on("data", (data) => {
            // if data is file 
            if( data.file_name)
            {
                // Receive the file and send the received progress to the Sender.
                if(data.last)
                    conn.send({progress : 100})
                else
                    conn.send({ progress: (receivedSize/data.file_size)*100})
                handleReceiveData(data)
                // while receiving the data make it true
                setLoading(true)
            }
            // if data is the receiver progress
            else
            handleSendingProgress(data)
        })
   
    }

    // Function to send File by dividing it into small chunks
    function sliceandsend(file) {
        var fileSize = file.size;
        var name = file.name;
        var mime = file.type;
        var chunkSize = 64 * 1024; // bytes
        var offset = 0;
     
    function readchunk(first) {
        var data = {}; // data object to transmit over data channel
        data.file_name= name;
        data.file_size= fileSize;
        var r = new FileReader();
        var blob = file.slice(offset, chunkSize + offset);
        r.onload = function(evt) {
            if (!evt.target.error) {
                offset += chunkSize;
                console.log("sending: " + (offset / fileSize) * 100 + "%");
                if (offset >= fileSize) {
                  data.message = evt.target.result;
                  data.last = true;
                  data.mime = mime;
                  connection.send(data);
                  console.log("Done reading file " + name + " " + mime);
                  return;
                }
                else {      
                  data.message = evt.target.result;
                  data.last = false; 
                  data.mime = mime;
                  connection.send(data);             
                }               
            } else {
                console.log("Read error: " + evt.target.error);
                return; 
            }
            readchunk();
           };
            r.readAsArrayBuffer(blob);
        }
        readchunk(Math.ceil(fileSize/chunkSize));
      }

   // Method to disconnect
   const disconnect = () => {
    // little relaod of page so that we can get new ids
    connection.close()
    window.location.reload()
   }

   // Method to send file
   const sendFile = (file) => {
    // when sending the file make set loading true
    setLoading(true)
    sliceandsend(file)

  }
    
    return (
        <FileContext.Provider value={{id: id,isConnected,files,connection, connect, disconnect, sendFile, loading, progress}}>
            {children}
        </FileContext.Provider>
    )
}

export default FileContextProvider;
