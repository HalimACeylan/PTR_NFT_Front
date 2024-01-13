"use client";
import Card from '../ui/Card'
import { useState } from 'react';

import { ethers } from "ethers";
import myContract from "../../contract.json";

export default function Create(props: any) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
//   const axios = require('axios')
//   const FormData = require('form-data')
//   const fs = require('fs')
//   const JWT = 'PASTE_YOUR_PINATA_JWT'

//   const pinFileToIPFS = async () => {
//     const formData = new FormData();
//     const src = "path/to/file.png";

//     const file = fs.createReadStream(src)
//     formData.append('file', file)

//     const pinataMetadata = JSON.stringify({
//       name: 'File name',
//     });
//     formData.append('pinataMetadata', pinataMetadata);
  
//     const pinataOptions = JSON.stringify({
//       cidVersion: 0,
//     })
//     formData.append('pinataOptions', pinataOptions);
  
//     try{
//       const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
//         maxBodyLength: "Infinity",
//         headers: {
//           'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
//           'Authorization': `Bearer ${JWT}`
//         }
//       });
//       console.log(res.data);
//     } catch (error) {
//       console.log(error);
//     }
// }


//   const uploadToIPFS = () => {
//     pinFileToIPFS()
//   }

  const createNFT = () => {
    // Implement your createNFT logic here
  }

  return (
    <div>
      <div className="grid grid-cols-5 gap-6 w-full bg-gray-800 px-16 py-8">
        <div className="container mx-auto my-10">
          <h1 className="text-3xl font-bold mb-5">Create an NFT</h1>
          <form>
            <label>
              File:
              <input
                type="file"
                required
                name="file"
                // onChange={uploadToIPFS}
              />
            </label>
            <label>
              Name:
              <input
                // onChange={(e) => setName(e.target.value)}
                 // size="500px"
                required
                type="text"
                placeholder="Name"
              />
            </label>
            <label>
              Description:
              <textarea
                // onChange={(e) => setDescription(e.target.value)}
                 // size="500px"
                required
                placeholder="Description"
              ></textarea>
            </label>
            <label>
              Price in ETH:
              <input
                // onChange={(e) => setPrice(e.target.value)}
                 // size="500px"
                required
                type="number"
                placeholder="Price in ETH"
              />
            </label>
            <div className="d-grid px-0">
              <button onClick={createNFT} className="btn-primary"> 
                Create & List NFT!
              </button>
            </div>
          </form>
        </div>
        {/* <Card src="https://picsum.photos/1920/1080" alt="image" name="NFT 9" price="0.01 ETH" width="120" height="120" /> */}
      </div>
    </div>
  );
}